import React, { useCallback, useState } from 'react';
import {Input, Form, Select, Button} from '@alifd/next';
import Icon from '@/components/Icon';

import styles from './index.module.scss';


function WithdrawPage() {
  

  const FormItem = Form.Item;
  const Option = Select.Option;

  const [wallet, setWallet] = useState('ETH');

  let handleChange = (wallet) => {
    setWallet(wallet)
  }

  const formItemLayout = {
    labelCol: {
      fixedSpan: 10
    },

    wrapperCol: {
      span: 14
    }

  };

  let withdrawMoney = () => {
    console.log("withraw");
  }

  return (
    <div className={styles.container}>
      
      {/* <div className={styles.upperContainer}> */}
      
        <div>
         
           <div className={styles.textBox}>
                <div style={{float: "left", margin: "-5px 0px 0px 30px" }}>
                   <a href="/#">
                   <Icon type="icon-back" size= {30} color = "black"/>
                  </a> 
                </div>

           
              <h3 className={styles.withdraw}>
                  Withdraw
              </h3>
            </div>
          <Form style = {{width: '100%'}} {...formItemLayout}>
                  <div style = {{ margin: "0px 25px" }}>
                    
                      <FormItem label = "To"  className= {styles.to} validateState="error" help="Incorrect address">
                      <div>
                        <Input type="text" name = "to" className = {styles.inputWidth} placeholder="address" size="medium" />
                      </div>
                      </FormItem>
                </div>
                <div  style = {{ margin: "0px 25px"}}>
                      <FormItem label = "Amount" style = {{ margin : "100px 0px 0px 20px", 
                     fontSize: "32px",
                    //  fontFamily: "SourceHanSansSC-regular",
                     fontWeight: 800
                    }}>
                      <span style={{display : "inline", overflow: "hidden"}}>
                        <Input type="text" name="amount" className = {styles.inputWidth2} placeholder="Amount" size="medium" />
                      </span>
                        <div style={{textAlign: "right", display: "inline"}}>
                        <Select value={wallet} onChange={handleChange} style = {{backgroundColor: "black", padding: "6px"}}> 
                          <Option value="ETH">ETH</Option>
                          <Option value="Ropsten">Ropsten</Option>
                        </Select>
                        </div>
                        <div>
                        <h3 className = {styles.balance} >Balances: 0.0 
                        <a href="/#" > MAX</a></h3>        

                        </div>
                      </FormItem>
                </div>
                <Button size="large" className={styles.buttonshow} onClick={withdrawMoney}> Withdraw </Button>

                <div className={styles.textBox}>
                  <h3 style={{float:"left", marginLeft: "40px"}}> Fee:</h3>

                  <h3 style={{float:"right", marginRight: "40px"}}>
                  <a href="/#" > Choose fee token</a>

                  </h3>
                </div>
                <div style={{clear: "both"}}></div>

                <p className={styles.comment}>
                  MetaMask Tx Signature: User denied transaction signature.
                </p>

              
          </Form>
         
         
            
        </div>
      
    </div>
  );
}

export default WithdrawPage;
