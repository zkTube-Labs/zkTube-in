import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import WalletContent from './components/WalletContent';
import WalletHeader from './components/WalletHeader';
import SelectWalletDialog from './components/SelectWalletDialog';
import MetaDialog from './components/MetaDialog';
import UnMetaDialog from './components/UnMetaDialog';
import ErrorNetworkDialog from './components/ErrorNetworkDialog';
import backImage from '../../assets/fullImage.png';

const { Cell } = ResponsiveGrid;

const MyWallet = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell>
        <WalletHeader />
      </Cell>
      <Cell colSpan={12} style={{backgroundImage: "url(" + backImage + ")" }}>
        <WalletContent />
      </Cell>
      <SelectWalletDialog />
      <MetaDialog />
      <UnMetaDialog />
      <ErrorNetworkDialog />
    </ResponsiveGrid>
  );
};
export default MyWallet;
