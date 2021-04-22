import React, { useState } from 'react';
import { IStoreDispatch, history } from 'ice';
import { provider } from 'web3-core';
import Web3 from 'web3';
import { ethers } from 'ethers';
import * as zktube from 'zktube-soft-launch';

declare const window: any;

type Wallet = zktube.Wallet;

interface CustomError {
  code: number;
  message: string;
}

interface IState {
  metaDialogVisible: boolean;
  selectWalletDialogVisible: boolean;
  unMetaDialogVisible: boolean;
  web3: Web3;
  syncWallet: Wallet;
  account: string;
  syncHTTPProvider: provider;
  signErrorMsg: string | undefined;
  amount: any;
  transfer: any;
  committedBalances: double | undefined;
  committedBalances: float | undefined;
  exceptionMsg: string | null;
  resolveTransfer: boolean;
  // could be one of following messages:
  // WalletSignFailed
  // NetworkError
  // AccountNotExist
  // AccountNotActive
  // InsufficientBalance
}

// eslint-disable-next-line @iceworks/best-practices/no-http-url
const url = 'http://119.28.75.86:3030/jsrpc';

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

const signKey = async (_syncWallet: Wallet) => {
  if (!(await _syncWallet?.isSigningKeySet())) {
    // alert('_syncWallet?.isSigningKeySet()');
    const changePubkey = await _syncWallet?.setSigningKey({
      // eslint-disable-next-line @iceworks/best-practices/no-secret-info
      feeToken: 'ETH',
    });
    const receipt = await changePubkey?.awaitReceipt();
    console.log('receipt', receipt);
  }
};

const zkTubeInitialize = async (_web3: any, callback?: (e: CustomError) => void) => {
  await _web3.currentProvider?.enable();
  const ethersProvider = new ethers.providers.Web3Provider(_web3.currentProvider);
  const _syncHTTPProvider = await zktube.Provider.newHttpProvider(url);
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
    metaDialogVisible: false,
    selectWalletDialogVisible: false,
    unMetaDialogVisible: false,
    web3: undefined,
    syncWallet: undefined,
    account: undefined,
    syncHTTPProvider: undefined,
    signErrorMsg: undefined,
    amount: undefined,
    transfer: undefined,
    // wei, 1 ETH = 10^18 wei
    committedBalances: 0.0,
    // wei, 1 ETH = 10^18 wei
    verifiedBalances: 0.0,
    exceptionMsg: null,
    resolveTransfer:false
  },

  effects: ({ wallet }: IStoreDispatch) => ({
    async init() {
      const _web3: Web3 = await getWeb3();
      const _account: string = (await _web3.eth.getAccounts())[0];
      const { syncWallet: _wallet, syncHTTPProvider: _provider } = await zkTubeInitialize(_web3, (e) => {
        if (e.code === 4001) {
          wallet.update({
            signErrorMsg: 'This dapp needs access to your account information',
            exceptionMsg: 'WalletSignFailed',
          });
        }
      });
      // console.log('state 1', state);
      wallet.update({
        web3: _web3,
        syncWallet: _wallet,
        account: _account,
        syncHTTPProvider: _provider,
      });
      // console.log('state 2', state);
      history.push('/wallet/detail');
      try {
        await signKey(_wallet);
      } catch (e) {
        console.log('e========e', e);
        this.parseException(e);
      }
    },


    parseException(e) {

    },

    async checkStatus(syncWallet) {
      // const _web3: Web3 = await getWeb3();
      // // await zkTubeInitialize(_web3);
      // console.log('wallet deposit', wallet);
      // const { syncWallet } = await zkTubeInitialize(_web3);

      const state = await syncWallet.getAccountState();
      console.log('account state:', state);
      wallet.update({
        committedBalances: state.committed.balances.ETH,
        verifiedBalances: state.verified.balances.ETH,
      });
      // setCommittedEthBalance(state.committed.balances.ETH);
      // setVerifiedEthBalance(state.verified.balances.ETH);
    },

    async deposit(syncWallet, amount :string) {
      // Depositing assets from Ethereum into zkTube
      if (!syncWallet){
        const _web3: Web3 = await getWeb3();
        await zkTubeInitialize(_web3);
        syncWallet = await zkTubeInitialize(_web3);
      }

      console.log(`目标地址：${syncWallet.address()}, amount`, amount);
      try {
        // const { tk } = 'ETH';
        const deposit = await syncWallet.depositToSyncFromEthereum({
          // param 1 address
          depositTo: syncWallet.address(),
          // param 2 token
          // eslint-disable-next-line @iceworks/best-practices/no-secret-info
          token: 'ETH',
          amount: ethers.utils.parseEther('0.1'),
        });

        // Await confirmation from the zkTube operator
        // Completes when a promise is issued to process the tx
        let depositReceipt = await deposit.awaitReceipt();
        console.log(depositReceipt);

        // // Await verification
        // // Completes when the tx reaches finality on Ethereum
        depositReceipt = await deposit.awaitVerifyReceipt();
        console.log(depositReceipt);
      } catch (error) {
        // console.log(error);
        console.log('deposit exception', error);
      }
    },

    async transfer(data) {
      const amount = zktube.utils.closestPackableTransactionAmount(ethers.utils.parseEther(data.amount));
      const _web3: Web3 = await getWeb3();
      await zkTubeInitialize(_web3);
      const { syncWallet } = await zkTubeInitialize(_web3);
      try{
        const _transfer = await syncWallet.syncTransfer({
          to: data.address,
          // eslint-disable-next-line @iceworks/best-practices/no-secret-info
          token: 'ETH',
          amount,
        });
        wallet.update({
          amount,
          transfer: _transfer,
          resolveTransfer: true
        });
        return await _transfer.awaitReceipt();
       
      }
      catch(error){
        console.log("Transfer Error", error);
      }
    },

    async withdraw(amount) {
      const _web3: Web3 = await getWeb3();
      await zkTubeInitialize(_web3);
      const { syncWallet } = await zkTubeInitialize(_web3);
      const withdraw = await syncWallet.withdrawFromSyncToEthereum({
        ethAddress: syncWallet.address(),
        // eslint-disable-next-line @iceworks/best-practices/no-secret-info
        token: 'ETH',
        amount: ethers.utils.parseEther(amount),
      });
      await withdraw.awaitReceipt();
      // await withdraw.awaitVerifyReceipt();
      wallet.update({
        amount,
      });
      return await withdraw.awaitVerifyReceipt();

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
