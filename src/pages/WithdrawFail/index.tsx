import React from 'react';

import Header from '@/components/WalletHeader';
import WithdrawFailPage from './components/WithdrawFailPage';

import styles from './index.module.scss';

function WithdrawFail() {
  return (
    <>
      <Header />
      <div className={styles.contentStyle}>
        <WithdrawFailPage />

      </div>

    </>
  );
}

export default WithdrawFail;
