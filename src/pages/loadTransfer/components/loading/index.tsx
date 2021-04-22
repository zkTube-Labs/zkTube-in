import React from 'react';

import Icon from '@/components/Icon';

import styles from './index.module.scss';

interface IProps {
  title: string;
  description: string;
  icon: string;
}

const Loading: React.FC<IProps> = ({ title, description, icon }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.icon}>
        <Icon type={icon} size="xl" color="#101010" />
      </div>
    </div>
  );
};

export default Loading;
