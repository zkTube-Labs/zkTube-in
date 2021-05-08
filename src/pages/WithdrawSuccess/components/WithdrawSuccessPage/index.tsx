import React, { useCallback, useState } from 'react';
import styles from './index.module.scss';
import { Link } from "ice";
import Loading from '../../../WalletDeposit/components/Loading';
import Status from '../../../WalletStatus/components/StatusPage';

  let WithdrawSuccessPage = (props) => {
  const [loading] = useState<boolean>(true);
  const [status] = useState <boolean> (true);

  const loadWithdrawPage = (() =>{
    return <Link to='wallet/withdraw'/>
  })

  return (
    <div className={styles.container}>
      {props.load || !props.resolve? (
        <Loading
        title="Withdraw"
        description="Confirm the transaction to transfer"
        icon="icon-loading"
        onView={() => console.log('click')}
      />
    ) : 
    (
      <div >
        { !props.fail || props.resolve? (
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
