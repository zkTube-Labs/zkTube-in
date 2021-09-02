import React, { useEffect } from 'react';
// import { ResponsiveGrid } from '@alifd/next';
// import WalletHeader from '../MyWallet/components/WalletHeader';
// import backImage from '@/assets/fullImage.png';
// import PdfContent from './components/PdfContent';

// import pdf from '@/assets/zkTube_Whitepaper.pdf';
import pdf from '@/assets/Terms of Use and Privacy.pdf';

// const { Cell } = ResponsiveGrid;
const WhitePaper = () => {
  useEffect(() => {
    document.title = 'Terms of Use and Privacy';
  }, []);
  return (
    // <ResponsiveGrid>
    //   <Cell>
    //     <WalletHeader />
    //   </Cell>
    //   <Cell colSpan={12} style={{ background: "#151333" }}>
    //     <PdfContent />
    //   </Cell>

    // </ResponsiveGrid>
    <div style={{ width: '100vw', height: '100vh' }}>
      <iframe src={pdf} width="100%" height="100%" />
    </div>
  );
};

export default WhitePaper;
