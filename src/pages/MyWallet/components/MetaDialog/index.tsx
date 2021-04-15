import React from 'react';
import { Dialog, Button, Icon } from '@alifd/next';
import store from '@/store';

const MetaDialog = () => {
  const [{ metaDialogVisible }, action] = store.useModel('wallet');
  function onDismiss() {
    action.setState({ visible: false });
  }
  function onClose() {
    action.setState({ metaDialogVisible: false });
  }
  function onRefresh() {
    console.log('onrefresh');
  }
  return (
    <Dialog
      title={<h2>Ahthorize your wallet</h2>}
      visible={metaDialogVisible}
      onClose={onClose}
      style={{ width: 650 }}
      height={'350px'}
      footer={
        <div>
          <Button type="normal" onClick={onDismiss}>
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
      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
        <Icon type="loading" size={'xxxl'} onClick={onRefresh} />
      </div>
    </Dialog>
  );
};

export default MetaDialog;
