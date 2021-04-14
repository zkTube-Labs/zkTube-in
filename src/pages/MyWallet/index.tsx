import React,{ useState,useEffect } from 'react';
import { ResponsiveGrid } from '@alifd/next';
import WalletContent from './components/WalletContent';
import WalletHeader from './components/WalletHeader';
import SelectWalletDialog from './components/SelectWalletDialog';
import MetaDialog from './components/MetaDialog';
import UnMetaDialog from './components/UnMetaDialog';
import store from './store';

const { Cell } = ResponsiveGrid;

const MyWallet = () => {
 const [mtState,mtStateDispatch] = store.useModel('mtdialog');


 

  return (
    <ResponsiveGrid gap={20}>
      
      <Cell>
        <WalletHeader /> 
      </Cell>

      <Cell colSpan={12}> 
        <WalletContent />
      </Cell>

      <SelectWalletDialog />

      <MetaDialog />
      
      <UnMetaDialog />  

    </ResponsiveGrid> 
  );
};
export default MyWallet;
