import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import WalletContent from './components/WalletContent';
import WalletHeader from '@/components/WalletHeader';
import SelectWalletDialog from './components/SelectWalletDialog';
import AuthorizeDialog from './components/AuthorizeDialog';

const { Cell } = ResponsiveGrid;

const MyWallet = () => {
  return (
    <ResponsiveGrid gap={20}>
      
      <Cell>
        <WalletHeader /> 
      </Cell>

      <Cell colSpan={12}> 
        <WalletContent />
      </Cell>

      <SelectWalletDialog />

      <AuthorizeDialog visible={false} introduct={''}/>
      
    </ResponsiveGrid> 
  );
};
export default MyWallet;
