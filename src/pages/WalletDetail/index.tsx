import React from 'react';
import { Tab } from '@alifd/next';

import WalletHeader from '@/components/WalletHeader';

import Wallet from './components/Wallet';
import Transactions from './components/Transactions';
import SelectWalletDialog from '../MyWallet/components/SelectWalletDialog';

import styles from './index.module.scss';

const WalletDetail = () => {
  return (
    <div>
     
     <span className= {styles.header}>
      <WalletHeader/>
     </span>
      <hr/>
      <Tab 
        shape="pure"
        size="medium"
        navClassName={styles.navStyle}
        contentClassName={styles.contentStyle}
        unmountInactiveTabs
        defaultActiveKey="1"
      >
        
        <Tab.Item title="Wallet" key="1" style = {{marginRight:"20px"}}>
          <Wallet/>
        </Tab.Item>
        <Tab.Item title="Transactions" key="2">
          <Transactions />
        </Tab.Item>
      </Tab>
      <SelectWalletDialog />   

      {/* <WalletFooter/> */}

    </div>
  );
};

export default WalletDetail;
