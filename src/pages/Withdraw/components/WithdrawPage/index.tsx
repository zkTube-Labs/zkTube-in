import React, { useCallback, useState } from 'react';
import {history} from 'ice';
import {Input, List, Form, Select, Button, NumberPicker, Dialog} from '@alifd/next';
import Icon from '@/components/Icon';
import WithdrawSuccess from '../../../WithdrawSuccess'
import CryptoItem from '../../../WalletDetail/components/CtyptoItem/index';
import store from '@/store';
import styles from './index.module.scss';
import { ethers } from 'ethers';
import web3 from 'web3';



function WithdrawPage() {
  const FormItem = Form.Item;
  const Option = Select.Option;
  const effectState = store.useModelEffectsState('wallet')
  const [empty] = useState(false);
  const [wallet1, action] = store.useModel('wallet');

  const [wallet, setWallet] = useState('ETH');
  let [address, setAddress] = useState('');
  let [amount, setAmount] = useState('0.0');
  const [withdrawReadonly, setReadonly] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>('ETH');
  const [visible, setVisible] = useState<boolean>(false);

  let [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [resolve, resolveTransfer] = useState(false);
  const [balance, setBalance] = useState('0.0');

  const [detailUrl, setDetailUrl] = useState('');

  const [loadingBalance, setLoadingBalance] = useState<boolean>(false);
  const [assetsList, setAssets] = useState([]);
  const [ethPrice, setEthPrice] = useState(0);
  const [message,setMessage] = useState<boolean>(false);
  const [canWithdraw, setCanWithdraw] = useState<boolean>(false);
  let [fee, setFee] = useState(null);
  const [validAddress, setValidAddress] = useState<boolean>(false);


  let ePrice = 0;

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

  const onSelect = useCallback((crypto : any) => {
    // console.log(crypto.amount)
    setVisible(false);
    setSelected(crypto.currency);
    setBalance(crypto.amount);
    onChangeAddress(address);
    action.checkStatus(wallet1.syncWallet);
  }, [wallet1]);


  let withdrawMoney = useCallback(() => {
    console.log("amot", amount)
    console.log("selected", selected)

    // if (amount && selected?.currency) {
    //   let data = {amount, token: selected.currency, to: address};
    if (amount) {
      let data = {amount, to: address};  
    try {
        setLoading(true) 
        const promWithdraw = action.withdraw(data);
      
        promWithdraw.then((ret) => {
          console.log("ret", ret)
          if (ret?.receipt) {
            ret.receipt.then((_receipt) => {
              console.log("_receipt", _receipt);
              const checkUrl = wallet1.l2BlockUrl + '/blocks/' + _receipt.block.blockNumber;
              setDetailUrl(checkUrl);
              // console.log('receipt', _receipt)
            })
          }

          if (ret?.verifyReceipt) {
            ret.verifyReceipt.then((_verifyReceipt) => {
              console.log('verifyReceipt', _verifyReceipt);
              const checkUrl = wallet1.l2BlockUrl + '/blocks/' + _verifyReceipt.block.blockNumber;
              setDetailUrl(checkUrl);
              if(_verifyReceipt == undefined){
                // window.location.reload();
                console.log(_verifyReceipt);
              }
              else if(_verifyReceipt.success == true){
                resolveTransfer(true);
              }
              else{
                resolveTransfer(false)
              }
            })
          }
        });
      }
      catch(e){
        console.log("error from withdraw page", e);
      }
    }
   }, [wallet1, amount, address])

  const goBack = useCallback(() => {
    history.goBack();
  }, [])

  const onSearch = (value: string) => {
    const _list = list.filter((item: any) => {
      return item.name.indexOf(value) > -1;
    });
    setList(_list);
  };

  const setAmountByWei = useCallback((wei) => {
    const _wei = ethers.BigNumber.from(wei);
    const eth = ethers.utils.formatEther(_wei);
    setAmount(eth);

  }, []);

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
      console.log('error input', _amount);
    }
  }, [wallet1, amount]);

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
            console.log('updateAssets, refreshWallet', val);
            refreshAssets(wallet1);
          });
        }
      });
    } catch (e) {
      console.log('action.updateAssets', e);
    }

  }, [wallet1]);

  const onChangeAddress = useCallback((_address) => {
    if (_address && wallet1?.assets) {
        setAddress(_address);
        const promTransFee = wallet1.syncHTTPProvider.getTransactionFee('Withdraw', _address, 'ETH');
        promTransFee.then((val) => {
          console.log("val",val)
          let totalFee =  ethers.utils.formatEther(val?.totalFee);
          setFee(totalFee);

          const feewei = ethers.utils.parseEther(`${totalFee}`);
          console.log("feewei", feewei);
          console.log("amtt", amount);

        const amt = ethers.utils.parseEther(`${amount}`);

        const feeAmount = feewei.add(amt);

        if(feeAmount.lte(wallet1?.assets?.verified?.balances?.ETH)){
          setCanWithdraw(true);
        }    
          console.log('Withdraw fee', val);
        });
      // } catch (e) {
      //   console.log(e);
      // }
    }

  }, [wallet1, address]);

  const refreshAssets = useCallback((wallet) => {
    const promRefresh = action.refreshL2Assets();
    const promRefreshL1 = action.refreshEthBalance();

    const promEthPrice = action.refreshTokenPrice('ETH');
    promRefresh.then((assets) => {
      if (assets) {
        UIrefreshEthBalance(assets, ePrice);
        console.log('updateAssets, refreshWallet, ethL1Balance', assets, ePrice);
      }
    });
    promEthPrice.then((val) => {
      setEthPrice(val);
      ePrice = val;
      UIrefreshEthBalance(wallet1.assets, ePrice);
      console.log('refreshAssets, refreshWallet, ethL1Balance', val);
    });
  }, [wallet1, ePrice, address]);

  function formatBalance(currency, curBalance) {
    if (currency == 'ETH') {
      const wei = ethers.BigNumber.from(curBalance);
      return ethers.utils.formatEther(wei);
    } else {
      return curBalance;
    }
  }

  const UIrefreshEthBalance = useCallback((assets, ePrice) => {
    const dataSource = [];
    console.log('UIrefreshEthBalance', wallet1, assets, ePrice);
    if (assets?.verified?.balances) {
      for (const [token, balance] of Object.entries(assets.verified.balances)) {
        console.log('token, balance', token, balance);

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

  const handleSelectToken = useCallback(() => {
    setVisible(true);
    updateAssets();
  }, []);

  const setMaxAmount = useCallback(() => {
    if (amount) {
      setAmount(amount);
    } else {
      setAmount('0.0');
    }
  }, [wallet1]);

  const checkAddress = useCallback((_address) => {
    setAddress(_address);
    if (!web3.utils.isAddress(_address)){
      setValidAddress(true);
    }
    else{
      setValidAddress(false);

    }

  }, [address])

  return (
    <div className={styles.container} style={{marginTop:"20px"}}>
      {loading}
      {loading ? <WithdrawSuccess add = {address} amt={amount} 
      load={effectState.withdraw.isLoading}
      resolve = {resolve}
      detailUrl = {detailUrl}
      fail = {effectState.withdraw.error}/> : 
        <div>
         
           <div className={styles.textBox}>
                <div style={{float: "left", margin: "-5px 0px 0px 30px" }}>
                   <Icon type="icon-back" size= {30} color = "black" onClick = {goBack}/>
                </div>
           
              <h3 className={styles.withdraw}>
                  Withdraw
              </h3>
            </div>
          <Form style = {{width: '100%'}} {...formItemLayout}>
            <div style = {{ margin: "0px 25px" }}>
              <FormItem label = "To"  className= {styles.to} hasFeedback required requiredTrigger="onBlur" format={undefined}>
              <div>
                <Input type="text" name = "to" className = {styles.inputWidth} 
                placeholder="address" size="medium"  onChange = {(address) => {
                  checkAddress(address);
                }}/>
              </div>
              {validAddress ? (
                    <p style={{color: "red", fontSize: "12px", fontWeight: "bold", marginTop:"0px"}}>Incorrect Address</p>

                  ) : ""}
              </FormItem>
            </div>
            <div style = {{ margin: "0px 25px"}}>
              <FormItem label = "Amount" style = {{ margin : "100px 0px 0px 20px", 
              fontSize: "32px",
            //  fontFamily: "SourceHanSansSC-regular",
              fontWeight: 800
              }}>
              <span style={{display : "inline", overflow: "hidden"}}>
              <NumberPicker
                size="large"
                className={styles.input}
                disabled={withdrawReadonly}
                defaultValue={0}
                value={Number(amount)}
                min={0.0}
                step={0.001}
                precision={18}
                onChange={(_amount) => { onAmountChange(_amount); }}
              />
              </span>
                <div style={{textAlign: "right", display: "inline"}}>
                {/* <Select value={wallet} onChange={handleChange} style = {{backgroundColor: "black", padding: "6px"}}> 
                  <Option value="ETH">ETH</Option>
                  <Option value="Ropsten">Ropsten</Option>
                </Select> */}
                <Button type="primary"  style={{padding: "7px", height: "38px", borderRadius: "0px 10px 10px 0px"}} className={styles.buttonSelected1} onClick={handleSelectToken}>
                {selected}
                  <Icon type="icon-select" />
                </Button>
                </div>

                <div className= {styles.balance}>
                  <h3 className = {styles.text} >
                    Balance: {wallet1?.assets?.verified?.balances?.ETH ? (Number(ethers.utils.formatEther(wallet1?.assets?.verified?.balances?.ETH))) : 0}
                    <Button size="small" text className={styles.button} onClick={setMaxAmount}>    <span style={{  fontSize : "16px", fontWeight : "bold"}}>MAX</span> 
                    </Button>
                  </h3>
                </div>
              </FormItem>
            </div>
            <Button size="large" className={styles.buttonshow} onClick={withdrawMoney} disabled={Number(amount) <= 0.0 || validAddress}> Withdraw </Button>

            <div className={styles.textBox}>
              <h3 style={{float:"left", marginLeft: "40px"}}> Fee:{ fee ? fee +"ETH": ''}</h3>

              <h3 style={{float:"right", marginRight: "40px"}}>
              {/* <a href="/#" > Choose fee token</a> */}

              </h3>
            </div>
              <div style={{clear: "both"}}></div>

              <p className={styles.comment}>
                {message ? (
                  <span>Fee is not enough. Please use another token</span>

                ) : ""}
              </p>      
        </Form>       
          
      </div>
    } <Dialog
    title="Balances in L2Account"
    height="300px"
    footer={false}
    visible={visible}
    onClose={handleClose}
    className={styles.dialog}
    closeMode={['close', 'esc', 'mask']}
  >
    {/* <Input placeholder="Filter balance in L2" className={styles.search} hasClear onChange={onSearch} /> */}
    {empty ? (
      <div className={styles.empty}>
        <span>No tokens with balance were found!</span>
      </div>
    ) : (
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
    )}
  </Dialog>
    </div>
  );
}

export default WithdrawPage;
