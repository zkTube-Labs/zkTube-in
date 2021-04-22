import React from 'react';

import Header from '@/components/WalletHeader';
import WithdrawSuccessPage from './components/WithdrawSuccessPage';

import styles from './index.module.scss';

function WithdrawSuccess(props) {
  return (
    <>
      <Header />
      <div className={styles.contentStyle}>
        <WithdrawSuccessPage add ={props.add} amt={props.amt} resolve = {props.resolve} load={props.load}/>
      </div>

    </>
  );
}

export default WithdrawSuccess;
