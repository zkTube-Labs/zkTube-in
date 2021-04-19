import React, { useCallback, useState } from 'react';
import styles from './index.module.scss';
import Loading from '../../../WalletDeposit/components/Loading';
import Status from '../../../WalletStatus/components/StatusPage';

  let TransferSuccessPage = (props) => {
  const [loading, loadPage] = useState<boolean>(true);
  
  let goToTransferPage = () => {
   loadPage(false);
  }
  return (
   
    <div className={styles.container}>
      {loading && props.load ?
      (
        <Loading
        title="Transfer"
        description="Confirm the transaction to transfer"
        icon="icon-loading"
        onView={() => goToTransferPage}
      />
    ) :  
    (
      <div>
       <Status
        add = {props.add}
        amt ={props.amt}
        title = "Transfer"
        color = "green"
        icon = "icon-success"
        status = "success"
        description = "Your Transfer will be processed shortly. Use the transaction link to track the progress"
        onClickButton ={() => window.location.reload(false)}
       />


       
        </div>
       
    )}
        
    </div>
  );
}

export default TransferSuccessPage;
