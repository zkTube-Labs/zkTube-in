import React from 'react';
import { Box, Button } from '@alifd/next';
import './walletcontent.scss';


const WalletContent = () => {
    
    return (
        <div className="list">
            <div className="list-item">
                <Box>
                    <div className="border-box height-30">
                        <div className="head-title">
                            <img className="head-img"/>
                            <span className="head-word">Paytube</span>
                        </div>
                        <div className="mid-title">
                            <img className="mid-img"/>
                            <span className='mid-large'>Decentralized wallet based on layer2</span>
                            <span className="mid-small">The combination of zero knowledge protocol and layer2</span>
                        </div>
                        <div className="foot-btn">
                            <Button type="secondary">Connect to a wallet</Button>
                        </div>
                        <div className="foot-title">
                            <span className='foot-large'>Introduction to zktube</span>
                            <span className='foot-small'>
                                zktube is a layer 2 protocol which uses zero knowledge proof and rollup of ZK rollup 
                            </span>
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    );
};
export default WalletContent;