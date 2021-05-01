import React, { useState } from 'react';
import { IStoreDispatch, history } from 'ice';
import { provider } from 'web3-core';
import Web3 from 'web3';
import { ethers, Wallet } from 'ethers';
import * as zktube from 'zktube-soft-launch';
import { updateLocale } from 'moment';

declare const window: any;

type Wallet = zktube.Wallet;

// eslint-disable-next-line @iceworks/best-practices/no-http-url
// const url = 'http://119.28.75.86:3030/jsrpc';
// const url = 'https://rinkeby-jsrpc.zktube.io/';
// const g_providerUrl = "http://124.156.151.46:3030/jsrpc";
// // eslint-disable-next-line @iceworks/best-practices/no-http-url
// const g_l2BlockUrl = 'http://124.156.151.46:7000/blocks/';
const g_providerUrl = "http://101.32.219.21:3030/jsrpc";
const g_l2BlockUrl = 'http://101.32.219.21:7000/blocks/';
const g_l1TxUrl = 'https://rinkeby.etherscan.io/tx/';


interface CustomError {
  code: number;
  message: string;
}

interface IState {
  l1TxUrl: string;
  l2BlockUrl: string;
  metaDialogVisible: boolean;
  selectWalletDialogVisible: boolean;
  unMetaDialogVisible: boolean;
  web3: Web3;
  syncWallet: Wallet;
  account: string;
  syncHTTPProvider: provider;
  signErrorMsg: string | undefined;
  transfer: any;
  ethL1Balance: ethers.utils.BigNumber | null;
  ethPrice: ethers.utils.BigDecimal | null;
  resolveTransfer: boolean;
  assets: any | null;

  depositContract: any;

  exceptionMsg: string | null;
  // could be one of following messages:
  // WalletSignFailed
  // NetworkError
  // AccountNotExist
  // AccountNotInit
  // AccountNotActive
  // UserDeniedTransaction
  // InsufficientBalance

  // Deprecated, you can get balances in assets segment
  committedBalances: string | undefined;
  verifiedBalances: string | undefined;
}

async function getWeb3(): Promise<Web3> {
  return new Promise((resolve, reject) => {
    if (window.ethereum) {
      const _web3: Web3 = new Web3(window.ethereum);
      try {
        (async () => {
          await window.ethereum.enable();
          resolve(_web3);
        })();
      } catch (e) {
        reject(e);
      }
    } else if (window.web3) {
      resolve(window.web3);
    }
  });
}

// const signKey = async (_syncWallet: Wallet) => {
//   if (!(await _syncWallet?.isSigningKeySet())) {
//     // alert('_syncWallet?.isSigningKeySet()');
//     const changePubkey = await _syncWallet?.setSigningKey({
//       // eslint-disable-next-line @iceworks/best-practices/no-secret-info
//       feeToken: 'ETH',
//     });
//     const receipt = await changePubkey?.awaitReceipt();
//     console.log('receipt', receipt);
//   }
// };

const zkTubeInitialize = async (_web3: any, callback?: (e: CustomError) => void) => {
  await _web3.currentProvider?.enable();
  const ethersProvider = new ethers.providers.Web3Provider(_web3.currentProvider);
  const _syncHTTPProvider = await zktube.Provider.newHttpProvider(g_providerUrl);
  const singer = ethersProvider.getSigner();
  let _syncWallet: Wallet;
  try {
    _syncWallet = await zktube.Wallet.fromEthSigner(singer, _syncHTTPProvider);
    return { syncWallet: _syncWallet, syncHTTPProvider: _syncHTTPProvider };
  } catch (e) {
    // window.location.reload();

    console.log('No Signature', e);
    callback && callback(e);
    throw Error('please sign');
  }
};

