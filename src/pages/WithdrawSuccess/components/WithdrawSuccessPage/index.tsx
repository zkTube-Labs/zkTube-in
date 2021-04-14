import React, { useCallback, useState } from 'react';
import { Button} from '@alifd/next';
import Icon from '@/components/Icon';

import styles from './index.module.scss';


function WithdrawSuccessPage() {
  
  let okWithdraw = () =>{
    console.log("transfer ok");
  }

  return (
    <div className={styles.container}>
      
      {/* <div className={styles.upperContainer}> */}
      
        <div>
            <div className={styles.textBox}>
                <div style={{float: "left", margin: "-5px 0px 0px 14px" }}>
                    <Icon type="icon-back" size= {30} color = "black"/>
                </div>
              <h3 className={styles.transfer}>
                  Withdraw
              </h3>
            </div> 
          <div className= {styles.upperContainer}>
              <div className ={styles.eth}>
                0.1 <sub>ETH</sub>
              </div>
              <div className={styles.balance}>
                <div className={styles.icon}>
                    <Icon type="icon-success" size= {40} color="green" />
                </div>
                <div className={styles.tip}>
                    success
                </div>
              </div>
              <div className={styles.text}>
                  <h3>
                  Your Withdrawal will be processed shortly. Use the transaction link to track the progress.                  </h3>
              </div>

              <div>
                  <p className={styles.address}> To address &nbsp;
                    <span> 
                    0xD6649922bAe39aC532fA9b5A4F36CaA5B957969D
                    </span>
                  </p>
              </div>
          </div>
          <div>
              <p className={styles.fee}> Fee &nbsp;
                    <span> 
                    ETH 0.0001403 
                    </span>
                </p>
            </div>
            <div className={styles.detail}>
                <h3 style={{margin: "40px"}}>
                <a href="/#"> View Transaction details
                <span>
                    <Icon type="icon-up" size= {20} />
                </span>
                </a>                
                </h3>
            </div>
            <div>
                <button 
                onClick={okWithdraw}
                className= {styles.okbutton}
                > OK </button>
            </div>
        </div>
    </div>
  );
}

export default WithdrawSuccessPage;
