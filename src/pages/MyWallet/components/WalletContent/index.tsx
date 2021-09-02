import React, { useState, useEffect } from 'react';
import { Box, Button, Icon, Input, ConfigProvider } from '@alifd/next';
import { history, request } from 'ice';
import { useMount } from 'ahooks';

import Announcement from '../Announcement';
import LOGO from '@/assets/logo.png';
import BUTTON from '@/assets/button.png';
import Expand from '@/assets/Expand_right.png';
import TESTNET from '@/assets/testnet.png';
import ETH from '@/assets/eth.png';
import FAQ from '@/assets/FAQ.png';
import UsersDetail from '../../../WalletDetail/components/UsersDetail/index';
import { ethers } from 'ethers';
// import BACK1 from '@/assets/backimg1.png';
// import BACK2 from '@/assets/backimg2.png';
import backImage from '../../../../../src/assets/fullImage.png';
import SECURITY from '@/assets/security1.png';
import TRANSACTION from '@/assets/transaction.png';
import TPS from '@/assets/tps.png';
import PHILO from '@/assets/philosophy.png';
import ZKTUBE from '@/assets/zktube.png';
import TECHNICAL from '@/assets/technical.png';
import SHIELD from '@/assets/Chield_check.png';
import TRANSFER from '@/assets/Regroup.png';
import TPS1 from '@/assets/Setting_line_light.png';

// import DISCORD from '@/assets/discord.png';
// import TELEGRAM from '@/assets/telegram.png';
// import TWITTER from '@/assets/twwiter.png';
// import FACEBOOK from '@/assets/facebook.png';
// import MEDIUM from '@/assets/medium.png';
import BACK from '@/assets/backgroundImage.png';
import bg from '@/assets/pc-bg.png';

import video from '@/assets/work.mp4';
import ReactPlayer from 'react-player/lazy';
import playIcon from '@/assets/play.png';
import styles from './index.module.scss';
// import { useCallback } from 'react';

import Parse from 'parse/dist/parse.min.js';
import axios from 'axios';

