import React, { useCallback, useState } from 'react';
import { history } from 'ice';
import store from '@/store';
import styles from './index.module.scss';
import Loading from '../../../WalletDeposit/components/Loading';
import Status from '../../../WalletStatus/components/StatusPage';
import Icon from '@/components/Icon';

let DepositSuccessPage = (props) => {
  const [loading] = useState<boolean>(true);
  const [status] = useState <boolean> (true);
  const [wallet, action] = store.useModel('wallet');
  const [retrieveReceipt, setRetriveReceipt] = useState<boolean>(true);

  // <DepositSuccessPage add ={props.add} amt={props.amt} resolve = {props.resolve} load={props.load} contract={props.contract}/>

  const goBack = useCallback(() => {
    history.goBack();
  }, []);

  const onQueryDeposit = useCallback(() => {
    if (wallet?.depositContract?.ethTx?.hash) {
      console.log('view deposit', wallet.depositContract.ethTx.hash);
    }
    if (wallet?.web3) {
      const receipt = wallet.web3.eth.getTransactionReceipt(wallet.depositContract.ethTx.hash);
      receipt.then((contract) => {
        console.log('getTransactionReceipt', contract);
      });
    }
  }, [wallet]);

  const queryReceipt = useCallback(() => {
    if (retrieveReceipt && wallet?.depositContract) {
      setRetriveReceipt(false);
      const receipt = wallet.depositContract.awaitReceipt();
      receipt.then((_receipt) => {
        console.log('deposit, receipt', _receipt);
      });

      // // Await verification
      // // Completes when the tx reaches finality on Ethereum
      const verify = wallet.depositContract.awaitVerifyReceipt();
      verify.then((_verify) => {
        console.log('deposit, verify', _verify);
      });

    }
    // if (wallet?.web3 && wallet?.depositContract?.ethTx?.hash) {
    //   const receipt = wallet.web3.eth.getTransactionReceipt(wallet.depositContract.ethTx.hash);
    //   receipt.then((contract) => {
    //     console.log('getTransactionReceipt', contract);
    //   });
    // }
  }, [wallet]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Icon type="icon-back" size="xl" onClick={goBack} />
        </div>
        <div>
          {retrieveReceipt && (queryReceipt())}
        </div>
      {props.load || !props.resolve? (
        <Loading
          title="Deposit"
          description="Confirm the transaction to Deposit"
          icon="icon-loading"
          onView={onQueryDeposit}
        />
    ) : 
    (
      <div >
        { !props.fail || props.resolve? (
           <Status
           add = {props.add}
           amt ={props.amt}
           title = "Deposit"
           color = "green"
           icon = "icon-success"
           status = "success"
           description = "Your Deposit will be processed shortly. Use the transaction link to track the progress"
           onClickButton ={() => window.location.reload(false)}
           />
        ) : (
          <Status
          title = "Deposit"
          add = {props.add}
          amt ={props.amt}
          color = "red"
          icon = "icon-error"
          status = "fail"
          description = "Your Deposit will be processed shortly. Use the transaction link to track the progress"
          onClickButton ={() => window.location.reload(false)}
          />
        )}
        </div>
    )
    }
    </div>
    </div>
  );
}

export default DepositSuccessPage;
