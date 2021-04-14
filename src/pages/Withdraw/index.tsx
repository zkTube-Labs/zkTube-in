import React from 'react';

import Header from '@/components/WalletHeader';
import WithdrawPage from './components/WithdrawPage';

import styles from './index.module.scss';

function Withdraw() {
  return (
    <>
      <Header />
      <div className={styles.contentStyle}>
        <WithdrawPage />

      </div>

    </>
  );
}

export default Withdraw;
