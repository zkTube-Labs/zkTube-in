import React, {useEffect, useState} from 'react';
import { Box, Button, Dialog} from '@alifd/next';
import Web3 from "web3";
import { ethers } from "ethers";
import * as zktube from "zktubez";

// import store from '@/store';
import './walletcontent.scss';

declare const window: any;


const WalletContent = () => {
    
    // const [{web3}, action] = store.useModel('wallet') ;

    const [web3, setWeb3] = useState(undefined);
    const [account, setAccount] = useState("");
	const [syncWallet, setSyncWallet] = useState(undefined);
	const [syncHTTPProvider, setSyncHTTPProvider] = useState(undefined);

    const [visible, setOpen] = useState(false);
    const [visible2, setOpen1] = useState(false);

    let url = "https://metamask.io/";
 
    let onOpen = () => {
        setOpen(true);
    }
    let onClose =(reason) => {
        console.log(reason)
        setOpen(false);
        
    }

    let onClose2 =(reason) => {
        console.log(reason)
        setOpen1(false);
        
    }
 

    const getWeb3 = () => {
		return new Promise(async (resolve, reject) => {

			if (window.ethereum) {
				const web3 = new Web3(window.ethereum);
                setOpen1(true);
				try {
					await window.ethereum.enable();
					resolve(web3);
				} catch (e) {
					reject(e);
				}
			} else if (window.web3) {
				resolve(window.web3);
			} else {
                setOpen(true);
			}
            
		});
	};

    const zkTubeInitialize = async (web3) => {
		await web3.currentProvider.enable();
		const ethersProvider = new ethers.providers.Web3Provider(web3.currentProvider);
	
		const syncHTTPProvider = await zktube.Provider.newHttpProvider("http://124.156.151.46:3030/jsrpc");
	
		const singer = ethersProvider.getSigner();
		const syncWallet = await zktube.Wallet.fromEthSigner(singer, syncHTTPProvider);
		return ({syncWallet, syncHTTPProvider})
	};

    const signKey = async (syncWallet) => {
		console.log(`User account status: ${await syncWallet.isSigningKeySet()}`);
		if (!(await syncWallet.isSigningKeySet())) {
			console.log("Setting singing key");
			const changePubkey = await syncWallet.setSigningKey({
				feeToken: "ETH",
			});
			// Wait till transaction is committed
			const receipt = await changePubkey.awaitReceipt();
			console.log(receipt)
		}
	};
    
    useEffect(() => {
        
		const init = async () => {
			const web3 = await getWeb3();
            console.log("webbb", web3)
            // const xx = await web3.eth.getAccounts()
            const account = (await web3.eth.getAccounts())[0];
			const {syncWallet, syncHTTPProvider} = await zkTubeInitialize(web3)

			setWeb3(web3);
			setAccount(account);
			setSyncWallet(syncWallet);
			setSyncHTTPProvider(syncHTTPProvider);
			signKey(syncWallet);
			// setWeb3(web3);
			
		};
		init();
	}, []);

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
                            <Button type="secondary" onClick={getWeb3}>Connect to a wallet</Button>
                            {visible ? 
                            (<Dialog 
                                title="Authorize your wallet"
                                visible={visible}
                                
                                footer = {
                                    
                                        <a className="btn btn-secondary"  
                                            href={url}>
                                            <Button target="_blank"
                                            style= {{
                                                cursor: "pointer",
                                                backgroundColor: "purple", color: "white"}}>
                                                Install Metamask
                                            </Button>
                                        </a>
                                
                                }
                                 onCancel={onClose.bind('okClick')}
                                onClose={onClose}
                            >
                            <p>We found that the browser has not added metamask yet.</p>
                            <p>Once you have it installed, go ahead and <a href="/#"> refresh the page</a> </p>

                            </Dialog>): ""
                              }

                            {visible2 ? 
                            (<Dialog 
                                title="Authorize your wallet"
                                visible={visible2}
                                footer = {<Button style ={{cursor: "pointer", backgroundColor: "silver", color:"black"}} 
                                onClick = {onClose2}
                                onCancel = {onClose2}
                                onClose ={onClose2}
                                > 
                                Dismiss
                                </Button>}
    
                            >
                            <p>This dapp requires access to your wallet, Please login and authorize access</p>
                            <p>to your Metamask accounts to continue </p>

                            </Dialog>)
                            : ""}

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