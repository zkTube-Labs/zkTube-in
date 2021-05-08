import React, { useCallback, useState, useEffect } from 'react';
import { Dialog, Button, Input, Icon } from '@alifd/next';
import { history } from 'ice';
import store from '@/store';

import styles from './index.module.scss';

declare const window: any;
const ErrorNetworkDialog = () => {
  const [hasMask, setHasMask] = useState(false);
  const [wallet, action] = store.useModel('wallet');

  function onClose() {
    action.setState({ errorNetworkVisible: false });
    history.push('/wallet');
  }

  return (
    <Dialog
      title={<h2>Change network</h2>}
      visible={wallet?.errorNetworkVisible}
      onClose={onClose}
      style={{ width: 650 }}
      height={'350px'}
      footer={
        <div>
          <Button type="normal" onClick={onClose}>
            Dismiss
          </Button>
        </div>
      }
    >
      <div style={{ textAlign: 'center', padding: '0 30px' }}>
        <p style={{ fontSize: '18px' }}>
          Please switch your wallet's network from mainnet to rinkeby network for this DAPP
        </p>
      </div>
    </Dialog>
  );
};

export default ErrorNetworkDialog;
