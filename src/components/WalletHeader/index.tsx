import React from 'react';
import { Select, Button } from '@alifd/next';
import styles from './index.module.scss';
import store from '@/store';
import { ethers } from 'ethers';

const Option = Select.Option;

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
      return account.substring(0, 6) + '...' + account.substring(account.length - 4, account.length);
    } else {
      return account;
    }
  }

  return (
    <div className={styles.list}>
      <div className={styles.boxselect}>
        <Select onChange={onChange} defaultValue="Rinkeby testnet">
          {/* <Option value="ETHMain network">
            <div className={styles.statuspoint} />
            ETHMain network
          </Option>
          <Option value="Ropsten test network">
            <div className={styles.statuspoint} />
            Ropsten test network
          </Option> */}
          <Option value="Rinkeby testnet">
            <div className={styles.statuspoint} style = {{ display: "inline-block",width: "12px",height: "12px", borderRadius: "25px",
              backgroundColor: "green",marginRight: "7px",marginBottom: "3px",verticalAlign: "middle"}} />
            Rinkeby testnet
          </Option>
        </Select>
      </div>
      {wallet.account == null ? (
        <div className={styles.boxbtn}>
          <Button type="primary" onClick={onClick}>
            Connect to a wallet
          </Button>
        </div>
      ) : (
        <div className={styles.account}>
          <span className={styles.ethAssets}>
            {wallet?.ethL1Balance ? (Number(ethers.utils.formatEther(wallet.ethL1Balance))?.toFixed(2)) : 0}ETH
          </span>
          <span className={styles.ethAddress}>{wallet?.account && (compressAccount(wallet.account)) }</span>
        </div>
      )}

    </div>
  );
};
export default WalletHeader;
