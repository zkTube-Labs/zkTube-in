import React from 'react';
import { ResponsiveGrid } from '@alifd/next';
import ComingContent from './components/comingContent'
import ComingHeader from './components/comingHeader';


const { Cell } = ResponsiveGrid;

const ComingSoon = () => {
  return (
    <ResponsiveGrid gap={20}>
      <Cell>
        <ComingHeader />
      </Cell>
      <Cell colSpan={12}>
        <ComingContent />
      </Cell>
    </ResponsiveGrid>
  );
};
export default ComingSoon;
