import React, { useState, useCallback } from 'react';
import store from '@/store';
import { useMount } from 'ahooks';
import Item from '../TransactionItem';

import styles from './index.module.scss';

function Transactions() {
  const [wallet, action] = store.useModel('wallet');
  const [items, setItems] = useState([]);

  useMount(() => {
    getHistory();
  });

  const getHistory = useCallback(() => {
    // const queryUrl = 'http://t0tz.ceja.co:3001/api/v0.1/account/0x664d0dedef54c847038fef9716f0c1128bbff1c6/history/0/25';
    // const queryUrl = 'http://t5tz:3001/api/v0.1/account/0x664d0dedef54c847038fef9716f0c1128bbff1c6/history/0/25';
    try {
      const promHistory = action.history();

      promHistory.then((history) => {
        if (history) {
          const rows = [];
          Object.keys(history).forEach((i) => {
            rows.push(<Item key={i} data={history[i]} />);
          });
          setItems(rows);
        }
      });
    } catch (e) {

    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Transactions</div>
      <div className={styles.list}>
        { items }
      </div>
    </div>
  );
}

export default Transactions;
