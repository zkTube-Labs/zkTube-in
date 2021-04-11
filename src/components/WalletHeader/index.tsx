import React from 'react';
import { Box, Select, Button } from '@alifd/next';
import './walletheader.scss';

const Option = Select.Option;

const WalletHeader = () => {
    function onChange(value) {
        console.log('value',value); 
    }

    return (
        <div className="list">
            <div className="list-item">
                <Box direction="row" justify="flex-end"  className="box">
                    <div className="box-select">
                        <Select onChange={onChange}   defaultValue="ETHMain network">
                            <Option value="ETHMain network"><div className="status-point" />ETHMain network</Option>
                            <Option value="Ropsten test network"><div className="status-point" />Ropsten test network</Option>
                        </Select>
                    </div>
                    <div className="box-btn">
                        <Button type='normal'>Connect to a wallet</Button>
                    </div>
                </Box>
            </div>
        </div>
    );
};
export default WalletHeader;
