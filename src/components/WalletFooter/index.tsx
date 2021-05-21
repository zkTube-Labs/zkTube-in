import React from 'react';
import { Box, Button, Icon, Input } from '@alifd/next';

import ZKTUBE from '@/assets/zktube.png';
import DISCORD from '@/assets/discord.png';
import TELEGRAM from '@/assets/telegram.png';
import TWITTER from '@/assets/twwiter.png';
import FACEBOOK from '@/assets/facebook.png';
import MEDIUM from '@/assets/medium.png';
import BACK from '@/assets/backgroundImage.png';


import store from '@/store';

import styles from './index.module.scss';

const WalletFooter = () => {
  const [, action] = store.useModel('wallet');
  
  const telegram = "https://t.me/zkTubeProtocol";
  const discord = "https://discord.gg/ZhcSuxhX4S";
  const twitter = "https://twitter.com/zktubeofficial";
  const medium = "https://zktube.medium.com";
  const facebook = "https://www.facebook.com/zkTube.official/";


  const handleConnectClick = () => {
    action.setState({ selectWalletDialogVisible: true });
  };

  const checkFAQ =() => {
    console.log("faq")
  };

  return (
    // <div className={styles.list} style={{backgroundImage: "url(" + backImage + ")" }}>
    <div className={styles.list} style={{backgroundColor: "#14132D"}}>

      <div className={styles.listitem}>
        <Box>
          <div className={styles.borderbox}>
               
            <div className={styles.another}>
              <img src={ZKTUBE} style={{width : '100%', height: "100%"}}/>
                         
                            
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
                    <a href={discord} target="_blank">
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
                    </a>
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
export default WalletFooter;
