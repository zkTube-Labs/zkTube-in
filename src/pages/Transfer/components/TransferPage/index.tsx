import React, { useCallback, useState } from 'react';
import {Input, Form, Select, Button} from '@alifd/next';
import Icon from '@/components/Icon';

import styles from './index.module.scss';


function TransferPage() {
  

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

  let transferMoney = () => {
    console.log("transfer");
  }

  return (
    <div className={styles.container}>
      
      {/* <div className={styles.upperContainer}> */}
      
        <div>
         
           <div className={styles.textBox}>
                <div style={{float: "left", margin: "-5px 0px 0px 14px" }}>
                   <a href="/#">
                   <Icon type="icon-back" size= {30} />

                  </a> 
                </div>

           
              <h3 className={styles.transfer}>
                  Transfer
              </h3>
            </div>
          <Form style = {{width: '100%'}} {...formItemLayout}>
                  <div style = {{ 
                        margin: "0px 25px", 
              
                        }}>
                    
                      <FormItem label = "To"  className= {styles.to} validateState="error" help="Incorrect address">
                      <div>
                        <Input type="text" name = "to" className = {styles.inputWidth} placeholder="address" size="medium" />
                      </div>
                      </FormItem>
                </div>
                <div  style = {{ 
                        margin: "0px 25px", 
              
                        }}>
                      <FormItem label = "Amount" style = {{ margin : "70px 0px 0px 5px", 
                     fontSize: "20px",
                     fontFamily: "SourceHanSansSC-regular"
                    }}>
                      <span style={{display : "inline", overflow: "hidden"}}>
                        <Input type="text" name="amount" className = {styles.inputWidth2} placeholder="Amount" size="medium" />
                      </span>
                        <div style={{textAlign: "right", display: "inline", width: '20%'}}>
                        <Select value={wallet} onChange={handleChange} style = {{backgroundColor: "black"}}> 
                          <Option value="ETH">ETH</Option>
                          <Option value="Ropsten">ETH</Option>
                          <Option value="">ETH</Option>

                        </Select>
                        </div>
                        
                        <h3 className = {styles.balance} >Balances: 0.0 <a href="/#" > MAX</a></h3>
                        
                        {/* <Input type="text" className = {styles.inputWidth} placeholder="Amount" size="medium" /> */}
        
                      </FormItem>
                </div>
                
                <Button size="large" className={styles.buttonshow} onClick={transferMoney}> Transfer </Button>

                <div className={styles.textBox}>
                  <h3 style={{float:"left", marginLeft: "30px"}}> Fee:</h3>

                  {/* <h3 className = {styles.fee} >Balances: 0.0 <a href="/#" > MAX</a></h3> */}

                  <h3 style={{float:"right", marginLeft: "30px"}}>
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

export default TransferPage;
