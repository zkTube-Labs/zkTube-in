import React, { useCallback, useState } from 'react';
import {Input, Form, Button, NumberPicker, Dialog, List} from '@alifd/next';
import { ethers } from 'ethers';

import {history} from 'ice';
import Icon from '@/components/Icon';
import store from '@/store';
import TransferSuccess from '../../../TransferSuccess';
import CryptoItem from '../../../WalletDetail/components/CtyptoItem/index';
import styles from './index.module.scss';


const TransferPage = () => {
 
  const FormItem = Form.Item;
  
  const [wallet1, action] = store.useModel('wallet');
  const effectState = store.useModelEffectsState('wallet')
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>('ETH');
  let [address, setAddress] = useState('');
  let [amount, setAmount] = useState('0.0')
  let [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState<any>('0.0');
  const [ethL1Balance, setEthL1Balance] = useState<any>();
  const [gasPrice, setgasPrice] = useState<any>();
  const [canTransfer, setCanTransfer] = useState<boolean>(false);
  const [list, setList] = useState([]);
  const [resolve, resolveTransfer] = useState(false);
  const [transferRadOnly, setReadOnly] = useState<boolean>(true);
  const [assetsList, setAssets] = useState([]);
  const [loadingBalance, setLoadingBalance] = useState<boolean>(false);
  const [ethPrice, setEthPrice] = useState(0);
  const [message,setMessage] = useState<boolean>(false);
  let [fee, setFee] = useState(null);

  let ePrice = 0;

  const goBack = useCallback(() => {
    history.goBack();
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const onSelect = useCallback((crypto: any) => {
     setVisible(false);
    setReadOnly(false);
    setSelected(crypto.currency);
    setBalance(crypto.amount);
    onChangeAddress(address);

  }, [wallet1]);

  const formItemLayout = {
    labelCol: {
      fixedSpan: 10
    },

    wrapperCol: {
      span: 14
    }
  };

 

   const handleSelectToken = useCallback(() => {
    setVisible(true);
    updateAssets();

  }, []);


  const onChangeAddress = useCallback((_address) => {

    if(_address && wallet1.assets){
      setAddress(address);
      const promTransFee = wallet1.syncHTTPProvider.getTransactionFee('Transfer', _address,'ETH');
   promTransFee.then((val) => {
      let totalFee =  ethers.utils.formatEther(val?.totalFee);
      setFee(totalFee);

      const feewei = ethers.utils.parseEther(`${totalFee}`);
      const amt = ethers.utils.parseEther(`${amount}`);

      const feeAmount = feewei.add(amt);

      if(feeAmount.lte(wallet1?.assets?.verified?.balances?.ETH)){
        setCanTransfer(true);
      }
     

      // if(balance > feeAmount)

   });
    }
 
  }, [address, wallet1]);

  const showTranferButton = useCallback(()=>{

  }, [])

  let transferMoney = useCallback(() => {
   let data = {
     address: address,
     amount : `${amount}`
    }
    setLoading(true) 
    try{
      const transfer = action.transfer(data);
      transfer.then((_transfer) =>{
        let gasPrices = ethers.BigNumber.from(0);
        setgasPrice(gasPrices);
        if (_transfer?.awaitReceipt) {
            action.update({ transferContract: _transfer });
          const receipt = _transfer.awaitReceipt(); 
          receipt.then((_receipt) => {
            resolveTransfer(true);
          });
          const verify = _transfer.awaitVerifyReceipt();
          verify.then((_verify) => {
          });
        }
        
        if (wallet1?.web3?.eth) {
          const promGasPrice = wallet1.web3.eth.getGasPrice();
          promGasPrice.then((val) => {
            gasPrices = ethers.BigNumber.from(val);
            setgasPrice (gasPrices);

            // setTimeout(getTransferData, 200);
          });
        }      
      })
      
    }
    catch (e){
      // const exceptionMsg = 'UserDeniedTransaction';
      // wallet1.update({
      //   exceptionMsg,
      // });
      // // throw(exceptionMsg);
      console.log("messageerror", e.message);
      if (e.message?.indexOf('User denied message signature.') > 0) {
        setLoading(false);
      }

    }

  },[amount, wallet1, address]);

  function formatBalance(currency, curBalance) {
    if (currency == 'ETH') {
      const wei = ethers.BigNumber.from(curBalance);
      return ethers.utils.formatEther(wei);
    } else {
      return curBalance;
    }
  } 


  const updateAssets = useCallback(() => {
    try {
      const walletSigned = action.walletSigned();
      walletSigned.then((signed) => {
        if (signed) {
          refreshAssets(wallet1);
        } else {
          setLoadingBalance(true);
          const provider = action.refreshWallet();
          provider.then((val) => {
            refreshAssets(wallet1);
          });
        }
      });
    } catch (e) {
    }

  }, [wallet1]);


  const onSearch = (value: string) => {
    const _list = list.filter((item: any) => {
      return item.name.indexOf(value) > -1;
    });
    setList(_list);
  };

  const refreshAssets = useCallback((wallet) => {
    const promRefresh = action.refreshL2Assets();
    const promEthPrice = action.refreshTokenPrice('ETH');
    promRefresh.then((assets) => {
      if (assets) {
        UIrefreshEthBalance(assets, ePrice);
      }
    });
    promEthPrice.then((val) => {
      setEthPrice(val);
      ePrice = val;
      UIrefreshEthBalance(wallet1.assets, ePrice);
    });
  }, [wallet1, ePrice]);
  
  // function UIrefreshEthBalance() {
    const UIrefreshEthBalance = useCallback((assets, ePrice) => {
      const dataSource = [];
      if (assets?.verified?.balances) {
        for (const [token, balance] of Object.entries(assets.verified.balances)) { 
          const formatedBalance = formatBalance(token, balance);
          dataSource.push({
            icon: 'icon-' + token.toLowerCase(),
            currency: token,
            amount: formatedBalance,
            dollar: ePrice > 0 ? formatedBalance * ePrice : 0,
          });
        }
        setAssets(dataSource);
        setLoadingBalance(false);
      }
    }, [wallet1, ePrice]);
  


  const onAmountChange = useCallback((_amount) => {

  let amount1 = '0.0'
  if (_amount <= 0.0) {
    amount1 = '0.0';
    setAmount('0.0');
  } else if (typeof _amount == 'number' && wallet1?.assets?.verified?.balances?.ETH > 0.0) {
    const ethAmount = ethers.utils.parseEther(_amount.toString());
    if (ethAmount.gte(wallet1?.assets?.verified?.balances?.ETH)) {
      amount1 = ethers.utils.formatEther(wallet1.assets.verified.balances.ETH);
      setAmount(ethers.utils.formatEther(wallet1.assets.verified.balances.ETH));
    } else {
      amount1 = _amount.toString();
      setAmount(_amount.toString());
    }
  } else {
    amount1 = '0.0';

    setAmount('0.0');

  }

  const promTransFee = wallet1.syncHTTPProvider.getTransactionFee('Transfer', address,'ETH');
  promTransFee.then((val) => {
     let totalFee =  ethers.utils.formatEther(val?.totalFee);
     const feewei = ethers.utils.parseEther(`${totalFee}`);
     const amt = ethers.utils.parseEther(`${amount1}`);

     const feeAmount = feewei.add(amt);
     
     if(feeAmount.lte(wallet1?.assets?.verified?.balances?.ETH)){
       setCanTransfer(true);
       setMessage(false);

     }
     else{
       setCanTransfer(false);
       setMessage(true);
     }
    

     // if(balance > feeAmount)

  });

  }, [wallet1, amount]);

  const onException = useCallback((message) => {
  }, [wallet1]);

  const setAmountByWei = useCallback((wei) => {
    const _wei = ethers.BigNumber.from(wei);
    const eth = ethers.utils.formatEther(_wei);
    setAmount(eth);

  }, []);

  return ( 
    <div className={styles.container} style={{marginTop : "20px"}}>
      {loading? 
      (<TransferSuccess add = {address} amt={amount}
      load={effectState.transfer.isLoading } resolve={resolve}/> ): 

      (
        <div>
         
            <div className={styles.textBox}>
              <div style={{float: "left", margin: "-5px 0px 0px 30px" }}>
                <Icon type="icon-back" size= {30} color = "black" onClick={goBack}/>
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
                      onChange = {(address) => {setAddress(address);}}
                    />
                  </div>
                </FormItem>
              </div>
              <div  style = {{ margin: "0px 25px"}}>
                  <FormItem label = "Amount" style = {{ margin : "100px 0px 0px 20px", 
                  fontSize: "32px",
                  fontWeight: 800
                }}>
                <span style={{display : "inline", overflow: "hidden", width: "286px"}}>
                  {/* <Input type="decimal" name="amount" className = {styles.inputWidth2} placeholder="Amount" 
                  size="medium" step={0.1}
                  onChange = {(amount) => {
                    setAmount(amount);
                  }} /> */}
                  {/* <div className={styles.fieldContainer}> */}

                   <NumberPicker
                    size="large"
                    className={styles.input}
                    disabled={transferRadOnly}
                    defaultValue={0}
                    value={Number(amount)}
                    min={0.0}
                    step={0.001}
                    precision={18}
                    onChange={(_amount) => { onAmountChange(_amount); }}
                  />
                {/* </div> */}
                </span>
                <div style={{textAlign: "right", display: "inline"}}>
                  {/* <Select value={wallet} onChange={handleChange} style = {{backgroundColor: "black", padding: "6px"}}> 
                    <Option value="ETH">ETH</Option>
                    <Option value="Ropsten">Ropsten</Option>
                  </Select> */}
                  
                  <Button type="primary"  style={{backgroundColor: "#333340", width: "22%", height : "38px"}} className={styles.buttonSelected} onClick={handleSelectToken}>
                    {selected}
                    <Icon type="icon-select" />
                  </Button>
                </div>
                  {/* {selected && ( */}
                    
                  <div className= {styles.balance}>
                    {/* <h3 className = {styles.text} >Balance: {wallet1.verifiedBalances} */}
                    <h3 className = {styles.text} >Balance: {balance}

                    <Button size="small" text className={styles.button} 
                     onClick={() => {
                      setAmountByWei(ethL1Balance);
                    }}
                    > 
                    <span style={{ marginBottom : "30px", fontSize : "16px", fontWeight : "bold"}}>MAX</span> 

                    </Button>        
                    </h3>
                  </div>
                  {/* )} */}
                  
                </FormItem>
                </div>
                <Button size="large" className={styles.buttonshow} disabled={!canTransfer} onClick={transferMoney}> Transfer </Button>

                <div className={styles.textBox}>
                  <h3 style={{float:"left", marginLeft: "40px"}}> Fee: { fee ? fee +"ETH": ''}</h3>

                  <h3 style={{float:"right", marginRight: "40px"}}>
                  {/* <a href="" > Choose fee token</a> */}

                  </h3>
                </div>
                <div style={{clear: "both"}}></div>

                <p className={styles.comment} >
                  {/* {(wallet1.exceptionMsg && onException(wallet1.exceptionMsg))} */}
                  {message ? (
                    <span>Fee is not enough. Please use another token</span>

                  ) : ""}
                </p>
            </Form>
            
          </div>
        )}

      <Dialog
        title="Balances in L2 Account"
        height="300px"
        footer={false}
        visible={visible}
        onClose={handleClose}
        className={styles.dialog}
        closeMode={['close', 'esc', 'mask']}
      >
        {/* <Input placeholder="Filter balance in L1" className={styles.search} hasClear onChange={onSearch} /> */}
        <div className={styles.list} style={{cursor: "pointer"}}>
        <List
            size="medium"
            loading={loadingBalance}
            emptyContent="No tokens with balance were found!"
            dataSource={assetsList}
            renderItem={(item, i) => (
              <List.Item
                key={i}
                extra={item.money}
                title={item.title}
                
                media={
                  <CryptoItem 
                  icon={item.icon}
                  currency={item.currency}
                  amount={item.amount}
                  dollar={item.dollar}
                  onClick={() => onSelect(item)}
                  
                />}
              />
            )}
          />
          </div>
      </Dialog>
      <div>
        { wallet1.exceptionMsg && onException(wallet1.exceptionMsg) }
      </div>
    </div>
  );
}

export default TransferPage;
