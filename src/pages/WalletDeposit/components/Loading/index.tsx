import React from 'react';
import { Button } from '@alifd/next';

import Icon from '@/components/Icon';

import styles from './index.module.scss';

interface IProps {
  title: string;
  description: string;
  icon: string;
  onView?: () => void;
}

const Loading: React.FC<IProps> = ({ title, description, icon, onView }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <Button text className={styles.button} onClick={onView}>
        View transaction details
        <Icon size="small" type="icon-up-right" color="#5E45EB" />
      </Button>
      <div className={styles.description}>{description}</div>
      <div className={styles.icon}>
        <Icon type={icon} size="xl" color="#101010" />
      </div>
    </div>
  );
};

export default Loading;
