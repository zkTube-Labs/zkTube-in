import React from 'react';
import { Dialog, Button } from '@alifd/next';
import Icon from '@/components/Icon';

import store from '@/store';

// const url = 'https://metamask.io/';
const url = 'https://metamask.app.link/dapp/wallet.zktube.io';

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
      style={{ width: 500}}
      height={'200px'}
      footer={
        <div>
          <span style={{marginRight: "10px"}}>
            <Icon type="icon-metamask" size="xl" />
          </span>
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
        </div>
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
