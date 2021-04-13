import React, {useEffect, useState} from 'react';
import { Box, Button, Icon,Dialog } from '@alifd/next';
import LOGO from '@/assets/paytube-black.png';
import BACK1 from '@/assets/backimg1.png';
import BACK2 from '@/assets/backimg2.png';
import SECURITY from '@/assets/security.svg';
import TRANSACTION from '@/assets/transaction.svg';
import TPS from '@/assets/tps.svg';
import Web3 from "web3";
import { ethers } from "ethers";
import * as zktube from "zktubez";
import styles from './index.module.scss';
// import store from '@/store';


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
      <div className={styles.list}>
      <div className={styles.listitem}>
        <Box>
          <div className={styles.borderbox}>
            <div className={styles.headtitle}>
            <img className={styles.headimg} src={LOGO} />
            </div>
            <div className={styles.midtitle}>
              <img className={styles.midimg} src={BACK1}/>
              <span className={styles.midlarge}>Decentralized wallet based on layer2</span>
              <span className={styles.midsmall}>The combination of zero knowledge protocol and layer2</span>
            </div>
            <div className={styles.footbtn}>
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
                        <div className={styles.foottitle}>
              <span className={styles.footlarge}>Introduction to zktube</span>
              <span className={styles.footsmall}>
                zktube is a layer 2 protocol which uses zero knowledge proof and rollup of ZK rollup
              </span>
              <span className={styles.footsmall}>
                to realize low transaction fee and high throughput transaction between ETH and erc20.
              </span>
            </div>
            <div className={styles.introlist}>
              <div className={styles.introcont}>
                <div className={styles.introitem}>
                  <div className={styles.itemimg}>
                    <img src={SECURITY} style={{width:'70%',height:'80%',paddingTop:'10%'}}/>
                  </div>
                  <div className={styles.itemfirst}>Security</div>
                  <div className={styles.itemsec}>
                    The rollup contract keeps track of its entire history of state roots and the hash of each batch. if
                    anyone discovers that one batch had an incorrect post-state root, they can publish a proof to chain,
                    proving that the batch was computed incorrectly. The contract verifies the proof, and reverts that
                    batch and all batches after it.
                  </div>
                </div>
                <div className={styles.introitem}>
                  <div className={styles.itemimg}>
                    <img src={TRANSACTION} style={{width:'100%',height:'100%'}}/>
                  </div>
                  <div className={styles.itemfirst}>Transaction fee</div>
                  <div className={styles.itemsec}>
                    <span style={{fontWeight:'bold'}}>Gasprice:</span>
                    we can allow users to pay with a fixed range of gaspricesor or even move gaspayment
                    outside the rollup protocol entirely and have transactors pay batch creators for 
                    inclusion through a channel. <br/> 
                    <span style={{fontWeight:'bold'}}>Gas:</span>
                    we could similarly restrict the total gas to a choice of consecutive powers of two.
                    Alternatively, we could just have a gas limit only at the batch level.
                  </div>
                </div>
                <div className={styles.introitem}>
                  <div className={styles.itemimg}>
                    <img src={TPS} style={{width:'100%',height:'100%'}}/>
                  </div>
                  <div className={styles.itemfirst}>TPS2000+</div>
                  <div className={styles.itemsec}>
                    Zktube uses the principle of slicing technology to make the transaction flow between
                    L2 faster and meet more financial application in the field of defi,eg.swap transaction
                    and other game applications 
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bigfoot}>Our philosophy</div>
            <div className={styles.litfoot}>
              We want to use zkcube technology to provide decentralized payment<br/> services for more global entity
              services,so that people all over the <br/> world can enjoy convenient,safe and fast services.
            </div>
            <div className={styles.footimg}>
              <img className={styles.img} src={BACK2}/>
            </div>
            <div className={styles.pagefoot}>
              <span className={styles.pagefsm}>Join the technology community</span>
              <span className={styles.pagefla}>
                <Icon type="email" />
                Zktube technology@Pytube.io
              </span>
            </div>
          </div>
                </Box>
            </div>
        </div>
    );
};
export default WalletContent;
