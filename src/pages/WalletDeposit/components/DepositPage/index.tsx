import React, { useCallback, useState } from 'react';
import { history } from 'ice';
import { Input, Button, Dialog, Paragraph } from '@alifd/next';
import { ethers } from 'ethers';

import Icon from '@/components/Icon';
import CryptoItem from '@/pages/WalletDetail/components/CtyptoItem';
import Loading from '../Loading';

import styles from './index.module.scss';

import store from '@/store';

function WalletDeposit() {
  const [empty] = useState(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState<any>();
  const [loading] = useState<boolean>(false);
  const [wallet1, action] = store.useModel('wallet');
  const [amount, setAmount] = useState('0.0');

  const [depositRadOnly, setReadOnly] = useState<boolean>(true);
  const [lockVisible, setLockVisible] = useState<boolean>(false);
  const [balance, setBalance] = useState('0.0');

  const goBack = useCallback(() => {
    history.goBack();
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const handleSelectToken = useCallback(() => {
    setVisible(true);
  }, []);

  const handleDoDeposit = useCallback(() => {
    const data = `${amount}`;
    action.deposit(data);
    console.log('do deposit', data, 'ETH');
  }, [amount, wallet1]);

  const onSelect = useCallback((crypto: string) => {
    console.log('onSelect', crypto);
    setVisible(false);
    setSelected(crypto);
    try {
      const assets = action.checkStatus();
      assets.then((val) => {
        console.log('onSelect', val);
        updateAssets(val);
        setReadOnly(false);

        const wei = ethers.BigNumber.from(val?.verified?.balances?.ETH);
        setBalance(ethers.utils.formatEther(wei));
      });
    } catch (e) {
      console.log('action.checkStatus', e);
    }
  }, [wallet1]);

  const updateAssets = useCallback((assets) => {

  }, []);

  const onSearch = (value: string) => {
    const _list = list.filter((item: any) => {
      return item.name.indexOf(value) > -1;
    });
    setList(_list);
  };

  const handleUnlock = useCallback(() => {
    console.log('unlock');
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <Loading
          title="Deposit"
          description="Confirm the transaction in order to unlock the token"
          icon="icon-loading"
          onView={() => console.log('click')}
        />
      ) : (
        <div className={styles.card}>
          <div className={styles.header}>
            <Icon type="icon-back" size="xl" onClick={goBack} />
            <div className={styles.title}>Deposit</div>
            <div className={styles.extra} />
          </div>
          <div className={styles.formContainer}>
            <div className={styles.label}>Amount</div>
            <div className={styles.fieldContainer}>
              <Input className={styles.input} readOnly={depositRadOnly} value={amount} onChange={(_amount) => { setAmount(_amount); }} />
              {selected ? (
                <Button type="primary" className={styles.buttonSelected} onClick={handleSelectToken}>
                  {selected}
                  <Icon type="icon-select" />
                </Button>
              ) : (
                <Button className={styles.button} text size="medium" onClick={handleSelectToken}>
                  Select Token
                </Button>
              )}
            </div>
            {selected && (
              <>
                <div className={styles.balance}>
                  <span className={styles.text} >L2 Balance:{balance}</span>
                  <Button size="small" text className={styles.button}>
                    MAX
                  </Button>
                </div>
                <Button size="medium" onClick={handleDoDeposit}>
                  Deposit
                </Button>

                {lockVisible && (
                  <>
                    <div>
                      <p className={styles.note}>
                        You should firstly unlock selected token in order to authorize deposits for USDT
                      </p>
                      <Button className={styles.unlock} onClick={handleUnlock}>
                        <Icon type="icon-unlock" />
                        Unlock
                      </Button>
                      <div className={styles.warning}>MetaMask Tx Signature: User denied transaction signature.</div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <Dialog
        title="Balances in L1Account"
        height="300px"
        footer={false}
        visible={visible}
        onClose={handleClose}
        className={styles.dialog}
        closeMode={['close', 'esc', 'mask']}
      >
        <Input placeholder="Filter bannce in L1" className={styles.search} hasClear onChange={onSearch} />
        {empty ? (
          <div className={styles.empty}>
            <span>No tokens with balance were found!</span>
          </div>
        ) : (
          <div className={styles.list}>
            <CryptoItem icon="icon-eth" currency="ETH" amount={3.4232} dollar={35.0} onClick={() => onSelect('ETH')} />
            <CryptoItem
              icon="icon-usdt"
              currency="USDT"
              amount={3.4232}
              dollar={35.0}
              onClick={() => onSelect('USDT')}
            />
          </div>
        )}
      </Dialog>
    </div>
  );
}

export default WalletDeposit;