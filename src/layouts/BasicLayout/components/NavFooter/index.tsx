import React from 'react';
import { Message } from '@alifd/next';
import copy from 'copy-text-to-clipboard';

import Icon from '@/components/Icon';

import styles from './index.module.scss';

function NavFooter() {
  const handleCopy = (value: string) => {
    copy(value);
    Message.success('已复制！');
  };

  return (
    <div className={styles.container}>
      <div className={styles.notes}>
        <div className={styles.text}>Terms of use</div>
        <div className={styles.text}>Cookie policy</div>
        <div className={styles.text}>Privacy policy</div>
      </div>
      <div className={styles.icons}>
        <Icon type="icon-discord" size="medium" />
        <Icon type="icon-telegram" size="medium" />
        <Icon type="icon-twitter" size="medium" />
        <Icon type="icon-facebook" size="medium" />
      </div>
      <div className={styles.donation}>
        <div className={styles.text}>
          Donation address
        </div>
        <div className={styles.title}>
          BTC
        </div>
        <div className={styles.text}>
          <span>0xD6649922bAe39aCA4F36CaA5B957969D</span>
          <Icon type="icon-copy" size="small" onClick={() => handleCopy('0xD6649922bAe39aCA4F36CaA5B957969D')} />
        </div>
        <div className={styles.title}>
          ETH
        </div>
        <div className={styles.text}>
          <span>0xD6649922bAe39aCA4F36CaA5B957969D</span>
          <Icon type="icon-copy" size="small" onClick={() => handleCopy('0xD6649922bAe39aCA4F36CaA5B957969D')} />
        </div>
      </div>
    </div>
  );
}

export default NavFooter;
