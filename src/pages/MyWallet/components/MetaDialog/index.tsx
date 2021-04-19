import React from 'react';
import { Dialog, Button, Icon, Input } from '@alifd/next';

import store from '@/store';

import styles from './index.module.scss';

const MetaDialog = () => {
  const [{ metaDialogVisible, signErrorMsg }, action] = store.useModel('wallet');

  const onClose = () => {
    action.setState({ metaDialogVisible: false, signErrorMsg: undefined });
  };

  return (
    <Dialog
      title={<h2>Ahthorize your wallet</h2>}
      visible={metaDialogVisible}
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
          This dapp requires access to your wallet, please login and authorize access to your MetaMask accounts to
          continue.
        </p>
      </div>
      {signErrorMsg ? (
        <Input className={styles.error} state="error" value={signErrorMsg} readOnly />
      ) : (
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
          <Icon type="loading" size={'xxxl'} />
        </div>
      )}
    </Dialog>
  );
};

export default MetaDialog;
