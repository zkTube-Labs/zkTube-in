import React, { useCallback, useState } from 'react';
import styles from './index.module.scss';
import Loading from '../../../loadTransfer/components/loading'
import Status from '../../../WalletStatus/components/StatusPage';
import WalletDetail from '../../../WalletDetail/index';

  let TransferSuccessPage = (props) => {
  // const [loading, loadPage] = useState<boolean>(true);
  return (
   
    <div className={styles.container}>
      {props.load || !props.resolve ?
      (
        <Loading
        title="Transfer"
        description="Confirm the transaction to transfer"
        icon="icon-loading"
      />
    ) :  
    (
      <div>
        <WalletDetail transaction={"2"}/>
       {/* <Status
        add = {props.add}
        amt ={props.amt}
        title = "Transfer"
        color = "green"
        icon = "icon-success"
        status = "success"
        description = "Your Transfer will be processed shortly. Use the transaction link to track the progress"
        onClickButton ={() => window.location.reload(false)}
       /> */}


       
        </div>
       
    )}
        
    </div>
  );
}

export default TransferSuccessPage;
