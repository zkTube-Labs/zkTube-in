import React from 'react';
import { Select, Button } from '@alifd/next';
import {Link} from "ice";
import logo from '@/assets/logo.png';
import styles from './index.module.scss';
import store from '@/store';
import { ethers } from 'ethers';


const { Option } = Select;

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

  return (
    <header className={styles.header} style={{}} >
       <Link to="#"> 
        <img src={logo} alt="logo" width="10%" className={styles.logo} style={{padding: "10px"}}/>
       </Link> 
      <a href="https://wallet.zktube.io/"  target="_blank" className={styles.wallet}  style={{color: "white"}}>
        My Wallet
      </a>
      <a href="https://rinkeby-browser.zktube.io/" target="_blank" className={styles.wallet} style={{color: "white"}}>
        zkTube Scan
      </a>
      <input className={styles.menubtn} type="checkbox" id="menubtn" />
      <label className={styles.menuicon} htmlFor="menubtn"><span className={styles.navicon}></span></label>
    </header>
  );
};
export default WalletHeader;
