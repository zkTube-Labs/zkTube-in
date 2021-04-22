import React from 'react';
import { Tab } from '@alifd/next';

import WalletHeader from '@/components/WalletHeader';
import Wallet from './components/Wallet';
import Transactions from './components/Transactions';

import styles from './index.module.scss';

const WalletDetail = () => {
  return (
    <div>
      <WalletHeader />
      <Tab
        shape="pure"
        size="small"
        navClassName={styles.navStyle}
        contentClassName={styles.contentStyle}
        unmountInactiveTabs
        defaultActiveKey="1"
      >
        <Tab.Item title="Wallet" key="1">
          <Wallet />
        </Tab.Item>
        <Tab.Item title="Transactions" key="2">
          <Transactions />
        </Tab.Item>
      </Tab>
    </div>
  );
};

export default WalletDetail;
