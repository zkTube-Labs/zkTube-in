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
    console.log('e', e);
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
  },

  effects: ({ wallet }: IStoreDispatch) => ({
    async init() {
      const _web3: Web3 = await getWeb3();
      const _account: string = (await _web3.eth.getAccounts())[0];
      const { syncWallet: _wallet, syncHTTPProvider: _provider } = await zkTubeInitialize(_web3, (e) => {
        if (e.code === 4001) {
          wallet.update({
            signErrorMsg: 'This dapp needs access to your account information',
          });
        }
      });
      wallet.update({
        web3: _web3,
        syncWallet: _wallet,
        account: _account,
        syncHTTPProvider: _provider,
      });
      history.push('/wallet/deposit');
      try {
        await signKey(_wallet);
      } catch (e) {
        console.log('e========e', e);
      }
    },

    async deposit(amount) {
      // Depositing assets from Ethereum into zkTube

      const _web3: Web3 = await getWeb3();
      await zkTubeInitialize(_web3);
      const { syncWallet } = await zkTubeInitialize(_web3);

      console.log(`目标地址：${syncWallet.address()}`)
      try {
        const deposit = await syncWallet.depositToSyncFromEthereum({
          // param 1 address
          depositTo: syncWallet.address(),
          // param 2 token
          token: "ETH",
          // param 3 amount
          amount: ethers.utils.parseEther(amount),
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
          console.log(error)
      }
    },

    async transfer(data) {
      const amount = zktube.utils.closestPackableTransactionAmount(ethers.utils.parseEther(data.amount));
      const _web3: Web3 = await getWeb3();
      await zkTubeInitialize(_web3);
      const { syncWallet } = await zkTubeInitialize(_web3);
      const _transfer = await syncWallet.syncTransfer({
        to: data.address,
        // eslint-disable-next-line @iceworks/best-practices/no-secret-info
        token: 'ETH',
        amount,
      });
      await _transfer.awaitReceipt();
      wallet.update({
        amount,
        transfer: _transfer,
      });
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
      await withdraw.awaitVerifyReceipt();
      wallet.update({
        amount,
      });
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
