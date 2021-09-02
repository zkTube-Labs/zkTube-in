import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import pdf from '@/assets/zkTube_Whitepaper.pdf';
import styles from './index.module.scss';
import BUTTON from '@/assets/button.png';


const PdfContent = () => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    // <div style={{ width: '1152px', height: '88vh', margin: '0 auto', paddingBottom: '200px', overflowX: 'hidden', marginTop: '189px', overflowY: 'scroll', background: '#fff' }}>
    <div className={styles.content}>
      <Document
        file={pdf}
        onLoadSuccess={onDocumentLoadSuccess}
        style={{ width: '100%', margin: '0 auto' }}
      >
        {Array.from(
          new Array(numPages),
          (el, index) => (
            <Page
              width={1150}
              key={`page_${index + 1}`}
              pageNumber={index + 1}
            />
          ),
        )}
      </Document>
      <div className={styles.whitepaper}>
        <a href={pdf} download>
          <input type="image" src={BUTTON} style={{ width: "257px", height: "52px", borderRadius: "25px" }} />
          <div className={styles.center}>download</div>
        </a>
      </div>
    </div>
  )
}

export default PdfContent
