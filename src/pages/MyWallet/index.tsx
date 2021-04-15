import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import WalletContent from './components/WalletContent';
import WalletHeader from './components/WalletHeader';
import SelectWalletDialog from './components/SelectWalletDialog';
import MetaDialog from './components/MetaDialog';
import UnMetaDialog from './components/UnMetaDialog';

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
      <MetaDialog />
      <UnMetaDialog />
    </ResponsiveGrid>
  );
};
export default MyWallet;
