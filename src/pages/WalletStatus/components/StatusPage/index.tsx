import React, { useCallback, useState } from 'react';
import Icon from '@/components/Icon';
import { history } from 'ice';
import styles from './index.module.scss';
  
  interface IProps {
    title: string;
    icon: string;
    color: string;
    status: string;
    description: string;
    onClickButton?: ()=> void;
    // amount: string
    add:string;
    amt: string;
  }

  const StatusPage : React.FC<IProps> = ({ title, icon, color,description, onClickButton , add, amt}) => {
   
    const goBack = useCallback(() => {
        history.goBack();
      }, []);

      const viewDetail = useCallback(() => {
          console.log('view details')
      },[])

  return (
    <div className={styles.container}>
        <div className={styles.textBox}>
          <div style={{display: "inline", margin: "0px 20px"}}>
              <Icon type="icon-back" size= 'xl' color = "black" onClick={goBack}/>
          </div>
          <div  style={{display: "inline" , margin: "0px 0px 0px 100px", fontFamily: "SourceHanSansSC-bold",
        fontSize: "16px"}}>
            {title}
          </div>
        </div> 
        <div className= {styles.upperContainer}>
          <div className ={styles.eth}>
            0.1 <sub>ETH</sub>
          </div>
          <div className={styles.balance}>
            <div className={styles.icon}>
              <Icon type={icon} size= {40} color= {color} />
            </div>
            <div className={styles.tip}>
              {status}
            </div>
          </div>
          <div className={styles.text}>
              <h3>
              {description}
              </h3>
          </div>

          <div>
            <p className={styles.address}> To address &nbsp;
              <span> 
                {add}
              </span>
            </p>
          </div>
        </div>
        <div>
        <div className={styles.fee}> Fee &nbsp;
              <span> 
              ETH {amt}
              </span>
        </div>
        </div>
        <div className={styles.detail}>
          <h3 style={{margin: "40px"}}>
          <a href="/#" > View Transaction details
          <span style={{cursor: "pointer"}}>
              <Icon type="icon-up-right" size= {20}  color="#5E45EB" onClick={viewDetail}/>
          </span>
          </a>                
          </h3>
        </div>
        <div>
          <button 
          onClick={onClickButton}
          className= {styles.okbutton}
          > OK </button>
        </div>
        
    </div>
  );
}

export default StatusPage;
