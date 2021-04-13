import React from 'react';

import Header from '@/components/WalletHeader';
import TransferSuccessPage from './components/TransferSuccessPage';

import styles from './index.module.scss';

function TransferSuccess() {
  return (
    <>
      <Header />
      <div className={styles.contentStyle}>
        <TransferSuccessPage />

      </div>

    </>
  );
}

export default TransferSuccess;
