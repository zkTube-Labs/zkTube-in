import React from 'react';
import { Dialog, Button } from '@alifd/next';
import store from '@/store';

const url = 'https://metamask.io/';

const MetaDialog = () => {
  const [{ unMetaDialogVisible }, action] = store.useModel('wallet');
  function handleClose() {
    action.setState({ unMetaDialogVisible: false });
  }
  function handleInstall() {
    window.open(url);
  }
  return (
    <Dialog
      title="Authorize your wallet"
      visible={unMetaDialogVisible}
      style={{ width: 620 }}
      height={'400px'}
      footer={
        <Button
          type="secondary"
          style={{
            cursor: 'pointer',
            backgroundColor: 'purple',
            color: 'white',
          }}
          onClick={handleInstall}
        >
          Install Metamask
        </Button>
      }
      onClose={handleClose}
    >
      <p>We found that the browser has not added metamask yet.</p>
      <p>
        Once you have it installed, go ahead and <a href="/#"> refresh the page</a>
      </p>
    </Dialog>
  );
};

export default MetaDialog;
