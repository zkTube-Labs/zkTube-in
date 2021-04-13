import React from 'react';
import { Dialog,Button,Icon } from '@alifd/next';

interface AuthDialogProps {
    visible:boolean,
    introduct:string 
}

const AuthorizeDialog = ({visible,introduct}:AuthDialogProps) => {
  function onDismiss() {

  }
  function onClose() {

  }
  function onRefresh() {
      console.log('onrefresh');
      
  }
  return (
    <Dialog
      title={<h2>Ahthorize your wallet</h2>}
      visible={visible}  
      onClose={onClose}
      style={{width:650}} 
      height={'350px'}  
      footer={<Button type="normal" onClick={onDismiss}>Dismiss</Button>}
    >
      <div style={{textAlign:'center',padding:'0 30px'}}> 
        {/* <p style={{fontSize:'18px'}}>
            This dapp requires access to your wallet, please login 
            and authorize access to your MetaMask accounts to continue.
        </p> */}
        <p style={{fontSize:'18px'}}>{introduct}</p>
      </div>
      <div style={{textAlign:'center',fontWeight:'bold'}}>
        <Icon type="refresh" size={'xxxl'} onClick={onRefresh}/>
      </div>
    </Dialog>
  );
};

export default AuthorizeDialog;