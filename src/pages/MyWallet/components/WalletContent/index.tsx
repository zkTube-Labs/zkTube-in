import React from 'react';
import { Box, Button, Icon } from '@alifd/next';
import LOGO from '@/assets/paytube-black.png';
import BACK1 from '@/assets/backimg1.png';
import BACK2 from '@/assets/backimg2.png';
import SECURITY from '@/assets/security.svg';
import TRANSACTION from '@/assets/transaction.svg';
import TPS from '@/assets/tps.svg';
import Web3 from 'web3';
import { ethers } from 'ethers';
import * as zktube from 'zktubez';
import store from '@/store';

import styles from './index.module.scss';

type Wallet = zktube.Wallet;

declare const window: any;

// eslint-disable-next-line @iceworks/best-practices/no-http-url
const url = 'http://124.156.151.46:3030/jsrpc';

const WalletContent = () => {
  const [{ web3, syncWallet }, action] = store.useModel('wallet');

  const getWeb3: () => Promise<Web3> = () => {
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
  };

  const zkTubeInitialize = async (_web3) => {
    await _web3.currentProvider.enable();
    const ethersProvider = new ethers.providers.Web3Provider(_web3.currentProvider);

    const _syncHTTPProvider = await zktube.Provider.newHttpProvider(url);

    const singer = ethersProvider.getSigner();
    const _syncWallet: Wallet = await zktube.Wallet.fromEthSigner(singer, _syncHTTPProvider);
    return { syncWallet: _syncWallet, syncHTTPProvider: _syncHTTPProvider };
  };

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

  const handleConnectClick = () => {
    action.setState({ selectWalletDialogVisible: true });
    init();
  };

  const init = async () => {
    const _web3: Web3 = await getWeb3();
    const _account: string = (await _web3.eth.getAccounts())[0];
    const { syncWallet: _wallet, syncHTTPProvider: _provider } = await zkTubeInitialize(_web3);
    await signKey(_wallet);
    action.setState({
      web3,
      syncWallet: _wallet,
      account: _account,
      syncHTTPProvider: _provider,
    });
  };

  return (
    <div className={styles.list}>
      <div className={styles.listitem}>
        <Box>
          <div className={styles.borderbox}>
            <div className={styles.headtitle}>
              <img className={styles.headimg} src={LOGO} />
            </div>
            <div className={styles.midtitle}>
              <img className={styles.midimg} src={BACK1} />
              <span className={styles.midlarge}>Decentralized wallet based on layer2</span>
              <span className={styles.midsmall}>The combination of zero knowledge protocol and layer2</span>
            </div>
            <div className={styles.footbtn}>
              <Button type="secondary" onClick={handleConnectClick}>
                Connect to a wallet
              </Button>
            </div>
            <div className={styles.foottitle}>
              <span className={styles.footlarge}>Introduction to zktube</span>
              <span className={styles.footsmall}>
                zktube is a layer 2 protocol which uses zero knowledge proof and rollup of ZK rollup
              </span>
              <span className={styles.footsmall}>
                to realize low transaction fee and high throughput transaction between ETH and erc20.
              </span>
            </div>
            <div className={styles.introlist}>
              <div className={styles.introcont}>
                <div className={styles.introitem}>
                  <div className={styles.itemimg}>
                    <img src={SECURITY} style={{ width: '70%', height: '80%', paddingTop: '10%' }} />
                  </div>
                  <div className={styles.itemfirst}>Security</div>
                  <div className={styles.itemsec}>
                    The rollup contract keeps track of its entire history of state roots and the hash of each batch. if
                    anyone discovers that one batch had an incorrect post-state root, they can publish a proof to chain,
                    proving that the batch was computed incorrectly. The contract verifies the proof, and reverts that
                    batch and all batches after it.
                  </div>
                </div>
                <div className={styles.introitem}>
                  <div className={styles.itemimg}>
                    <img src={TRANSACTION} style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className={styles.itemfirst}>Transaction fee</div>
                  <div className={styles.itemsec}>
                    <span style={{ fontWeight: 'bold' }}>Gasprice:</span>
                    we can allow users to pay with a fixed range of gaspricesor or even move gaspayment outside the
                    rollup protocol entirely and have transactors pay batch creators for inclusion through a channel.{' '}
                    <br />
                    <span style={{ fontWeight: 'bold' }}>Gas:</span>
                    we could similarly restrict the total gas to a choice of consecutive powers of two. Alternatively,
                    we could just have a gas limit only at the batch level.
                  </div>
                </div>
                <div className={styles.introitem}>
                  <div className={styles.itemimg}>
                    <img src={TPS} style={{ width: '100%', height: '100%' }} />
                  </div>
                  <div className={styles.itemfirst}>TPS2000+</div>
                  <div className={styles.itemsec}>
                    Zktube uses the principle of slicing technology to make the transaction flow between L2 faster and
                    meet more financial application in the field of defi,eg.swap transaction and other game applications
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bigfoot}>Our philosophy</div>
            <div className={styles.litfoot}>
              We want to use zkcube technology to provide decentralized payment
              <br /> services for more global entity services,so that people all over the <br /> world can enjoy
              convenient,safe and fast services.
            </div>
            <div className={styles.footimg}>
              <img className={styles.img} src={BACK2} />
            </div>
            <div className={styles.pagefoot}>
              <span className={styles.pagefsm}>Join the technology community</span>
              <span className={styles.pagefla}>
                <Icon type="email" />
                Zktube technology@Pytube.io
              </span>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};
export default WalletContent;