export default {
  state: {
    l1TxUrl: g_l1TxUrl,
    l2BlockUrl: g_l2BlockUrl,
    metaDialogVisible: false,
    selectWalletDialogVisible: false,
    unMetaDialogVisible: false,
    web3: undefined,
    syncWallet: undefined,
    account: undefined,
    syncHTTPProvider: undefined,
    signErrorMsg: undefined,
    transfer: undefined,
    // wei, 1 ETH = 10^18 wei
    committedBalances: 0,
    // wei, 1 ETH = 10^18 wei
    verifiedBalances: 0,
    // eth on l1 chain balance, wei 1 ETH = 10^18 wei
    ethL1Balance: null,
    ethPrice: null,
    exceptionMsg: null,
    resolveTransfer: false,
    assets: null,

    depositContract: null,
  },

  effects: ({ wallet }: IStoreDispatch) => ({
    async init() {
      const _web3: Web3 = await getWeb3();
      const allAcounts = await _web3.eth.getAccounts();
      const _account: string = allAcounts[0];
      const { syncWallet: _wallet, syncHTTPProvider: _provider } = await zkTubeInitialize(_web3, (e) => {
        if (e.code === 4001) {
          wallet.update({
            signErrorMsg: 'This app needs access to your account information',
            exceptionMsg: 'WalletSignFailed',
          });
        }
      });
      // console.log('state 1', state);
      wallet.update({
        // l1TxUrl: g_l1TxUrl,
        // l2BlockUrl: g_l2BlockUrl,
        web3: _web3,
        syncWallet: _wallet,
        account: _account,
        syncHTTPProvider: _provider,
      });
      // console.log('state 2', state);
      history.push('/wallet/detail');
      // try {
      //   await signKey(_wallet);
      // } catch (e) {
      //   this.parseException(e);
      // }
    },


    parseException(e) {
      if (e.message?.toUpperCase().indexOf('ACCOUNT DOES NOT EXIST') > 0) {
        // message:'Failed to Set Signing Key: Account does not exist in the zkTube network'
        throw ('AccountNotExist');
      }
      console.log('e========e', e);
      // if (e == "Error: Failed to Set Signing Key: Account does not exist in the zkTube network")
    },

    async refreshEthBalance(_, thisModel) {
      const ethL1Balance = thisModel.wallet.syncWallet.getEthereumBalance('ETH');
      ethL1Balance.then((val) => {
        wallet.update({
          ethL1Balance: val,
        });
        console.log('ethL1Balance', val, ethers.utils.formatEther(val));
      });

      const ethPrice = wallet.refreshTokenPrice('ETH');
      ethPrice.then((val) => {
        wallet.update({
          ethPrice: val,
        });
        console.log('ethPrice', val, wallet.syncHTTPProvider);
      });
      return { ethL1Balance, ethPrice };
    },
    refreshTokenPrice(token, thisModel) {
      const promToken = thisModel.wallet.syncHTTPProvider.getTokenPrice(token);
      // promToken.then((val) => {

      // })
      return promToken;
    },

    refreshL2Assets(_, thisModel) {
      const assets = thisModel.wallet.syncWallet.getAccountState();
      assets.then((val) => {
        console.log('account assets:', val);
        wallet.update({
          committedBalances: val.committed.balances.ETH,
          verifiedBalances: val.verified.balances.ETH,
          assets: val,
        });
      });

      return assets;
    },

    async walletSigned(_, thisModel) {
      if (thisModel && thisModel.wallet && thisModel.wallet.syncWallet && thisModel.wallet.syncHTTPProvider) {
        return true;
      } else {
        return false;
      }
    },

    async signKey(_, thisModel) {
      if (thisModel?.wallet?.syncWallet && thisModel?.wallet?.assets?.verified?.balances?.ETH) {
        if (Number(thisModel.wallet.assets.verified.balances.ETH) > 0.0) {
          const _syncWallet = thisModel.wallet.syncWallet;
          if (!(await _syncWallet?.isSigningKeySet())) {
            // alert('_syncWallet?.isSigningKeySet()');
            const changePubkey = await _syncWallet?.setSigningKey({
              // eslint-disable-next-line @iceworks/best-practices/no-secret-info
              feeToken: 'ETH',
            });
            const receipt = changePubkey?.awaitReceipt();
            receipt.then((val) => {
              console.log('receipt', val);
            });
            return receipt;
          }
        }
      }
      return null;
    },
    

    // issue: param 2 always be the 'this' pointer to the wallet model, neither you pass some thing or not
    // async deposit(amount, thisModel, address)
    // the first param is correct
    // the second param may always be the 'this' pointer to the wallet model
    // the third param also be correct
    async checkStatus(_, thisModel) {
      let syncWallet = null;
      let syncHTTPProvider = null;
      if (thisModel && thisModel.wallet && thisModel.wallet.syncWallet && thisModel.wallet.syncHTTPProvider) {
        syncWallet = thisModel.wallet.syncWallet;
        syncHTTPProvider = thisModel.wallet.syncHTTPProvider;
      } else {
        const { syncWallet: _wallet, syncHTTPProvider: _provider } = await this.refreshWallet();
        syncWallet = _wallet;
        syncHTTPProvider = _provider;
      }

      if (!syncWallet || !syncWallet.getAccountState || !syncHTTPProvider) {
        throw ('AccountNotInit');
      }

      const assets = await syncWallet.getAccountState();
      console.log('account assets:', assets);
      wallet.update({
        committedBalances: assets.committed.balances.ETH,
        verifiedBalances: assets.verified.balances.ETH,
        assets,
      });
      return assets;
    },

    async refreshWallet() {
      const _web3: Web3 = await getWeb3();
      const { syncWallet: _wallet, syncHTTPProvider: _provider } = await zkTubeInitialize(_web3);
      const allAcounts = await _web3.eth.getAccounts();
      const _account: string = allAcounts[0];
      wallet.update({
        // l1TxUrl: g_l1TxUrl,
        // l2BlockUrl: g_l2BlockUrl,
        web3: _web3,
        account: _account,
        syncWallet: _wallet,
        syncHTTPProvider: _provider,
      });
      // try {
      //   await signKey(_wallet);
      // } catch (e) {
      //   this.parseException(e);
      // }
      return { syncWallet: _wallet, syncHTTPProvider: _provider };
    },

    // issue: param 2 always be the 'this' pointer to the wallet model, neither you pass some thing or not
    // async deposit(amount, thisModel, address)
    // the first param is correct
    // the second param may always be the 'this' pointer to the wallet model
    // the third param also be correct
    async deposit(amount, thisModel) {
      // Depositing assets from Ethereum into zkTube
      let syncWallet = null;
      let syncHTTPProvider = null;
      if (thisModel && thisModel.wallet && thisModel.wallet.syncWallet) {
        syncWallet = thisModel.wallet.syncWallet;
      } else {
        const { syncWallet: _wallet, syncHTTPProvider: _provider } = await this.refreshWallet();
        syncWallet = _wallet;
        syncHTTPProvider = _provider;
      }

      console.log('deposit wallet', thisModel);
      console.log(`目标地址：${syncWallet.address()}, amount`, amount);

      // const { tk } = 'ETH';
      const deposit = await syncWallet.depositToSyncFromEthereum({
        // param 1 address
        depositTo: syncWallet.address(),
        // param 2 token
        // eslint-disable-next-line @iceworks/best-practices/no-secret-info
        token: 'ETH',
        amount: ethers.utils.parseEther(amount),
      });

      return deposit;
    },

    async transfer(data, thisModel) {
      let syncWallet = null;
      let syncHTTPProvider = null;
      if (thisModel && thisModel.wallet && thisModel.wallet.syncWallet) {
        syncWallet = thisModel.wallet.syncWallet;
      } else {
        const { syncWallet: _wallet, syncHTTPProvider: _provider } = await this.refreshWallet();
        syncWallet = _wallet;
        syncHTTPProvider = _provider;
      }

      const amount = zktube.utils.closestPackableTransactionAmount(ethers.utils.parseEther(data.amount));
      const transfer = await syncWallet.syncTransfer({
        to: data.address,
        // eslint-disable-next-line @iceworks/best-practices/no-secret-info
        token: 'ETH',
        amount,
      });
      // wallet.update({
      //   amount,
      //   transfer: _transfer,
      //   resolveTransfer: true,
      // });
      // return await _transfer.awaitReceipt();
      return transfer;

    },

    async withdraw(data, thisModel) {
      if (data?.amount && data?.token && data?.to) {
        let syncWallet = null;
        let syncHTTPProvider = null;
        if (thisModel && thisModel.wallet && thisModel.wallet.syncWallet) {
          syncWallet = thisModel.wallet.syncWallet;
        } else {
          const { syncWallet: _wallet, syncHTTPProvider: _provider } = await this.refreshWallet();
          syncWallet = _wallet;
          syncHTTPProvider = _provider;
        }

        const withdraw = await syncWallet.withdrawFromSyncToEthereum({
          ethAddress: data.to,
          // eslint-disable-next-line @iceworks/best-practices/no-secret-info
          token: data.token,
          amount: ethers.utils.parseEther(data.amount),
        });
        const receipt = withdraw.awaitReceipt();
        // await withdraw.awaitVerifyReceipt();
        const verifyReceipt = withdraw.awaitVerifyReceipt();
        return {receipt, verifyReceipt};
      } else {
        return null;
      }
    },

    async setState(payload: IState) {
      wallet.update(payload);
    },
  }),

  reducers: {
    update(prevState: IState, payload: IState) {
      return { ...prevState, ...payload };
    },
  },
};
