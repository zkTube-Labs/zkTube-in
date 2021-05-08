import React from 'react';
import { Select, Button , Nav} from '@alifd/next';
import logo from '@/assets/logo.png';
import styles from './index.module.scss';
import store from '@/store';
import { ethers } from 'ethers';
import {Link} from 'ice';
import { Tab } from '@alifd/next';
import Wallet from '../../pages/WalletDetail/components/Wallet';

const { Option } = Select;
const { Item } = Nav;
const header = <Link to="/wallet"> 
                <img src={logo} alt="logo" width="10%" height= "20%" className={styles.logo} style={{padding: "0px", height:"34px", marginLeft: "9px"}}/>
              </Link> 



const WalletHeader = () => {
  const [wallet, action] = store.useModel('wallet');

  function onChange(value) {
    console.log('value', value);
  }

  function onClick() {
    action.setState({ selectWalletDialogVisible: true });
  }

  function compressAccount(account: string) {
    if (account.length > 10) {
      return account.substring(0, 6) + '...' + account.substring(account.length-4, account.length);
    } else {
      return account;
    }
  }

  const footer =  
  <div style={{margin: "10px 20px 10px 0px"}}>
     <div className={styles.boxselect} style={{float: "left", marginRight: "30px"}}>
  <Select onChange={onChange} defaultValue="Rinkeby testnet">
    <Option value="Rinkeby testnet">
      <div className={styles.statuspoint} style = {{ display: "inline-block",width: "12px",height: "12px", borderRadius: "25px",
        backgroundColor: "green",marginRight: "7px",marginBottom: "3px",verticalAlign: "middle"}} />
      Rinkeby testnet
    </Option>
  </Select>
  </div>
  <div style={{float: "left", marginRight: "5px"}}>
    {wallet.account == null ? (
            <div className={styles.boxbtn}>
              <Button type="primary" onClick={onClick} style={{borderRadius: "25px"}}>
                Connect to a wallet
              </Button>
            </div>
          ) : (
            <div className={styles.account}>
              <span className={styles.ethAssets}>{wallet?.ethL1Balance ? (Number(ethers.utils.formatEther(wallet.ethL1Balance))?.toFixed(2)) : 0}ETH</span>
              <span className={styles.ethAddress}>{wallet?.account && (compressAccount(wallet.account)) }</span>
            </div>
          )}
  </div>
  </div>
 
  return (

    <Nav className={styles.header} direction="hoz" type="primary" header={header} footer ={footer} defaultSelectedKeys={['My Wallet']} triggerType="hover">
      <Item key="My Wallet"  className={styles.size} style={{marginLeft: "0px"}}>
        <Link to="/wallet/detail"  style={{marginTop: "-14px"}}> My Wallet</Link> 
         </Item>
      <Item key="ZKTubeScan" className={styles.size}  style={{marginLeft: "5px"}}> 
      <a href="https://rinkeby-browser.zktube.io/" target = "_blank" style={{marginTop: "-14px"}}> ZkTubeScan</a>
      </Item>

    </Nav>


);
};
export default WalletHeader;
