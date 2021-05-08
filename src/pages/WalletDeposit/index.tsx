import React from 'react';

import Header from '@/components/WalletHeader';
import DepositPage from './components/DepositPage';
import SelectWalletDialog from '@/pages/MyWallet/components/SelectWalletDialog';
import MetaDialog from '@/pages/MyWallet/components/MetaDialog';
import ErrorNetworkDialog from '@/pages/MyWallet/components/ErrorNetworkDialog';
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
      <ErrorNetworkDialog />
      {/* <UnMetaDialog /> */}

    </>
  );
}

export default Withdraw;
