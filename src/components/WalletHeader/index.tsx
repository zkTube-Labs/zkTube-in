import React from 'react';
import { Select, Button } from '@alifd/next';
import styles from './index.module.scss';
import store from '@/store';

const Option = Select.Option;

const WalletHeader = () => {
  const [, action] = store.useModel('wallet');

  function onChange(value) {
    console.log('value', value);
  }

  function onClick() {
    action.setState({ selectWalletDialogVisible: true });
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
      <div className={styles.boxbtn}>
        <Button type="primary" onClick={onClick}>
          Connect to a wallet
        </Button>
      </div>
    </div>
  );
};
export default WalletHeader;
