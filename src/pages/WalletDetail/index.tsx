import React from 'react';
import { Tab } from '@alifd/next';

import Header from '@/components/WalletHeader';
import Wallet from './components/Wallet';
import Transactions from './components/Transactions';

import styles from './index.module.scss';

function WalletDetail() {
  return (
    <>
      <Header />
      <Tab
        shape="pure"
        size="small"
        navClassName={styles.navStyle}
        contentClassName={styles.contentStyle}
        unmountInactiveTabs
      >
        <Tab.Item title="Wallet" key="1">
          <Wallet />
        </Tab.Item>
        <Tab.Item title="Transactions" key="2">
          <Transactions />
        </Tab.Item>
      </Tab>
    </>
  );
}

export default WalletDetail;
