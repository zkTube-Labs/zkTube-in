import React, { useCallback, useState } from 'react';
import {history} from 'ice';
import {Input, Form, Select, Button, Dialog} from '@alifd/next';
import Icon from '@/components/Icon';
import WithdrawSuccess from '../../../WithdrawSuccess'
import CryptoItem from '../../../WalletDetail/components/CtyptoItem/index';
import store from '@/store';
import styles from './index.module.scss';


function WithdrawPage() {
  const FormItem = Form.Item;
  const Option = Select.Option;
  const effectState = store.useModelEffectsState('wallet')
  const [empty] = useState(false);
  const [wallet1, action] = store.useModel('wallet');

  const [wallet, setWallet] = useState('ETH');
  let [address, setAddress] = useState('');
  let [amount, setAmount] = useState('')
  const [selected, setSelected] = useState<any>();
  const [visible, setVisible] = useState<boolean>(false);

  let [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [resolve, resolveTransfer] = useState(false);
  
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

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const onSelect = useCallback((crypto: string) => {
    setVisible(false);
    setSelected(crypto);
    action.checkStatus(wallet1.syncWallet);
  }, []);


  let withdrawMoney = useCallback(() => {
    let data =`${amount}`;
    try {
      setLoading(true) 
      action.withdraw(data).then(res => {
        if(res == undefined){
          window.location.reload();
        }
        else if(res.success == true){
          resolveTransfer(true);
        }
        else{
          resolveTransfer(false)
        }
      });

    }
    catch(e){
      console.log("error from withdraw page", e);

    }
   }, [amount,address])

   const goBack = useCallback(() => {
    history.goBack();
  }, [])

  const onSearch = (value: string) => {
    const _list = list.filter((item: any) => {
      return item.name.indexOf(value) > -1;
    });
    setList(_list);
  };

  const handleSelectToken = useCallback(() => {
    setVisible(true);
  }, []);

  return (
    <div className={styles.container}>
      {loading}
      {loading ? <WithdrawSuccess add = {address} amt={amount} 
      load={effectState.withdraw.isLoading}
      resolve = {resolve}
      fail = {effectState.withdraw.error}/> : 
        <div>
         
           <div className={styles.textBox}>
                <div style={{float: "left", margin: "-5px 0px 0px 30px" }}>
                   <a href="/#">
                   <Icon type="icon-back" size= {30} color = "black" onClick = {goBack}/>
                  </a> 
                </div>
           
              <h3 className={styles.withdraw}>
                  Withdraw
              </h3>
            </div>
          <Form style = {{width: '100%'}} {...formItemLayout}>
              <div style = {{ margin: "0px 25px" }}>
                <FormItem label = "To"  className= {styles.to} hasFeedback required requiredTrigger="onBlur" format={undefined}>
                {/* <FormItem label = "To" > */}

                <div>
                  <Input type="text" name = "to" className = {styles.inputWidth} 
                  placeholder="address" size="medium"  onChange = {(address) => {
                    setAddress(address);
                  }}/>
                </div>
                </FormItem>
              </div>
              <div style = {{ margin: "0px 25px"}}>
                <FormItem label = "Amount" style = {{ margin : "100px 0px 0px 20px", 
                fontSize: "32px",
              //  fontFamily: "SourceHanSansSC-regular",
                fontWeight: 800
                }}>
                <span style={{display : "inline", overflow: "hidden"}}>
                  <Input type="text" name="amount" onChange = {(amount) => {setAmount(amount);}} className = {styles.inputWidth2} placeholder="Amount" size="medium" />
                </span>
                  <div style={{textAlign: "right", display: "inline"}}>
                  {/* <Select value={wallet} onChange={handleChange} style = {{backgroundColor: "black", padding: "6px"}}> 
                    <Option value="ETH">ETH</Option>
                    <Option value="Ropsten">Ropsten</Option>
                  </Select> */}
                  <Button type="primary"  style={{backgroundColor: "#333340", width: "22%", height : "38px"}} className={styles.buttonSelected} onClick={handleSelectToken}>
                    <Icon type="icon-select" />
                  </Button>
                  </div>

                  <div className= {styles.balance}>
                    <h3 className = {styles.text} >Balance: {wallet1.verifiedBalances}
                    <Button size="small" text className={styles.button} > MAX</Button>        
                    </h3>
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
    } <Dialog
    title="Balances in L1Account"
    height="300px"
    footer={false}
    visible={visible}
    onClose={handleClose}
    className={styles.dialog}
    closeMode={['close', 'esc', 'mask']}
  >
    <Input placeholder="Filter balance in L1" className={styles.search} hasClear onChange={onSearch} />
    {empty ? (
      <div className={styles.empty}>
        <span>No tokens with balance were found!</span>
      </div>
    ) : (
      <div className={styles.list}>
        <CryptoItem icon="icon-eth" currency="ETH" amount={3.4232} dollar={35.0} onClick={() => onSelect('ETH')} />
        <CryptoItem
          icon="icon-usdt"
          currency="USDT"
          amount={3.4232}
          dollar={35.0}
          onClick={() => onSelect('USDT')}
        />
      </div>
    )}
  </Dialog>
    </div>
  );
}

export default WithdrawPage;
