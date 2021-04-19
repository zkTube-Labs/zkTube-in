import React from 'react';
import { Box, Button, Icon } from '@alifd/next';
import BACK from '@/assets/backimg1.png';

import styles from './index.module.scss';


const comingContent = () => {
const url = "https://www.paytube.io/";
  return (
    <div className={styles.list}>
      <div className={styles.listitem}>
        <Box>
          <div className={styles.borderbox}>
            <div className={styles.text}>
                <h1 className={styles.heading}>Decentralized wallet based on layer2</h1>
                <h3 className={styles.heading2}>The combination of zero knowledge protocol and layer2</h3>
            </div>
           
            <div className={styles.footbtn}>
              <Button type="secondary" size="large" style ={{width: "200px",
                color: "white", backgroundColor: "grey"}}> Coming Soon
              </Button>
              <div className={styles.link}>
                  <a href={url}>{url}</a>
              </div>
            </div>
            <div className={styles.allImages}>
                <div className={styles.images}>
                    <img src="" style={{height: "180px", width: "120px"}}></img>
                    <p className={styles.imageName}>Mike</p>
                </div>
                <div className={styles.images}>
                    <img src= "" style={{height: "180px",width: "120px"}}></img>
                    <p className={styles.imageName}>Mike</p>
                </div>
                <div className={styles.images}>
                    <img src= "" style={{height: "180px", width: "120px"}}></img>
                    <p className={styles.imageName}>Mike</p>
                </div>
            </div>
            
            <div className={styles.announcement}>Announcement</div>
           
           
            
          </div>
        </Box>
      </div>
    </div>
  );
};
export default comingContent;
