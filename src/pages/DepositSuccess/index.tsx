import React from 'react';

import Header from '@/components/WalletHeader';
import DepositSuccessPage from './components/DepositSuccessPage';

import styles from './index.module.scss';

function DepositSuccess(props) {
  return (
    <>
      <Header />
      <div className={styles.contentStyle}>
        <DepositSuccessPage add ={props.add} amt={props.amt} resolve = {props.resolve} load={props.load} contract={props.contract}/>
      </div>

    </>
  );
}

export default DepositSuccess;
