import React from 'react';

import logo from '@/assets/logo.png';

import styles from './index.module.scss';

function NavHeaderComingSoon() {
  return (
    <div className={styles.container}>
      <img alt="logo" width="60%" src={logo} className={styles.img} />
    </div>
  );
}

export default NavHeaderComingSoon;
