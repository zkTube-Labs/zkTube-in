import React, { useCallback } from 'react';
import { Message } from '@alifd/next';
import copy from 'copy-text-to-clipboard';

import Icon from '@/components/Icon';
import ActionButton from '../ActionButton';
import CryptoItem from '../CtyptoItem';

import styles from './index.module.scss';

function Wallet() {
  const onDeposit = useCallback(() => {
    console.log('deposit');
  }, []);

  const onWithdraw = useCallback(() => {
    console.log('withdraw');
  }, []);

  const onTransfer = useCallback(() => {
    console.log('transfer');
  }, []);

  const onCopy = useCallback(() => {
    copy('0xD6649922bAe39aC532fA9b5A4F36CaA5B957969D');
    Message.success('已复制！');
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.upperContainer}>
        <div className={styles.account}>ETHL2Account</div>
        <div className={styles.balance}>
          <div className={styles.amount}>$56.00</div>
          <div className={styles.tip}>balance</div>
        </div>
        <div className={styles.addressContainer}>
          <span className={styles.address}>0xD6649922bAe39aC532fA9b5A4F36CaA5B957969D</span>
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
        <CryptoItem icon="icon-eth" currency="ETH" amount={3.4232} dollar={35.00} />
        <CryptoItem icon="icon-usdt" currency="USDT" amount={3.4232} dollar={35.00} />
        <CryptoItem icon="icon-usdc" currency="USDC" amount={54.98} dollar={35.00} />
      </div>
    </div>
  );
}

export default Wallet;
