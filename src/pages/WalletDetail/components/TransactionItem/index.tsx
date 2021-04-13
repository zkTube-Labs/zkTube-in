import React, { useState, useCallback } from 'react';
import { Button, Form, Input } from '@alifd/next';

import { shortAddress } from '@/utils';
import Icon from '@/components/Icon';

import styles from './index.module.scss';

const FormItem = Form.Item;

const Failed = () => <span className={styles.failed}>Failed</span>;
const Success = () => <span className={styles.success}>Success</span>;
const Pending = () => <span className={styles.pending}>Pending</span>;

const StatusMap = {
  failed: <Failed />,
  success: <Success />,
  pending: <Pending />,
};

function TransactionItem() {
  const [expand, setExpand] = useState<boolean>(false);

  const viewDetail = useCallback(() => {
    console.log('view detail');
  }, []);

  const toggle = useCallback(() => {
    setExpand((value) => !value);
  }, []);

  const visibleStyle: React.CSSProperties = {
    visibility: expand ? 'visible' : 'hidden',
    maxHeight: expand ? 300 : 0,
    opacity: expand ? 1 : 0,
  };

  const rotateStyle: React.CSSProperties = expand ? { transform: 'rotate(90deg)' } : {};

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.left}>
          <div className={styles.iconContainer}>
            <Icon type="icon-down" size="small" color="#060606" />
          </div>
          <div className={styles.leftDetail}>
            <div className={styles.to}>Deposit to {shortAddress('0xD6649922bAe39aCA4F36CaA5B957969D')}</div>
            <div className={styles.path}>ETHL1 {'->'} ETHL2</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightDetail}>
            <div className={styles.amount}>10.00</div>
            <div className={styles.status}>{StatusMap.failed}</div>
          </div>
          <div className={styles.expand} style={rotateStyle}>
            <Icon type="icon-right" size="xl" onClick={toggle} />
          </div>
        </div>
      </div>
      <div className={styles.expandContainer} style={visibleStyle}>
        <Form {...incomeFormItemLayout} className={styles.form} size="small" isPreview labelTextAlign="left">
          <FormItem label="Miner Fee">
            <Input value="0.03567ETH" />
            <p className={styles.formItemTip}>{'=Gas(231,988)*Gas Price(231,988GWEI)'}</p>
          </FormItem>
          <FormItem label="From">
            <Input value="0xD6649922bAe39aC532fA9b5A4F36CaA5B957969D" />
          </FormItem>
          <FormItem label="To">
            <Input value="0xD6649922bAe39aC532fA9b5A4F36CaA5B957969D" />
          </FormItem>
          <FormItem label="Transaction Hash">
            <Input value="0xD6649922bAe39aC532fA9b5A4F36CaA5B957969D" />
          </FormItem>
          <FormItem label="time">
            <Input value="03/10/2020 15:27:07" />
          </FormItem>
        </Form>
        <Button text className={styles.button} onClick={viewDetail}>
          View transaction details
          <Icon size="small" type="icon-up-right" color="#5E45EB" />
        </Button>
      </div>
    </div>
  );
}

const incomeFormItemLayout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

export default TransactionItem;