const WalletContent = () => {
  const [playing, setplaying] = useState(false);
  const [isphone, setIsphone] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsplaying] = useState(false);
  const [zktTotal, setZktTotal] = useState<number>(0);
  const [holders, setHolders] = useState<number>(0);
  const [transfers, setTransfers] = useState<number>(0);
  const announce = 'https://zktube.zendesk.com/hc/en-us/sections/360013215451-Announcements';
  const faq = 'https://zktube.zendesk.com/hc/en-us/sections/360013215471-FAQ';
  // const telegram = "https://t.me/zkTubeGlobal";
  // const discord = "https://discord.gg/ZhcSuxhX4S";
  // const twitter = "https://twitter.com/zktubeofficial";
  // const medium = "https://zktube.medium.com";
  // const facebook = "https://www.facebook.com/zkTube.official/";
  const wallet = 'https://wallet.zktube.io/';

  const checkFAQ = () => {
    console.log('faq');
  };

  useMount(() => {
    setIsphone(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent));
  });
  // useMount(async () => {
  //   try {
  //     setLoading(true);
  //     let result = await request(
  //       '/info/vipapi/eth/token/0xc53d46fd66edeb5d6f36e53ba22eee4647e2cdb2?apikey=zVyinKXFGkVib19U8ZJP',
  //     );
  //     setLoading(false);
  //     setTransfers(result.data.transferCnt);
  //     setHolders(result.data.holderCnt);
  //     setZktTotal(result.data.tokenInfo.t);
  //   } catch (error) {
  //     console.log(error);
  //     setLoading(false);
  //   }
  // });

  const goWhitePaper = () => {
    // history.push('/whitepaper')
    // location.href = 'https://file.zktube.io/information/zkTube%20Whitepaper.pdf';
    window.open('https://file.zktube.io/information/zkTube%20Whitepaper.pdf');
  };

  const closePlayer = () => {
    setplaying(!playing);
    setIsplaying(!isPlaying);
  };
  return (
    <div className={styles.list} style={{ background: isphone ? 'rgb(23,19,50)' : '#151333' }}>
      {/* <div className={styles.list} style={{ backgroundColor: '#151333' }}> */}
      <div className={styles.listitem}>
        <Box>
          <div className={styles.borderbox}>
            <div
              className={styles.firstImage}
              style={{ height: isphone ? 'auto' : '830px', background: isphone ? 'none' : '' }}
            >
              {/* <div className={styles.firstImage} style={{ background: isPlaying ? 'black' : 'none' }}> */}
              {/* <button style={{ position: 'absolute', zIndex: '200', left: '800px' }} onClick={onClickPreview}>
                play
              </button> */}

              <div />
              {/* <div style={{ width: '500px', height: '675px' }} /> */}
              {!isphone && (
                <div className={styles.headimg1}>
                  <img src={LOGO} style={{ width: '213px%', height: '68px' }} />
                  {/* <img  src={LOGO} style={{ width: '60%', height: '50%' }}/> */}
                </div>
              )}
              <div className={isphone ? styles.phoneMidTitle : styles.midtitle1}>
                Decentralized wallet
                {isphone && <br />}
                based on layer2
              </div>
              {isphone && (
                <div className={styles.phoneLogo}>
                  <img src={LOGO} />
                </div>
              )}
              <div className={isphone ? styles.phoneMidTitle2 : styles.midtitle2}>
                The combination of zero knowledge protocol and layer2
              </div>
              {isphone && (
                <>
                  <div className={styles.connectBtn} />
                  <div className={styles.downIcon} />
                </>
              )}

              {!isphone && (
                <div className={styles.player}>
                  {!isPlaying && (
                    <div className={styles.player1}>
                      <span
                        onClick={() => {
                          setIsplaying(true);
                          setplaying(true);
                        }}
                        className={styles.playIcon}
                      >
                        <img src={playIcon} alt="play video" />
                      </span>
                    </div>
                  )}

                  {/* <button
                  onClick={() => {
                    setIsplaying(true);
                    setplaying(true);
                  }}
                >
                  play
                </button> */}
                  {/* <div className={styles.playVideo}> */}
                  {isPlaying && (
                    <>
                      <ReactPlayer
                        controls
                        url={video}
                        style={{ margin: '0 auto' }}
                        playing={isPlaying}
                        width="600px"
                        height="380px"
                      />
                      <Icon type="close" onClick={closePlayer} className={styles.closeBtn} />
                    </>
                  )}
                  {/* </div> */}
                </div>
              )}
              {/* <ReactPlayer
                controls={true}
                url={video}
                style={{ margin: '0 auto' }}
                light
                playing={isPlaying}
                width="1054px"
                height="629px"
                onClickPreview={onClickPreview}
              /> */}
              {/* <div className={styles.footbtn1}>
                <a
                  href={wallet + 'wallet/detail?c=1'}
                  target="_blank"
                  style={{
                    backgroundColor: 'Transparent',
                    backgroundRepeat: 'no-repeat',
                    border: 'none',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    outline: 'none',
                  }}
                >
                  <img src={BUTTON} style={{ borderRadius: '25px', backgroundColor: '#298dff' }} />
                  <div className={styles.center}>Connect to a wallet</div>
                </a>

                <div className={styles.whitepaper} onClick={goWhitePaper}>
                  <span className={styles.whitepapertitle}>Whitepaper</span>
                  <img src={Expand} />
                </div>
              </div> */}
              {/* {!isPlaying && (
                <div className={styles.whitepaper} onClick={goWhitePaper}>
                  <span className={styles.whitepapertitle}>Whitepaper</span>
                  <img src={Expand} />
                </div>
              )} */}
            </div>
            {/* <div className={styles.footbtn} style={{cursor: "pointer"}}>
              <input type="image" src={BUTTON} onClick={handleConnectClick}/>
              <button onClick={handleConnectClick} style={{borderRadius : "25px", backgroundColor: "#298dff"}}>
                <img src={BUTTON} />
                <div className={styles.center}>Connect to a wallet</div>
              </button>

              </div> */}
            {/* <div className={styles.combine}>
              {loading ? (
                <div style={{ color: 'white' }}>loading</div>
              ) : (
                <div className={styles.total}>
                  <div className={styles.goLeft}>
                    <UsersDetail color="#EA3D2F" description="ZKTR Total" digit={zktTotal} />
                  </div>
                  <div className={styles.goLeft}>
                    <UsersDetail color="#367BF5" description="Holders" digit={holders} />
                  </div>
                  <div className={styles.goLeft}>
                    <UsersDetail color="#2FA84F" description="Transfers" digit={transfers} />
                  </div>
                  <div className={styles.goLeft}>
                    <UsersDetail color="#F3AA18" description="ZKTR Total" digit={zktTotal} />
                  </div>
                </div>
              )}
            </div> */}

            <div className={isphone ? styles.phoneFootTitle : styles.foottitle}>
              <span className={isphone ? styles.phoneFootLarge : styles.footlarge}>
                <span className={styles.blueviolet}>Introduction to </span>
                {isphone && <br />}
                zkTube
              </span>
              <span className={isphone ? styles.phoneFootSmall : styles.footsmall}>
                zkTube is a layer 2 protocol that uses zero-knowledge
                {/* zkTube is a layer 2 protocol which uses zero */}
                {isphone && <br />}
                &nbsp;proof and rollup of ZK
                {!isphone && <br />}
                rollup to realize
                {isphone && <br />}
                &nbsp;low transaction fees and high
                {isphone && <br />}
                &nbsp;throughput transactions between ETH and erc20.
              </span>
              {/* <span className={styles.footsmall}> */}
              {/* </span> */}
            </div>
            <div className={styles.introlist}>
              <div className={styles.introcont}>
                <div
                  className={styles.introitem}
                  style={{ height: isphone ? '510px' : '458px', width: isphone ? '350px' : '30%' }}
                >
                  {/* <div className={styles.itemimg}>
                    <img src={SECURITY} style={{ width: '30%', height: '80%', paddingTop: '10%' }} />
                  </div> */}
                  <div className={styles.up}>
                    <div className={styles.introitem1}>
                      <img src={SHIELD} className={styles.shield} />
                    </div>
                    <div className={styles.itemfirst1}>Security</div>
                  </div>

                  {/* <div className={styles.itemfirst}>Security</div> */}
                  <div className={styles.itemsec}>
                    The rollup contract keeps track of its entire history of state roots and the hash of each batch. if
                    anyone discovers that one batch had an incorrect post-state root, they can publish a proof to chain,
                    proving that the batch was computed incorrectly. The contract verifies the proof, and reverts that
                    batch and all batches after it.
                  </div>
                </div>
                <div
                  className={styles.introitem}
                  style={{ height: isphone ? '510px' : '458px', width: isphone ? '350px' : '30%' }}
                >
                  {/* <div className={styles.itemimg}>
                    <img src={TRANSACTION} style={{ width: '30%', height: '80%' , paddingTop: '10%'}} />
                  </div>
                  <div className={styles.itemfirst}>Transaction fee</div> */}
                  <div className={styles.up}>
                    <div className={styles.introitem1}>
                      <img src={TRANSFER} className={styles.shield} />
                    </div>
                    <div className={styles.itemfirst1}>Transaction fee</div>
                  </div>
                  <div className={styles.itemsec}>
                    <span style={{ color: '#D5D5D5' }}>Gasprice: </span>
                    we can allow users to pay with a fixed range of gas prices or even move gas payment outside the
                    rollup protocol entirely and have transactors pay batch creators for inclusion through a channel.{' '}
                    <br />
                    <br />
                    <span style={{ color: '#D5D5D5' }}>Gas: </span>
                    we could similarly restrict the total gas to a choice of consecutive powers of two. Alternatively,
                    we could just have a gas limit only at the batch level.
                  </div>
                </div>
                <div
                  className={styles.introitem}
                  style={{ height: isphone ? '510px' : '458px', width: isphone ? '350px' : '30%' }}
                >
                  <div className={styles.up}>
                    <div className={styles.introitem1}>
                      <img src={TPS1} className={styles.shield} />
                    </div>
                    <div className={styles.itemfirst1}>TPS3000+</div>
                  </div>
                  {/* <div className={styles.itemimg}>
                    <img src={TPS} style={{ width: '30', height: '80%', paddingTop: '10%' }} />
                  </div>
                  <div className={styles.itemfirst}>TPS3000+</div> */}
                  <div className={styles.itemsec}>
                    zkTube uses the principle of slicing technology to make the transaction flow between Layer2 faster
                    and meet more financial applications in the field of decentralized finance, dex transactions, and
                    other game applications. zkTube will be a satisfactory solution for application scenarios that have
                    higher requirements in terms of the transaction receipt, timeliness, and high-throughput Dapp.
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.announce}>
              Announcement
              <a href={announce} target="_blank" rel="noreferrer">
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
              <a href={faq} target="_blank" rel="noreferrer">
                {/* <input
                  type="image"
                  src={BUTTON}
                  onClick={checkFAQ}
                  className={styles.inputFaq}
                  style={{ width: '196px', height: '52px', borderRadius: '25px' }}
                />
                <div className={styles.center}>FAQ</div> */}
                <img src={FAQ} alt="faq" />
              </a>
            </div>
            <div className={styles.imgphil}>
              <img src={PHILO} style={{ width: '100%', height: '643px' }} />
              <div className={styles.ourphil}>
                <div style={{ fontSize: '50px', fontWeight: 'bold', marginBottom: '10px' }}>
                  <span style={{ color: 'blueviolet' }}>Our </span>philosophy
                </div>

                <div style={{ color: '#9d9d9d', lineHeight: '20px' }}>
                  We want to use zkTube technology to provide decentralized
                  <br />
                  payment services for more global entity services,so that people
                  <br />
                  all over the world can enjoy convenient, safe and fast services.
                </div>
                <div style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '63px', marginBottom: '11px' }}>
                  Join the technology community
                </div>
                <div style={{ color: '#9d9d9d', fontSize: '20px' }}>
                  <Icon type="email" />
                  &nbsp; work@zktube.io
                </div>
                {/* <div style={{ fontSize: '40px', fontWeight: 'bold', marginTop: '87px', marginBottom: '30px' }}>
                  Join our newsletter
                </div>
                <div className={styles.subContent}>
                  <input type="text" className={styles.input} />
                  <button className={styles.sub1}> subscribe</button> */}
                {/* <span className={styles.sub}>
                  </span> */}
                {/* </div> */}
              </div>
            </div>
            <div className={styles.another}>
              {/* <img src={ZKTUBE} style={{ width: '100%', height: '100%' }} /> */}
              <div className={styles.ethDesc}>
                <div className={styles.eth}>
                  <img src={ETH} style={{ width: '15px', height: '100%' }} />
                </div>

                <div className={styles.zktube}>
                  <div style={{ fontSize: '15px', fontWeight: '600', color: '#fff' }}>
                    zkTube is recommended by the Ethereum Foundation for public donation
                  </div>
                  <div style={{ fontSize: '13px', marginTop: '5px', color: 'rgba(243, 229, 229, 0.719)' }}>
                    <a
                      href="https://opengrants.com/grant/0X9eda313cf60f1d004e493fcc123d64c21ef7e6a7"
                      target="_blank"
                      style={{ color: '#452BE2', textDecoration: 'underline' }}
                      rel="noreferrer"
                    >
                      https://opengrants.com/grant/0X9eda313cf60f1d004e493fcc123d64c21ef7e6a7
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.uniDesc}>
                <div className={styles.tech}>
                  <img src={TECHNICAL} style={{ width: '20px', height: '100%' }} />
                </div>

                <div className={styles.team}>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>
                    zkTube technical team received Uniswap V3 Hackathon Granted
                  </div>
                  <div style={{ fontSize: '12px', marginTop: '5px', color: 'rgba(243, 229, 229, 0.719)' }}>
                    <a
                      href=" https://gitcoin.co/hackathon/projects/gr9/zktube/"
                      target="_blank"
                      style={{ color: '#452BE2', textDecoration: 'underline' }}
                    >
                      https://gitcoin.co/hackathon/projects/gr9/zktube/
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.whitepaper1}>
                {/* <div></div> */}
                <div className={styles.whiteBtn} onClick={goWhitePaper}>
                  <input type="image" src={BUTTON} style={{ width: '196px', height: '52px', borderRadius: '25px' }} />
                  <div className={styles.center1}>Whitepaper</div>
                </div>
              </div>
              <div className={styles.footer}>
                <hr style={{ borderColor: '#5858586e', width: '100%', margin: 'auto' }} />

                <table style={{ width: '100%', marginTop: '20px' }}>
                  <tbody>
                    <tr>
                      <td
                        style={{
                          color: 'rgba(243, 229, 229, 0.719)',
                          fontSize: '10px',
                          float: 'left',
                          cursor: 'pointer',
                        }}
                      >
                        {/* <a href="" target='_blank'> */}

                        <span
                          onClick={() => {
                            window.open(`${location.href}termsofuseandprivacy`);
                            // history.push('/termsofuseandprivacy');
                          }}
                        >
                          Terms of Use and Privacy
                        </span>
                        {/* </a> */}
                        {/* <span> Terms of use &nbsp;|</span>
                        <span> &nbsp;Cookie policy &nbsp;|</span>
                        <span>&nbsp; Privacy policy </span> */}
                      </td>
                      <td style={{ color: 'rgba(243, 229, 229, 0.719)', fontSize: '10px', float: 'right' }}>
                        <span>Feedback: work@zktube.io</span>
                        <span style={{ marginLeft: '20px' }}>Cooperation: support@zktube.io</span>

                        {/* <a href={discord} target="_blank">
                          <img src={DISCORD} style={{ height: '5%' }} />
                        </a>
                        <a href={telegram} target="_blank">
                          <img src={TELEGRAM} style={{ height: '5%', marginLeft: '15px' }} />
                        </a>
                        <a href={twitter} target="_blank">
                          <img src={TWITTER} style={{ height: '5%', marginLeft: '15px' }} />
                        </a>
                        <a href={facebook} target="_blank">
                          <img src={FACEBOOK} style={{ height: '5%', marginLeft: '15px' }} />
                        </a>
                        <a href={medium} target="_blank">
                          <img src={MEDIUM} style={{ height: '5%', marginLeft: '15px' }} />
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
