import React from 'react';

import styles from './index.module.scss';

interface IProps {
  color: string;
  // currency: string;
  description: string;
  digit: number;
  onClick?: () => void;
}

const UsersDetail: React.FC<IProps> = ({ color, description, digit }) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <span className = {styles.circle} style={{backgroundColor :  `${color}`, margin: "16px -12px 0px 0px"}}/>
      </div>
      <div className={styles.right}>
        <div className={styles.description}>{description}</div>
        <div className={styles.digit}>{digit}</div>
      </div>
    </div>
  );
};

export default UsersDetail;
