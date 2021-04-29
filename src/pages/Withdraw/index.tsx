import React from 'react';

import Header from '@/components/WalletHeader';
import WithdrawPage from './components/WithdrawPage';
import SelectWalletDialog from '../MyWallet/components/SelectWalletDialog';

import styles from './index.module.scss';

function Withdraw() {
  return (
    <>
      <Header />
      <div className={styles.contentStyle}>
        <WithdrawPage />

      </div>
      <SelectWalletDialog />   

    </>
  );
}

export default Withdraw;
