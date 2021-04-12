import React from 'react';
import Icon from '@/components/Icon';

import styles from './index.module.scss';

interface IProps {
  icon: string;
  title: string;
  onClick: () => void;
}

const ActionButton: React.FC<IProps> = ({ icon, title, onClick }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <Icon type={icon} />
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default ActionButton;
