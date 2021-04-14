import React,{useState,useEffect} from 'react';
import { Dialog,Button } from '@alifd/next';
import FOX from '@/assets/fox.png';
import store from '../../store';

declare const window: any;
const SelectWalletDialog = () => {
  const [hasMask, setHasMask] = useState(false)
  const [mtdialog,mtdialogDispatch] = store.useModel('mtdialog')
  const [swdialog,swdialogDispatch] = store.useModel('swdialog')
  const [unmdialog,unmdialogDispatch] = store.useModel('unmdialog')

  function onClose(){
    swdialogDispatch.setVisible({visible:false}) 
  }

  async function onBtnClick(){
    await swdialogDispatch.setVisible({visible:false}) 
    if(hasMask){
      await mtdialogDispatch.setVisible({visible:true});
    }else{
      await unmdialogDispatch.setVisible({visible:true});
    }
  

  }

  useEffect(()=>{
    if(window.ethereum){
      setHasMask(true)
    }
  },[]) 

  return (
    <Dialog
      title={<h2>Select Wallet</h2>}
      visible={swdialog.visible}   
      onClose={onClose}
      footer={false}
      style={{width:620}}
      height={'400px'}  
    >
      <img src={FOX} style={{width:'30px',height:'30px',marginRight:15,marginTop:20}}/>
      <Button type="primary" text style={{fontSize:15}} onClick={onBtnClick}>Meta Mask</Button>
    </Dialog>
  );
};

export default SelectWalletDialog;
