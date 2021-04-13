import React from 'react';
import { Dialog,Button } from '@alifd/next';
import FOX from '@/assets/fox.png';

const SelectWalletDialog = () => {
  function onClose(){

  }

  return (
    <Dialog
      title={<h2>Select Wallet</h2>}
      visible={false} 
      onClose={onClose}
      footer={false}
      style={{width:620}}
      height={'400px'}  
    >
      <img src={FOX} style={{width:'30px',height:'30px',marginRight:15,marginTop:20}}/>
      <Button type="primary" text style={{fontSize:15}}>Meta Mask</Button>
    </Dialog>
  );
};

export default SelectWalletDialog;
