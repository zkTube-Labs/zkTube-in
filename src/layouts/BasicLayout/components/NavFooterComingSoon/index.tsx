import React from 'react';
import Icon from '@/components/Icon';

import styles from './index.module.scss';

function NavFooterComingSoon() {

  return (
    <div className={styles.container}>
     
      <div className={styles.icons}>
        <Icon type="icon-discord" size="medium" />
        <Icon type="icon-telegram" size="medium" />
        <Icon type="icon-twitter" size="medium" />
        <Icon type="icon-facebook" size="medium" />
      </div>
      <div className={styles.service}>
        Service: work@zktube.io
      </div>
    </div>
  );
}

export default NavFooterComingSoon;
