import React from 'react';
import Icon from '@/components/Icon';

import styles from './index.module.scss';

interface IProps {
  icon: string;
  currency: string;
  amount: number;
  dollar: number;
  onClick?: () => void;
}

const CtyptoItem: React.FC<IProps> = ({ icon, currency, amount, dollar, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.left}>
        <Icon type={icon} />
        <span className={styles.currency}>{currency}</span>
      </div>
      <div className={styles.right}>
        <div className={styles.amount}>{amount}</div>
        <div className={styles.dollar}>${dollar.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default CtyptoItem;
