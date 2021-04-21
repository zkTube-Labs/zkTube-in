import React, { useCallback, useEffect, useState } from 'react';
import {Input, Form, Select, Button} from '@alifd/next';
import {history} from 'ice';
import Icon from '@/components/Icon';
import store from '@/store';
import TransferSuccess from '../../../TransferSuccess'

import styles from './index.module.scss';

interface IProps {
  amount: string,
  address: string
}

const TransferPage = (props: IProps) => {
 
  const FormItem = Form.Item;
  const Option = Select.Option;
  
  const [, action] = store.useModel('wallet');
  const effectState = store.useModelEffectsState('wallet')
  let [wallet, setWallet] = useState('ETH');
  let [address, setAddress] = useState('');
  let [amount, setAmount] = useState('0.0')
  let [loading, setLoading] = useState(false);

  let loadPage = false;
  let handleChange = (wallet) => {
    console.log(wallet);
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

  const goBack = useCallback(() => {
    history.goBack();
  }, [])

  let transferMoney = useCallback(() => {
   let data = {
     address: address,
     amount : `${amount}`
    }
    // const value = action.transfer(data);
    try{
      action.transfer(data) ? setLoading(true) : "";
    }
    catch (e){
      console.log("err", e);

    }

  },[amount, address]);

  // useEffect(() => {
  //   action.transfer();
  // }, []);
  if(effectState.transfer.isLoading){
    loadPage = true;
  }
  

  return ( 
    <div className={styles.container}>
      {loading? <TransferSuccess add = {address} amt={amount} load={effectState.transfer.isLoading }/> : 

        <div>
         
           <div className={styles.textBox}>
                <div style={{float: "left", margin: "-5px 0px 0px 30px" }}>
                   <a href="/#">
                   <Icon type="icon-back" size= {30} color = "black" onClick={goBack}/>
                  </a> 
                </div>
           
              <h3 className={styles.withdraw}>
                  Transfer
              </h3>
            </div>
          <Form style = {{width: '100%'}} {...formItemLayout}>
                  <div style = {{ margin: "0px 25px" }}>
                    
                      <FormItem label = "To"  className= {styles.to} hasFeedback required requiredTrigger="onBlur" format= {undefined}>

                      <div>
                        <Input type="text" name = "to" className = {styles.inputWidth} 
                        placeholder="address" size="medium" 
                        // value ={address}
                        onChange = {(address) => {
                          setAddress(address);
                        }}
                         
                        />
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
                        <Input type="decimal" name="amount" className = {styles.inputWidth2} placeholder="Amount" 
                        size="medium" step={0.1}
                        onChange = {(amount) => {
                          setAmount(amount);
                        }} />
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
                <Button size="large" className={styles.buttonshow} onClick={transferMoney}> Transfer </Button>

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
      }
    </div>
  );
}

export default TransferPage;
