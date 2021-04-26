import React from 'react';
import { Select, Button } from '@alifd/next';
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
    <header className={styles.header}>
       <a href="#/"> 
        <img src={logo} alt="logo" width="10%" className={styles.logo} style={{padding: "10px"}}/>
       </a> 
      <a href="#/" className={styles.wallet}  style={{color: "white"}}>
        My Wallet
      </a>
      <a href="#/" className={styles.wallet} style={{color: "white"}}>
        zkTube Scan
      </a>
      <input className={styles.menubtn} type="checkbox" id="menubtn" />
      <label className={styles.menuicon} htmlFor="menubtn"><span className={styles.navicon}></span></label>
      <ul className={styles.menu} style={{padding: "20px", marginRight: "100px"}}>
        <li className={styles.shift}>
          <div className={styles.boxselect} style={{marginRight: "20px", width: "170px", height: "40px"}}>
            <Select onChange={onChange} defaultValue="Rinkeby testnet">
              {/* <Option value="ETHMain network">
                <div className={styles.statuspoint} style = {{ display: "inline-block",width: "12px",height: "12px", borderRadius: "25px",
                  backgroundColor: "green",marginRight: "7px",marginBottom: "3px",verticalAlign: "middle"}} />
                ETHMain network
              </Option>
              <Option value="Ropsten test network">
                <div className={styles.statuspoint} style = {{ display: "inline-block",width: "12px",height: "12px", borderRadius: "25px",
                  backgroundColor: "green",marginRight: "7px",marginBottom: "3px",verticalAlign: "middle"}}/>
                Ropsten test network
              </Option> */}
              <Option value="Rinkeby testnet">
                <div className={styles.statuspoint} style = {{ display: "inline-block",width: "12px",height: "12px", borderRadius: "25px",
                  backgroundColor: "green",marginRight: "7px",marginBottom: "3px",verticalAlign: "middle"}} />
                Rinkeby testnet
              </Option>
            </Select>
          </div>
        </li>
        <li> 
          {wallet.account == null ? (
            <div className={styles.boxbtn}>
              <Button type="primary" onClick={onClick} style={{borderRadius: "25px", height: "35px"}}>
                Connect to a wallet
              </Button>
            </div>
          ) : (
            <div className={styles.account}>
              <span className={styles.ethAssets}>{wallet?.ethL1Balance ? (Number(ethers.utils.formatEther(wallet.ethL1Balance))?.toFixed(2)) : 0}ETH</span>
              <span className={styles.ethAddress}>{wallet?.account && (compressAccount(wallet.account)) }</span>
            </div>
          )}
        </li>
      </ul>
    </header>
    // <div className={styles.list}>
    //   <div className={styles.boxselect}>
    //     <Select onChange={onChange} defaultValue="ETHMain network">
    //       <Option value="ETHMain network">
    //         <div className={styles.statuspoint} />
    //         ETHMain network
    //       </Option>
    //       <Option value="Ropsten test network">
    //         <div className={styles.statuspoint} />
    //         Ropsten test network
    //       </Option>
    //     </Select>
    //   </div>
    //   <div className={styles.boxbtn}>
    //     <Button type="primary" onClick={onClick} className = {styles.round}>
    //       Connect to a wallet
    //     </Button>
    //   </div>
    // </div>
  );
};
export default WalletHeader;
