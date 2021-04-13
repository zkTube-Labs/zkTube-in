import React from 'react';
import { Box, Select, Button } from '@alifd/next';
import styles from  './index.module.scss';

const Option = Select.Option;

const WalletHeader = () => {
    function onChange(value) {
        console.log('value',value); 
    }

    return (
        <div className={styles.list}>
            <div className={styles.listitem}>
                <Box direction="row" justify="flex-end"  className={styles.box}>
                    <div className={styles.boxselect}>
                        <Select onChange={onChange}   defaultValue="ETHMain network">
                            <Option value="ETHMain network"><div className={styles.statuspoint}/>ETHMain network</Option>
                            <Option value="Ropsten test network"><div className={styles.statuspoint} />Ropsten test network</Option>
                        </Select>
                    </div>
                    <div className={styles.boxbtn}>
                        <Button type='primary'>Connect to a wallet</Button>
                    </div>
                </Box>
            </div>
        </div>
    );
};
export default WalletHeader;
