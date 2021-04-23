import React from 'react';

import Header from '@/components/WalletHeader';
import DepositPage from './components/DepositPage';
import SelectWalletDialog from '@/pages/MyWallet/components/SelectWalletDialog';
import MetaDialog from '@/pages/MyWallet/components/MetaDialog';
import UnMetaDialog from '@/pages/MyWallet/components/UnMetaDialog';


import styles from './index.module.scss';

function Withdraw() {
  return (
    <>
      <Header />
      <div className={styles.contentStyle}>
        <DepositPage />

      </div>

      <SelectWalletDialog />
      <MetaDialog />
      <UnMetaDialog />

    </>
  );
}

export default Withdraw;
