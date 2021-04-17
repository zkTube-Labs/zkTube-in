import { IStoreDispatch } from 'ice';
import { provider } from 'web3-core';
import Web3 from 'web3';
import { ethers } from 'ethers';
import * as zktube from 'zktubez';

declare const window: any;

type Wallet = zktube.Wallet;

interface IState {
  metaDialogVisible: boolean;
  selectWalletDialogVisible: boolean;
  unMetaDialogVisible: boolean;
  web3: Web3;
  syncWallet: Wallet;
  account: string;
  syncHTTPProvider: provider;
}

// eslint-disable-next-line @iceworks/best-practices/no-http-url
const url = 'http://124.156.151.46:3030/jsrpc';

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
  // console.log(`User account status: ${await _syncWallet.isSigningKeySet()}`);
  if (!(await _syncWallet?.isSigningKeySet())) {
    const changePubkey = await _syncWallet.setSigningKey({
      // eslint-disable-next-line @iceworks/best-practices/no-secret-info
      feeToken: 'ETH',
    });
    const receipt = await changePubkey.awaitReceipt();
    console.log('receipt', receipt);
  }
};

const zkTubeInitialize = async (_web3) => {
  await _web3.currentProvider.enable();
  const ethersProvider = new ethers.providers.Web3Provider(_web3.currentProvider);

  const _syncHTTPProvider = await zktube.Provider.newHttpProvider(url);

  const singer = ethersProvider.getSigner();
  const _syncWallet: Wallet = await zktube.Wallet.fromEthSigner(singer, _syncHTTPProvider);
  return { syncWallet: _syncWallet, syncHTTPProvider: _syncHTTPProvider };
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
  },

  effects: ({ wallet }: IStoreDispatch) => ({
    async init() {
      const _web3: Web3 = await getWeb3();
      const _account: string = (await _web3.eth.getAccounts())[0];
      const { syncWallet: _wallet, syncHTTPProvider: _provider } = await zkTubeInitialize(_web3);
      await signKey(_wallet);
      wallet.update({
        web3: _web3,
        syncWallet: _wallet,
        account: _account,
        syncHTTPProvider: _provider,
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
