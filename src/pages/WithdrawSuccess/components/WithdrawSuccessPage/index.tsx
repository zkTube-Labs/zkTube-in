import React, { useState } from 'react';
import styles from './index.module.scss';
import Loading from '../../../WalletDeposit/components/Loading';
import Status from '../../../WalletStatus/components/StatusPage';

  let WithdrawSuccessPage = () => {
  const [loading] = useState<boolean>(true);
  const [status] = useState <boolean> (true);

  return (
    <div className={styles.container}>
      {!loading ? (
        <Loading
        title="Withdraw"
        description="Confirm the transaction to transfer"
        icon="icon-loading"
        onView={() => console.log('click')}
      />
    ) : 
    (
      
      <div>
        { status ? (
           <Status
           title = "Withdraw"
           color = "green"
           icon = "icon-success"
           status = "success"
           description = "Your Withdrawal will be processed shortly. Use the transaction link to track the progress"
           onClickButton ={() => console.log('click ok')}
           />
        ) : (
          <Status
          title = "Withdraw"
          color = "red"
          icon = "icon-error"
          status = "fail"
          description = "Your Withdrawal will be processed shortly. Use the transaction link to track the progress"
          onClickButton ={() => console.log('click ok')}
          />
        )}
             
        </div>
    )
    }
    
        
    </div>
  );
}

export default WithdrawSuccessPage;
