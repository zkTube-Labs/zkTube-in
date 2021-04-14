import React from 'react';

import Header from '@/components/WalletHeader';
import WithdrawSuccessPage from './components/WithdrawSuccessPage';

import styles from './index.module.scss';

function WithdrawSuccess() {
  return (
    <>
      <Header />
      <div className={styles.contentStyle}>
        <WithdrawSuccessPage />

      </div>

    </>
  );
}

export default WithdrawSuccess;
