import React from 'react';
import { Select, Button } from '@alifd/next';
import styles from './index.module.scss';
import store from '@/store';

const { Option } = Select;

const WalletHeader = () => {
  const [, action] = store.useModel('wallet');

  function onChange(value) {
    console.log('value', value);
  }

  function onBtnClick() {
    action.setState({ selectWalletDialogVisible: true });
  }

  return (
    <div className={styles.list}>
      <div className={styles.boxselect}>
        <Select onChange={onChange} defaultValue="ETHMain network">
          <Option value="ETHMain network">
            <div className={styles.statuspoint} />
            ETHMain network
          </Option>
          <Option value="Ropsten test network">
            <div className={styles.statuspoint} />
            Ropsten test network
          </Option>
        </Select>
      </div>
      <div className={styles.boxbtn}>
        <Button type="primary" onClick={onBtnClick}>
          Connect to a wallet
        </Button>
      </div>
    </div>
  );
};
export default WalletHeader;
