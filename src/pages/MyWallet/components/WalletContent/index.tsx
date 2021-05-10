import React from 'react';
import { Box, Button, Icon, Input } from '@alifd/next';
import Announcement from '../Announcement';
import LOGO from '@/assets/newlogo.png';
import BUTTON from '@/assets/button.png';
import TESTNET from '@/assets/testnet.png';
import ETH from '@/assets/eth.png';
// import BACK1 from '@/assets/backimg1.png';
// import BACK2 from '@/assets/backimg2.png';
// import backImage from '../../../../../src/assets/fullImage.png';
import SECURITY from '@/assets/security1.png';
import TRANSACTION from '@/assets/transaction.png';
import TPS from '@/assets/tps.png';
import PHILO from '@/assets/philosophy.png';
import ZKTUBE from '@/assets/zktube.png';
import TECHNICAL from '@/assets/technical.png';
// import DISCORD from '@/assets/discord.png';
// import TELEGRAM from '@/assets/telegram.png';
// import TWITTER from '@/assets/twwiter.png';
// import FACEBOOK from '@/assets/facebook.png';
// import MEDIUM from '@/assets/medium.png';
import BACK from '@/assets/backgroundImage.png';



import styles from './index.module.scss';

const WalletContent = () => {
  const announce = "https://zktube.zendesk.com/hc/en-us/sections/360013215451-Announcements";
  const faq = "https://zktube.zendesk.com/hc/en-us/sections/360013215471-FAQ";
  // const telegram = "https://t.me/zkTubeGlobal";
  // const discord = "https://discord.gg/ZhcSuxhX4S";
  // const twitter = "https://twitter.com/zktubeofficial";
  // const medium = "https://zktube.medium.com";
  // const facebook = "https://www.facebook.com/zkTube.official/";
  const wallet = "https://wallet.zktube.io/";

  const checkFAQ =() => {
    console.log("faq")
  };

  return (
    // <div className={styles.list} style={{backgroundImage: "url(" + backImage + ")" }}>
    <div className={styles.list} style={{backgroundColor: "#14132D"}}>

      <div className={styles.listitem}>
        <Box>
          <div className={styles.borderbox}>
            <div className={styles.firstImage}>
            <img src={BACK} style={{ width: '100%', height: '70%' }}/>
              <div className={styles.headimg1}>
              <img  src={LOGO} style={{ width: '60%', height: '50%' }}/>

              </div>
              <div className={styles.midtitle1}>
                Decentralized wallet based on layer2
              </div>
              <div className={styles.midtitle2}>
                <p style={{marginTop : "15px", fontSize :  "18px"}}>The combination of zero knowledge protocol and layer2</p>
              </div>
              <div className={styles.footbtn1}>
                <a href={wallet + 'wallet/detail?c=1'} target="_blank" style={{backgroundColor : "Transparent", backgroundRepeat: "no-repeat",
                  border: "none", cursor: "pointer", overflow: "hidden", outline: "none"}}>
                  <img src={BUTTON} style={{borderRadius : "25px", backgroundColor: "#298dff"}} />
                  <div className={styles.center}>Connect to a wallet</div>
                </a>
              </div>
            </div>
            {/* <div className={styles.footbtn} style={{cursor: "pointer"}}>
              <input type="image" src={BUTTON} onClick={handleConnectClick}/>
              <button onClick={handleConnectClick} style={{borderRadius : "25px", backgroundColor: "#298dff"}}>
                <img src={BUTTON} />
                <div className={styles.center}>Connect to a wallet</div>
              </button>
            
              </div> */}
            <div className={styles.foottitle}>
              <span className={styles.footlarge}>
                <span style={{color:"blueviolet"}}>Introduction to </span>zktube</span>
              <span className={styles.footsmall}>
                zktube is a layer 2 protocol which uses zero knowledge proof and rollup of ZK rollup to realize low transaction fee and high
              </span>
              <span className={styles.footsmall}>
                 throughput transaction between ETH and erc20.
              </span>
            </div>
            <div className={styles.introlist}>
              <div className={styles.introcont}>
                <div className={styles.introitem}>
                  <div className={styles.itemimg}>
                    <img src={SECURITY} style={{ width: '30%', height: '80%', paddingTop: '10%' }} />
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
                    <img src={TRANSACTION} style={{ width: '30%', height: '80%' , paddingTop: '10%'}} />
                  </div>
                  <div className={styles.itemfirst}>Transaction fee</div>
                  <div className={styles.itemsec}>
                    <span style={{ fontWeight: 'bold', color:"blueviolet" }}>Gasprice: </span>
                    we can allow users to pay with a fixed range of gaspricesor or even move gaspayment outside the
                    rollup protocol entirely and have transactors pay batch creators for inclusion through a channel.{' '}
                    <br /><br/>
                    <span style={{ fontWeight: 'bold', color:"blueviolet" }}>Gas: </span>
                    we could similarly restrict the total gas to a choice of consecutive powers of two. Alternatively,
                    we could just have a gas limit only at the batch level.
                  </div>
                </div>
                <div className={styles.introitem}>
                  <div className={styles.itemimg}>
                    <img src={TPS} style={{ width: '30', height: '80%', paddingTop: '10%' }} />
                  </div>
                  <div className={styles.itemfirst}>TPS3000+</div>
                  <div className={styles.itemsec}>
                    Zktube uses the principle of slicing technology to make the transaction flow between L2 faster and
                    meet more financial application in the field of defi,eg.swap transaction and other game applications
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.imgphil}>
                <img src={PHILO} style={{ width: '100%', height: '70%', paddingTop: '10%' }}/>
                <div className={styles.ourphil}>
                  <div style={{fontSize: "22PX", fontWeight:"bold", marginBottom:"20px"}}>
                    <span style={{color:"blueviolet"}}>Our </span>philosophy
                  </div>

                  <div style={{color: "rgba(243, 229, 229, 0.719)"}}>
                    We want to use zkcube technology to provide decentralized <br/> payment
                    services for more <span style={{color:"blueviolet"}}>global entity services,</span> so that <br/>
                    people all over the world can enjoy
                    convenient, safe and fast services.
                  </div>
                  <div style={{fontSize: "22px", fontWeight:"bold", marginTop:"60px", marginBottom:"5px"}}>
                    Join the technology community
                  </div>
                  <div style={{color: "rgba(243, 229, 229, 0.719)"}}>
                    <Icon type="email" />
                    &nbsp; work@zktube.io
                  </div>
              
                </div>
            </div>
            <div className={styles.announce}>
              Announcement
              <a href={announce} target="_blank">
              <Button className={styles.button}> More &gt;</Button>
              </a>
            </div>
            {/* <div className={styles.testnet}>
              <img src={TESTNET} style={{ width: '100%', height: '100%', paddingTop: '5%' }}/>
              <div className={styles.ourphil}>
                
                <div style={{fontSize: "22PX", fontWeight:"bold", marginBottom:"5px", marginTop: "15px"}}>
                  zktube testnet has been online notifications...
                </div>
                <div style={{color: "rgba(243, 229, 229, 0.719)"}}>
                  The combination of zero knowledge protocol and layer2</div>
              </div>
              <div className={styles.arrow}>
                <div style={{fontSize: "20px", fontWeight:"bold"}}>&gt;</div>
              </div>
            </div> */}
            <Announcement />

            <div className={styles.faq}>
              <a href={faq} target="_blank">
              <input type="image" src={BUTTON} onClick={checkFAQ} style={{width: "110px", height: "55px", borderRadius: "25px"}}/>
                <div className={styles.center}>FAQ</div>
              </a>
              
            
            </div>

            <div className={styles.another}>
              <img src={ZKTUBE} style={{width : '100%', height: "100%"}}/>
              <div className={styles.eth}>
                <img src={ETH} style={{width:"50%", height: "100%"}}/>
              </div>

              <div className={styles.zktube}>
                <div style={{fontSize: "15px", fontWeight:"bold"}}>
                  zkTube is recommended by the Ethereum Foundation for public donation
                </div>
                <div style={{fontSize: "13px", marginTop:"5px", color: "rgba(243, 229, 229, 0.719)"}}>
                  <a href="https://opengrants.com/grant/0X9eda313cf60f1d004e493fcc123d64c21ef7e6a7" target="_blank"  style ={{color: "rgba(243, 229, 229, 0.719)"}}>
                  https://opengrants.com/grant/0X9eda313cf60f1d004e493fcc123d64c21ef7e6a7
                  </a>
                </div>
              </div>
              <div className={styles.tech}>
                <img src={TECHNICAL} style={{width : '50%', height: "55%"}}/>
              </div>

              <div className={styles.team}>
                <div style={{fontSize: "14px", fontWeight:"bold"}}>
                  zkTube technical team received Uniswap V3 Hackathon Granted
                </div>
                <div style={{fontSize: "12px", marginTop:"5px", color: "rgba(243, 229, 229, 0.719)"}}>
                  <a href=" https://gitcoin.co/hackathon/projects/gr9/zktube/" target="_blank" style ={{color: "rgba(243, 229, 229, 0.719)"}} >
                      https://gitcoin.co/hackathon/projects/gr9/zktube/

                  </a>
                </div>
              </div>
              <div className={styles.footer}>
            <hr style={{borderColor:"#5858586e", width: "100%", margin: "auto"}}/>

              <table style={{width: "100%", marginTop: "20px"}}>
                <tbody>
                <tr>
                  <td style={{color: "rgba(243, 229, 229, 0.719)", fontSize: "10px", float:"left"}}>
                    <span> Terms of use &nbsp;|</span>
                    <span> &nbsp;Cookie policy &nbsp;|</span>
                    <span>&nbsp; Privacy policy </span>

                  </td>
                  <td style={{color: "rgba(243, 229, 229, 0.719)",  fontSize: "10px", float:"right"}}>
                   
                   <span>
                    Feedback: work@zktube.io
                   </span>
                   <span style={{marginLeft: "20px"}}>
                    Cooperation: support@zktube.io
                   </span>
                   
                    {/* <a href={discord} target="_blank">
                      <img src={DISCORD} style={{height: "5%"}}/>
                    </a>
                    <a href={telegram} target="_blank">
                      <img src={TELEGRAM} style={{height: "5%", marginLeft: "15px"}}/>
                    </a> 
                    <a href={twitter} target="_blank">
                      <img src={TWITTER} style={{height: "5%", marginLeft: "15px"}}/>
                    </a>
                    <a href= {facebook} target="_blank">
                      <img src={FACEBOOK} style={{height: "5%", marginLeft: "15px"}}/>
                    </a>
                    <a href= {medium} target="_blank">
                      <img src={MEDIUM} style={{height: "5%", marginLeft: "15px"}}/>
                    </a> */}
                  </td>

                </tr>
                </tbody>
               
              </table>
            </div>
          </div>
            </div>
           
        </Box>
      </div>
    </div>
  );
};
export default WalletContent;
