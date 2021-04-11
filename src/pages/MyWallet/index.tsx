import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import WalletContent from './components/WalletContent';
import WalletHeader from '@/components/WalletHeader';

const { Cell } = ResponsiveGrid;

const MyWallet = () => {
  return (
    <ResponsiveGrid gap={20}>
      
      <Cell colSpan={12}>
        <WalletHeader /> 
      </Cell>

      <Cell colSpan={12}>
        <WalletContent />
      </Cell>

    </ResponsiveGrid> 
  );
};
export default MyWallet;
