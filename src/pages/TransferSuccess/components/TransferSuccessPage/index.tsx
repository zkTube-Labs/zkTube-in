import React, { useCallback, useState } from 'react';
import styles from './index.module.scss';
import Loading from '../../../WalletDeposit/components/Loading';
import Status from '../../../WalletStatus/components/StatusPage';

  let TransferSuccessPage = () => {
  const [loading] = useState<boolean>(true);
  
  return (
    <div className={styles.container}>
      {!loading ? (
        <Loading
        title="Transfer"
        description="Confirm the transaction to transfer"
        icon="icon-loading"
        onView={() => console.log('click')}
      />
    ) :  
    (
      <div>
       <Status
        title = "Transfer"
        color = "green"
        icon = "icon-success"
        status = "success"
        description = "Your Transfer will be processed shortly. Use the transaction link to track the progress"
        onClickButton ={() => console.log('click ok')}
       />


       
        </div>
       
    )}
        
    </div>
  );
}

export default TransferSuccessPage;
