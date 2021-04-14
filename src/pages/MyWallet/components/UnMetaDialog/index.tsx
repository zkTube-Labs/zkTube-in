import React from 'react';
import { Dialog, Button } from '@alifd/next';
import store from '../../store';

const MetaDialog = () => {
  let url = 'https://metamask.io/';
  const [unmState, unmStateDispatch] = store.useModel('unmdialog');
  function handleClose() {
    unmStateDispatch.setVisible({ visible: false });
  }
  function handleInstall() {
    window.open(url);
  }
  return (
    <Dialog
      title="Authorize your wallet"
      visible={unmState.visible}
      style={{ width: 620 }}
      height={'400px'}
      footer={
        <Button
          type='secondary' 
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
