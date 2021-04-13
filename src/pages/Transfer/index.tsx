import React from 'react';

import Header from '@/components/WalletHeader';
import TransferPage from './components/TransferPage';

import styles from './index.module.scss';

function Transfer() {
  return (
    <>
      <Header />
      <div className={styles.contentStyle}>
        <TransferPage />

      </div>

    </>
  );
}

export default Transfer;
