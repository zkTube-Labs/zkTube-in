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
    if (wallet?.depositContract?.txHash) {
      console.log('view deposit', wallet.depositContract.txHash);
    } else if (wallet?.depositContract?.ethTx?.hash) {
      console.log('view deposit', wallet.depositContract.ethTx.hash);
    }
    // if (wallet?.web3) {
    //   const receipt = wallet.web3.eth.getTransactionReceipt(wallet.depositContract.ethTx.hash);
    //   receipt.then((contract) => {
    //     console.log('getTransactionReceipt', contract);
    //   });
    // }
  }, [wallet]);

  const getDetailUrl = useCallback(() => {
    if (wallet?.depositContract?.blockNumber) {
      // const url = 'https://rinkeby-browser.zktube.io/blocks/' + wallet.depositContract.blockNumber.toString();
      const url = wallet.l1TxUrl + wallet.depositContract.txHash;
      return url;
    }
    return '/wallet/detail';
  }, [wallet]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div >
          {wallet?.depositContract?.status ? (
            <Status
            add = {wallet?.depositContract?.to}
            amt = {wallet?.depositContract?.fee}
            title = "Deposit"
            color = "green"
            icon = "icon-success"
            status = "success"
            description = "Your Deposit will be processed shortly. Use the transaction link to track the progress"
            detailUrl = {getDetailUrl()}
            onClickButton ={() => window.open(getDetailUrl(),'target', '')}
            />
          ) : (
            <Status
            title = "Deposit"
            add = {wallet?.depositContract?.to}
            amt = {wallet?.depositContract?.fee}
            color = "red"
            icon = "icon-error"
            status = "fail"
            description = "Your Deposit will be processed shortly. Use the transaction link to track the progress"
            onClickButton ={() => window.open(getDetailUrl(),'target', '_blank')}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DepositSuccessPage;
