import React, { useState } from 'react';
import styles from './index.module.scss';
import Loading from '../../../WalletDeposit/components/Loading';
import Status from '../../../WalletStatus/components/StatusPage';

  let WithdrawSuccessPage = (props) => {
  const [loading] = useState<boolean>(true);
  const [status] = useState <boolean> (true);

  return (
    <div>
      {loading && props.load? (
        <Loading
        title="Withdraw"
        description="Confirm the transaction to transfer"
        icon="icon-loading"
        onView={() => console.log('click')}
      />
    ) : 
    (
      
      <div className={styles.container}>
        { !props.fail ? (
           <Status
           add = {props.add}
           amt ={props.amt}
           title = "Withdraw"
           color = "green"
           icon = "icon-success"
           status = "success"
           description = "Your Withdrawal will be processed shortly. Use the transaction link to track the progress"
           onClickButton ={() => window.location.reload(false)}
           />
        ) : (
          <Status
          title = "Withdraw"
          add = {props.add}
          amt ={props.amt}
          color = "red"
          icon = "icon-error"
          status = "fail"
          description = "Your Withdrawal will be processed shortly. Use the transaction link to track the progress"
          onClickButton ={() => window.location.reload(false)}
          />
        )}
             
        </div>
    )
    }
    
        
    </div>
  );
}

export default WithdrawSuccessPage;
