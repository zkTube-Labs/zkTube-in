import React, { useCallback } from 'react';
import { Message } from '@alifd/next';
import copy from 'copy-text-to-clipboard';
import { history } from 'ice';

import Icon from '@/components/Icon';
import ActionButton from '../ActionButton';
import CryptoItem from '../CtyptoItem';
import store from '@/store';
import { ethers } from 'ethers';

import styles from './index.module.scss';

function Wallet() {
  const [wallet, action] = store.useModel('wallet');

  const onDeposit = useCallback(() => {
    action.setState({ selectWalletDialogVisible: false, metaDialogVisible: false });
    history.push('/wallet/deposit');
  }, []);

  const onWithdraw = useCallback(() => {
    action.setState({ selectWalletDialogVisible: false, metaDialogVisible: false });
    history.push('/wallet/withdraw');
    // console.log('withdraw');
  }, []);

  const onTransfer = useCallback(() => {
    history.push('/wallet/transfer');
    // console.log('transfer');
  }, []);

  const onCopy = useCallback(() => {
    if (wallet?.account) {
      copy(wallet.account);
      Message.success('已复制！');
    }
  }, [wallet]);

  const caclEthValue = useCallback((fixed) => {
    if (wallet?.ethPrice > 0 && wallet?.assets) {
      if (wallet?.assets?.verified?.balances?.ETH) {
        const amount = Number(ethers.utils.formatEther(wallet.assets.verified.balances.ETH));

        if (fixed > 0) {
          const value = amount * wallet.ethPrice;
          return value.toFixed(fixed);
        } else {
          return amount * wallet.ethPrice;
        }
      }
      console.log(wallet.assets);
    }

    return 0.00;
  }, [wallet]);


  const handleConnectClick = () => {
    action.setState({ selectWalletDialogVisible: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <div className={styles.account}>ETHL2Account</div>
        <div className={styles.balance}>
          <div className={styles.amount}>${caclEthValue(2) || '0.00'}</div>
          <div className={styles.tip}>balance</div>
        </div>
        <div className={styles.addressContainer}>
          <span className={styles.address}>
            {wallet.account ? (
              wallet.account
            ) : (
              <button className={styles.connect} onClick={handleConnectClick} >
                <div className={styles.center}>Connect to a wallet</div>
              </button>
            )}
          </span>
          <Icon type="icon-copy-fill" size="large" onClick={onCopy} />
        </div>
        <div className={styles.actions}>
          <ActionButton icon="icon-down" title="Deposit" onClick={onDeposit} />
          <ActionButton icon="icon-up" title="Withdraw" onClick={onWithdraw} />
          <ActionButton icon="icon-transfer" title="Transfer" onClick={onTransfer} />
        </div>
      </div>
      <div className={styles.title}>Assets</div>
      <div className={styles.cryptoList}>
        <CryptoItem
          icon="icon-eth"
          currency="ETH"
          amount={wallet?.assets?.verified?.balances?.ETH ? (Number(ethers.utils.formatEther(wallet?.assets?.verified?.balances?.ETH))) : 0}
          dollar={caclEthValue()}
        />
        {/* <CryptoItem icon="icon-usdt" currency="USDT" amount={3.4232} dollar={35.00} />
        <CryptoItem icon="icon-usdc" currency="USDC" amount={54.98} dollar={35.00} /> */}
      </div>
    </div>
  );
}

export default Wallet;
