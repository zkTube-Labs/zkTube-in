import React, { useCallback } from 'react';
import Item from '../TransactionItem';

import styles from './index.module.scss';

function Transactions() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Transactions</div>
      <div className={styles.list}>
        <Item />
        <Item />
        <Item />
      </div>
    </div>
  );
}

export default Transactions;
