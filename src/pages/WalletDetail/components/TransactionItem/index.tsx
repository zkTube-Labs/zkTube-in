import React, { useState, useCallback } from 'react';
import store from '@/store';
import { Button, Form, Input } from '@alifd/next';
import { useMount } from 'ahooks';
import { shortAddress } from '@/utils';
import Icon from '@/components/Icon';
import { ethers } from 'ethers';
import moment from 'moment';

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

function TransactionItem(props) {
  const [expand, setExpand] = useState<boolean>(false);
  const [wallet, action] = store.useModel('wallet');

  const [amount, setAmount] = useState<string>('');
  const [toAddress, setToAddress] = useState<string>('');
  const [direction, setDirection] = useState<string>('');
  const [stSuccess, setSuccess] = useState<boolean>(false);
  const [createTime, setCreateTime] = useState<string>('');

  useMount(() => {
    switch (props?.data?.tx?.priority_op?.token) {
      case 'ETH':
        if (props?.data?.tx?.priority_op?.amount) {
          const wei = ethers.BigNumber.from(props.data.tx.priority_op.amount);
          const formatedBalance = ethers.utils.formatEther(wei);
          // const dollar = ePrice > 0 ? formatedBalance * ePrice : 0,
          setAmount(formatedBalance + 'ETH');
        }
        // wallet.ethPrice *
        break;
      default:
        break;
    }

    switch (props?.data?.tx?.type) {
      case 'Deposit':
        setDirection('ETHL1 -> ETHL2');
        break;
      case 'Withdraw':
        setDirection('ETHL2 -> ETHL1');
        break;
      case 'Transfer':
        setDirection('ETHL2 -> ETHL2');
        break;
      default:
        break;
    }

    if (props?.data?.success) {
      setSuccess(true);
    } else {
      setSuccess(false);
      console.log('stat failed', props.data, moment.locale());
    }

    if (props?.data?.tx?.priority_op?.to) {
      const add = shortAddress(props?.data?.tx?.priority_op?.to);
      setToAddress(add);
    }

    if (props?.data?.created_at) {
      // UTC => "03/10/2020 15:27:07"
      const ftime = moment(props.data.created_at).format('MM/DD/YYYY hh:mm:ss');
      setCreateTime(ftime);
      // wallet.syncHTTPProvider.getTransactionFee()
    }
  }, [wallet]);

  const viewDetail = useCallback(() => {
    console.log('view detail');
  }, []);

  const toggle = useCallback(() => {
    // const promTx = wallet?.syncWallet?.getTransfer();

    // promTx.then((val) => {
    //   console.log(val);
    // });
    setExpand((value) => !value);
  }, []);

  const getDetailUrl = useCallback(() => {
    if (props?.data?.hash) {
      // const url = http://192.168.30.110:7000/transactions/0x09ccc365dc1b3b7cee44f819fa68ffcd93999d51964a92633a1e2b9f0ede9d16;
      const url = wallet.l2BlockUrl + '/transactions/' + props?.data?.hash;
      return url;
    }
    return '/wallet/detail';
  }, [wallet]);

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
            <div className={styles.to}>{props?.data?.tx?.type} to {toAddress}</div>
            <div className={styles.path}>{direction}</div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.rightDetail}>
            <div className={styles.amount}>{amount}</div>
            <div className={styles.status}>{stSuccess ? StatusMap.success : StatusMap.failed}</div>
          </div>
          <div className={styles.expand} style={rotateStyle}>
            <Icon type="icon-right" size="xl" onClick={toggle} />
          </div>
        </div>
      </div>
      <div className={styles.expandContainer} style={visibleStyle}>
        <Form {...incomeFormItemLayout} className={styles.form} size="small" isPreview labelTextAlign="left">
          { !stSuccess &&
            <FormItem label="Message">
              <Input value={props?.data?.fail_reason} />
            </FormItem>
          }
          {/* <FormItem label="Miner Fee">
            <Input value="0.03567ETH" />
            <p className={styles.formItemTip}>{'=Gas(231,988)*Gas Price(231,988GWEI)'}</p>
          </FormItem> */}
          <FormItem label="From">
            <Input value={props?.data?.tx?.priority_op?.from || props?.data?.tx?.from} />
          </FormItem>
          <FormItem label="To">
            <Input value={props?.data?.tx?.priority_op?.to || props?.data?.tx?.to} />
          </FormItem>
          <FormItem label="Transaction Hash">
            <Input value={props?.data?.hash} />
          </FormItem>
          <FormItem label="time">
            <Input value={createTime} />
          </FormItem>
        </Form>
        <a href={getDetailUrl()} target="_blank">
          <Button text className={styles.button} >
            View transaction details
            <Icon size="small" type="icon-up-right" color="#5E45EB" />
          </Button>
        </a>
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
