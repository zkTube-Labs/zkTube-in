import React, { useState } from 'react';
import styles from './index.module.scss';
import { Collapse, Radio } from '@alifd/next';
import { request } from 'ice';
import { useMount } from 'ahooks';

import info from '@/assets/info.png';
import unilogo from '@/assets/unilogo.png';
import ethlogo1 from '@/assets/ethlogo1.png';
import downBtn from '@/assets/downBtn.png';
import bgCircle from '@/assets/bgcircle.png';
import logoLayer2 from '@/assets/logoLayer2.png';
import bgLayer2 from '@/assets/bgLayer2.png';
import proverMine from '@/assets/proverMine.png';
import shafi from '@/assets/shafi.png';
import vitalik from '@/assets/vitalik.png';
import zcash from '@/assets/zcash.png';
import zktubeprotocol from '@/assets/zktubeprotocol.png';
import rightBtn from '@/assets/rightBtn.png';
import nodes from '@/assets/nodes.png';
import blocks from '@/assets/blocks.png';
import transactions from '@/assets/transactions.png';
import countries from '@/assets/countries.png';
import q1 from '@/assets/q1.png';
import q3 from '@/assets/q3.png';
import q4 from '@/assets/q4.png';
import mq1 from '@/assets/mq1.png';
import mq3 from '@/assets/mq3.png';
import mq4 from '@/assets/mq4.png';
import map from '@/assets/map.png';
import bgTable from '@/assets/bgTable.png';
import table from '@/assets/table.png';
import dan from '@/assets/dan.png';
import john from '@/assets/john.png';
import raul from '@/assets/raul.png';
import lance from '@/assets/lance.png';
import charlene from '@/assets/charlene.png';
import mahim from '@/assets/mahim.png';
import travis from '@/assets/travis.png';
import isabel from '@/assets/isabel.png';
import eng from '@/assets/eng.png';
import linkedin from '@/assets/linkedin.png';
import bgTeam from '@/assets/bgTeam.png';
import DISCORD from '@/assets/icon_dis.png';
import TELEGRAM from '@/assets/icon_tg.png';
import TWITTER from '@/assets/icon_twitter.png';
import FACEBOOK from '@/assets/icon_fb.png';
import MEDIUM from '@/assets/icon_med.png';
import GITTER from '@/assets/icon_gitter.png';
// import mDISCORD from '@/assets/mDiscord.png';
// import mTELEGRAM from '@/assets/mTelegram.png';
// import mTWITTER from '@/assets/mTwitter.png';
// import mFACEBOOK from '@/assets/mFacebook.png';
// import mMEDIUM from '@/assets/mMedium.png';
import YouTube from '@/assets/icon_youtube.png';
import Reddit from '@/assets/icon_reddit.png';
import mGITTER from '@/assets/mGitter.png';
import logos from '@/assets/logos.png';
import bCircle from '@/assets/bcircle.png';
import mCircle from '@/assets/mcircle.png';
import sCircle from '@/assets/scircle.png';
import topCircle from '@/assets/topcircle.png';
import bottomCircle from '@/assets/bottomcircle.png';
import mineMain from '@/assets/mineMain.png';
import smine from '@/assets/smine.png';
import hammer from '@/assets/hammer.png';
import mapTriangle from '@/assets/mapTriangle.png';
import share from '@/assets/share.png';
import tpsLogo from '@/assets/tpsLogo.png';
import feeLogo from '@/assets/feeLogo.png';
import secuLogo from '@/assets/secuLogo.png';
import scalLogo from '@/assets/scalLogo.png';
import { parseNum } from '@/utils';
import video from '@/assets/01.mp4';
import ReactPlayer from 'react-player/lazy';

const { Panel } = Collapse;
const teamList = [
  {
    logo: dan,
    name: 'Daniel Puzny',
    position: 'zkTube CEO',
    eng: '',
    linkIn: 'https://www.linkedin.com/in/daniel-puzny-b63aa29a/',
  },
  {
    logo: john,
    name: 'John Sajadi',
    position: 'zkTube CTO',
    eng: '',
    linkIn: 'https://www.linkedin.com/in/john-sajadi-a1295593/',
  },
  {
    logo: raul,
    name: 'Raul Heraud',
    position: 'zkTube COO',
    eng: '',
    linkIn: 'https://www.linkedin.com/in/raul-heraud-9102782/',
  },
  {
    logo: lance,
    name: 'Lance Zhang',
    position: 'Major Contributor',
    eng: '',
    linkIn: 'https://www.linkedin.com/in/lance-zh-348340202/',
  },
  {
    logo: charlene,
    name: 'Charlene Xia',
    position: 'Major Contributor',
    eng: '',
    linkIn: 'https://www.linkedin.com/in/xialim/',
  },
  {
    logo: mahim,
    name: 'Mahim Sharma',
    position: 'Legal Advisor',
    eng: '',
    linkIn: 'https://www.linkedin.com/in/mahim-sharma-164246a4/',
  },
  // {
  //   logo: travis,
  //   name: 'Raul Heraud',
  //   position: 'Growth Advisor',
  //   eng: '',
  //   linkIn: '',
  // },
  // {
  //   logo: travis,
  //   name: 'Travis Anderson',
  //   position: 'Growth Advisor',
  //   eng: '',
  //   linkIn: '',
  // },
  // {
  //   logo: isabel,
  //   name: 'Isabel Laurent',
  //   position: 'Strategy Advisor',
  //   eng: '',
  //   linkIn: '',
  // },
];

const footerList = [
  {
    title: 'Smart Contracts',
    items: [
      {
        name: 'ZKT Smart Contract',
        href: 'https://github.com/zkTube-Labs/ZKTContracts/tree/main/contracts/zkt',
      },
      {
        name: 'ZKTDeposit Smart Contract',
        href: 'https://github.com/zkTube-Labs/ZKTContracts/tree/main/contracts/zktdeposit',
      },
      {
        name: 'ZKTWhiteList Smart Contract',
        href: 'https://github.com/zkTube-Labs/ZKTContracts/tree/main/contracts/zktwhitelist',
      },
      {
        name: 'ZKTVesting Smart Contract',
        href: 'https://github.com/zkTube-Labs/ZKTContracts/tree/main/contracts/zktvesting',
      },
    ],
  },
  {
    title: 'Developers',
    items: [
      {
        name: 'GitHub',
        href: 'https://github.com/zkTube-Labs',
      },
      {
        name: 'Documentation',
        href: '#',
        // href: 'https://docs.zktube.io/',
      },
      {
        name: 'Audit',
        href: 'https://github.com/peckshield/publications/blob/master/audit_reports/PeckShield-Audit-Report-ZKT-v1.0.pdf',
      },
      {
        name: 'Bug Bounty',
        href: 'https://bitcointalk.org/index.php?topic=5354127.new#new',
      },
    ],
  },
  {
    title: 'Support',
    items: [
      {
        name: 'Terms of Service',
        href: 'https://docs.zktube.io/about/',
      },
      {
        name: 'Privacy Policy',
        href: 'https://docs.zktube.io/about/PRIVACY%20POLICY.html#a-introduction',
      },
    ],
  },
];

const communities = [
  {
    name: 'Gitter Group',
    href: 'https://gitter.im/zkTube-Labs/community',
    logo: GITTER,
    mLogo: GITTER,
  },
  {
    name: 'Discord',
    href: 'https://discord.gg/xtVdMCr54q',
    logo: DISCORD,
    mLogo: DISCORD,
  },
  {
    name: 'Telegram',
    href: 'https://t.me/zkTubeProtocol',
    logo: TELEGRAM,
    mLogo: TELEGRAM,
  },
  {
    name: 'Twitter',
    href: 'https://twitter.com/zktubeofficial',
    logo: TWITTER,
    mLogo: TWITTER,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/zkTube.official/',
    logo: FACEBOOK,
    mLogo: FACEBOOK,
  },
  {
    name: 'Medium',
    href: 'https://zktube.medium.com/',
    logo: MEDIUM,
    mLogo: MEDIUM,
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UCrEy7BBc9SbwpQ-a0Ix1oFw',
    logo: YouTube,
    mLogo: YouTube,
  },
  {
    name: 'Reddit',
    href: 'https://www.reddit.com/r/zkTube_Official/',
    logo: Reddit,
    mLogo: Reddit,
  },
];

const mFooterList = [
  ...footerList,
  {
    title: 'Community',
    items: communities,
  },
  {
    title: 'Contact us',
    items: [
      {
        name: 'Feedback：work@zktube.io',
        href: '',
      },
      {
        name: 'Cooperation：business@zktube.io',
        href: '',
      },
    ],
  },
];

// const footerListTitle = ['Smart Contracts', 'Developers', 'Support', 'Community', 'Contact us'];
const WalletContent = () => {
  const [transfers, setTransfers] = useState('');
  const [holders, setHolders] = useState('');
  const [zktTotal, setZktTotal] = useState('');
  const [nodeCount, setCount] = useState('');
  const [nodeTransactions, setTransactions] = useState('');
  const [nodeBlocks, setBlocks] = useState('');
  const [nodeCountries, setCountries] = useState('');
  const [clientWidth, setClientWidth] = useState(0);
  const [isphone, setIsphone] = useState(false);
  const [isPlaying, setisPlaying] = useState(false);
  useMount(() => {
    let tempIsPhone: boolean = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
    console.log(document.documentElement.clientWidth, 'width');
    setClientWidth(document.documentElement.clientWidth || document.body.clientWidth);
    if (document.documentElement.clientWidth <= 576) {
      tempIsPhone = true;
    }
    setIsphone(tempIsPhone);
    if (tempIsPhone) {
      const htmlwidth = document.documentElement.clientWidth || document.body.clientWidth;
      const htmlDom = document.getElementsByTagName('html')[0];
      htmlDom.style.fontSize = `${(htmlwidth / 414) * 10}px`;
    }
    setisPlaying(true);
    window.addEventListener('resize', () => {
      if (document.documentElement.clientWidth <= 1640) {
        // tempIsPhone = true;
        setClientWidth(1640);
      } else {
        setClientWidth(document.documentElement.clientWidth || document.body.clientWidth);
      }
    });
  });

  useMount(async () => {
    try {
      // setLoading(true);
      // const result = await request.get(
      //   '/info/vipapi/eth/token/0xc53d46fd66edeb5d6f36e53ba22eee4647e2cdb2?apikey=Hyr0AXMSUyu96rgu27GS',
      //   { headers: { 'Cache-Control': 'no-cache' } },
      // );
      // // console.log(result, 'result');

      // // setLoading(false);
      // setTransfers(parseNum(result.data.transferCnt));
      // setHolders(parseNum(result.data.holderCnt));
      // setZktTotal(parseNum(result.data.tokenInfo.t));

      const arr = [
        request.get('/token/api/token', {
          headers: { 'Cache-Control': 'no-cache' },
        }),
        request.post('/token/node/count', { headers: { 'Cache-Control': 'no-cache' } }),
        request.post('/token/node/getBlockStatus', { headers: { 'Cache-Control': 'no-cache' } }),
        request.post('/token/node/countries', { headers: { 'Cache-Control': 'no-cache' } }),
      ];
      const data = await Promise.all(arr);
      setTransfers(parseNum(data[0].msg.transferCnt));
      setHolders(parseNum(data[0].msg.holderCnt));
      setZktTotal(parseNum(data[0].msg.tokenInfo.t));
      setCount(parseNum(data[1].msg.num));
      setTransactions(parseNum(data[2].msg.transactions));
      setBlocks(parseNum(data[2].msg.blocks));
      setCountries(parseNum(data[3].msg.countries));
      // setCount(parseNum('12903'));
      // setTransactions(parseNum('20000'));
      // setBlocks(parseNum('16201'));
      // setCountries(parseNum('17'));
    } catch (error) {
      console.log(error);
      // setLoading(false);
    }
  });

  return (
    <>
      <div
        className={styles.Container}
        style={{ marginTop: isphone ? '10vh' : '103px', overflow: isphone ? 'hidden' : 'auto' }}
      >
        {/* whitepaper desc */}
        {/* <div className={styles.videoContent} style={{ width: `${clientWidth}px` }}>
          <ReactPlayer
            url={video}
            playing={isPlaying}
            width="100%"
            height="100%"
            loop
            onReady={() => setisPlaying(true)}
          /> */}
        {/* <iframe
            src="https://player.vimeo.com/video/589655407?background=1&autoplay=1&loop=1&byline=0&autopause=0&title=0&transparent=1"
            loading="lazy"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            frameBorder="0"
            allowFullScreen
            className={styles.iframe}
          /> */}
        {/* </div> */}
        <div className={isphone ? styles.mTopContent : styles.topContent}>
          {!isphone && <img src={bgCircle} />}
          <div className={isphone ? styles.mFirstInfo : styles.firstInfo}>
            <div className={isphone ? styles.mLeftInfo : styles.leftInfo}>
              <div className={styles.infoTitle}>
                {/* A Layer 2 Solution Based on
                <br />
                ZK-Rollup and Zero-Knowledge
                <br />
                Proof Calculation */}
                {/* zkTube is a Layer 2 Protocol that Turns Mining Green, Provides Mainnet Security and Extra Privacy */}
                zkTube, a first Layer 2 mining network that provides extra security and privacy.
              </div>
              <div className={styles.infoDesc}>
                {/* zkTube is a Layer 2 protocol which uses
                {isphone ? <br /> : ' '}
                Zero-Knowledge proof and
                <br />
                ZK-Rollup to realize low transaction fees and
                {isphone ? <br /> : ' '}
                high throughput {isphone ? ' ' : <br />}
                transaction‘s in ETH. */}
                {/* <div>
                  zkTube is a Layer 2 mining network that turns Ethereum green by using Zero-Knowledge Proof, which
                  provides mainnet security and extra privacy.
                </div> */}
                {/* <div> */}
                {/* </div> */}
                {/* zkTube is adopting ZK-Rollup to enhance scalability, low gas fees, and higher transaction throughput for
                Ethereum. */}
                zkTube is adopting ZK-Rollup to provide enhanced scalability, low gas fees, and higher transaction
                throughput for Ethereum.
              </div>
              <div className={styles.infoBtns}>
                {isphone ? (
                  <>
                    <div
                      className={styles.ConnectBtn}
                      onClick={() => window.open('https://wallet.zktube.io/wallet/detail?from=homepage')}
                    >
                      Connect Wallet &gt;
                    </div>
                    <div
                      className={styles.btnWP}
                      onClick={() =>
                        window.open('https://github.com/zkTube-Labs/zkTube-docs/tree/main/docs/Whitepaper')
                      }
                    >
                      White Paper <img src={share} alt="White Paper" />
                    </div>
                    <div
                      className={styles.btnEth}
                      style={{ fontSize: '1.6rem' }}
                      onClick={() => window.open('https://gitcoin.co/hackathon/projects/gr9/zktube/')}
                    >
                      Uniswap V3 <img src={share} alt="Uniswap V3" />
                    </div>
                    <div
                      className={styles.btnEth}
                      onClick={() =>
                        window.open('https://opengrants.com/grant/0X9eda313cf60f1d004e493fcc123d64c21ef7e6a7')
                      }
                    >
                      Ethereum Donation <img src={share} alt="Ethereum Donation" />
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className={styles.btnWP}
                      onClick={() =>
                        window.open('https://github.com/zkTube-Labs/zkTube-docs/tree/main/docs/Whitepaper')
                      }
                    >
                      <span>White Paper &gt;</span>
                    </div>
                    <div
                      className={styles.btnEth}
                      onClick={() =>
                        window.open('https://opengrants.com/grant/0X9eda313cf60f1d004e493fcc123d64c21ef7e6a7')
                      }
                    >
                      <img src={ethlogo1} className={styles.ethlogo1} alt="" />
                      Ethereum Donation &gt;
                    </div>
                    <div
                      className={styles.btnEth}
                      onClick={() => window.open('https://gitcoin.co/hackathon/projects/gr9/zktube/')}
                    >
                      <img src={unilogo} className={styles.unilogo} alt="" />
                      Uniswap V3 &gt;
                    </div>
                  </>
                )}
              </div>
            </div>
            {!isphone && (
              <div className={styles.rightImg}>
                <img src={info} />
                {/* <ReactPlayer
                  url={video}
                  playing={isPlaying}
                  width="100%"
                  height="100%"
                  loop
                  onReady={() => setisPlaying(true)}
                /> */}
              </div>
            )}
          </div>
          {!isphone && (
            <div className={styles.bottomBtn} onClick={() => document.getElementById('feature')?.scrollIntoView()}>
              <span>Scroll Down For More</span>
              <img src={downBtn} alt="" />
            </div>
          )}
        </div>
        {/* feature desc */}
        {isphone ? (
          <div className={styles.mMiddleFeatureContainer}>
            <div className={styles.mMiddleFeature}>
              <div className={styles.middleItem}>
                <div className={styles.featureLogo}>
                  <img src={feeLogo} alt="" />
                </div>
                <p>Low Gas Fees</p>
                {/* <span>Pay less in transaction fees</span> */}
                <span>Reducing Costs to Fractions of a Cent</span>
              </div>
              <div className={styles.middleItem}>
                <div className={styles.featureLogo}>
                  <img src={tpsLogo} alt="" />
                </div>
                <p>High TPS</p>
                {/* <span>Potentially reach 2000+ tx/sec</span> */}
                <span> TPS Performance reach 2,000+ in a Real Usage Environment</span>
              </div>
              <div className={styles.middleItem}>
                <div className={styles.featureLogo}>
                  <img src={secuLogo} alt="" />
                </div>
                <p>Strong Security</p>
                {/* <span>Security at Ethereum on-chain level</span> */}
                <span>100% Security at Ethereum Mainnet level</span>
              </div>
              <div className={styles.middleItem}>
                <div className={styles.featureLogo}>
                  <img src={scalLogo} alt="" />
                </div>
                <p>High Scalability</p>
                {/* <span>
                  Design offers decentralization with mass transfer processing rolled into one transaction for high
                  scalability
                </span> */}
                <span>Supports Multi-Chain Ecosystems and is Decentralized by design & open for everyone</span>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.middleFeature} id="feature">
              <div className={styles.middleItem}>
                <p>Low Gas Fees</p>
                <span>Reducing Costs to Fractions of a Cent</span>
              </div>
              <div className={styles.middleItem}>
                <p>High TPS</p>
                <span> TPS Performance reach 2,000+ in a Real Usage Environment</span>
              </div>
              <div className={styles.middleItem}>
                <p>Strong Security</p>
                <span>100% Security at Ethereum Mainnet level</span>
              </div>
              <div className={styles.middleItem}>
                <p>High Scalability</p>
                <span>Supports Multi-Chain Ecosystems and is Decentralized by design & open for everyone</span>
              </div>
            </div>
          </>
        )}

        {/* layer container */}
        <div className={isphone ? styles.mLayerDescContainer : styles.layerDescContainer}>
          <div className={styles.layerDesc}>
            {!isphone && <img src={bgLayer2} alt="" />}
            <div className={styles.layerContainer}>
              <div className={styles.layerLeft}>
                <div className={styles.layerTitle}>
                  {/* ZK-Rollup and Ethereum 2.0(with sharding) has the potential to reach the holy grail of same throughput */}
                  Layer 2 and Ethereum 2.0 are Inextricably Linked
                </div>
                <div className={styles.layerInfo}>
                  <div className={styles.leftInfo}>
                    <p>Ethereum 1.0</p>
                    <p>Layer 2</p>
                    <p>Ethereum 2.0</p>
                    <p>Rollup</p>
                  </div>
                  <div className={styles.rightInfo}>
                    <p>10+ TPS</p>
                    <p>2,000+ TPS</p>
                    <p>100,000+ TPS</p>
                    <p>100,000+ TPS</p>
                  </div>
                </div>
              </div>
              <div className={styles.layerRight}>
                <div className={styles.bCircle}>
                  <img src={bCircle} alt="" />
                </div>
                <div className={styles.mCircle}>
                  <img src={mCircle} alt="" />
                </div>
                <div className={styles.sCircle}>
                  <img src={sCircle} alt="" />
                </div>
                <div className={styles.logoCircle}>
                  <div className={styles.topcircle}>
                    <img src={topCircle} alt="" />
                  </div>
                  <div className={styles.bottomcircle}>
                    <img src={bottomCircle} alt="" />
                  </div>
                </div>
                {/* <img src={logoLayer2} /> */}
              </div>
            </div>
          </div>
        </div>
        {/* prover container */}
        <div className={isphone ? styles.mProver : styles.prover}>
          <div className={styles.proverRight}>
            <div className={styles.proverTitle}>Prover-Decentralized Design for Lower Energy Consumption</div>
            <div className={styles.proverDesc}>
              <span>zkTube turns Ethereum green</span>
              <br />
              <span>Provides high transaction volumes</span>
              <br />
              <span>Reduces greenhouse gas emissions</span>
            </div>
          </div>
          <div className={styles.proverLeft}>
            <div className={styles.bigMine}>
              <img src={mineMain} />
            </div>
            <div className={styles.hammer}>
              <img src={hammer} />
            </div>
            <div className={styles.smine}>
              <img src={smine} />
            </div>
            {/* <img src={proverMine} /> */}
          </div>
        </div>
        {/* Origin - Verification Stage - bring to Ethereum Adopted to Mining Network of Zero-Knowledge Proof */}

        <div className={isphone ? styles.mMiddleTitle : styles.middleTitle}>
          {/* What does this mean,
          we can improve this to be more clear */}
          Milestones of Zero-Knowledge {''}
          {!isphone && <br />}
          Proof Technology
        </div>
        {/* famous mark */}
        <div className={isphone ? styles.mMarkContainer : styles.markContainer}>
          <div className={styles.mark}>
            <div
              className={styles.markCard}
              onClick={() => window.open('https://en.wikipedia.org/wiki/Zero-knowledge_proof#Applications')}
            >
              <div className={styles.markTop}>
                <div className={styles.leftLogo}>
                  <img src={shafi} alt="Shafi Glodwasser" />
                </div>
                <div className={styles.rightName}>Shafi Glodwasser</div>
              </div>
              <div className={styles.markContent}>
                Zero-Knowledge Proof was first conceived in 1985 in the paper &quot;The Knowledge Complexity of
                Interactive Proof-Systems&quot;.
              </div>
              <span className={styles.markGo}>
                <img src={rightBtn} />
              </span>
            </div>
            <div className={styles.markCard} onClick={() => window.open('https://en.wikipedia.org/wiki/Zcash')}>
              <div className={styles.markTop}>
                <div className={styles.leftLogo}>
                  <img src={zcash} alt="Zcash" />
                </div>
                <div className={styles.rightName}>Zcash</div>
              </div>
              <div className={styles.markContent}>
                In 2016, the first Zero-Knowledge Proof blockchain project Zcash was born.
              </div>
              <span className={styles.markGo}>
                <img src={rightBtn} />
              </span>
            </div>
            <div
              className={styles.markCard}
              onClick={() =>
                window.open(
                  'https://cointelegraph.com/news/vitalik-obsolete-mining-hardware-could-be-used-for-zero-knowledge-proofs',
                )
              }
            >
              <div className={styles.markTop}>
                <div className={styles.leftLogo}>
                  <img src={vitalik} alt="Vitalik Buterin" />
                </div>
                <div className={styles.rightName}>Vitalik Buterin</div>
              </div>
              <div className={styles.markContent}>
                Zero-Knowledge proofs are on ethereum's roadmap and have been for over two months.
              </div>
              <span className={styles.markGo}>
                <img src={rightBtn} />
              </span>
            </div>
            <div className={styles.markCard} onClick={() => window.open('https://www.youtube.com/watch?v=DrYyYUzxdeY')}>
              <div className={styles.markTop}>
                <div className={styles.leftLogo}>
                  <img src={zktubeprotocol} alt="zkTube Protocol" />
                </div>
                <div className={styles.rightName}>zkTube Protocol</div>
              </div>
              <div className={styles.markContent}>The World's First Zero-Knowledge Proof Mining Network.</div>
              <span className={styles.markGo}>
                <img src={rightBtn} />
              </span>
            </div>
          </div>
        </div>

        {/* distribution */}
        <div className={isphone ? styles.mDistribution : styles.distribution}>
          <div className={styles.distriTitle}>Global node distribution</div>
          <div className={styles.distriDesc}>
            zkTube is the only Layer 2 project that supports mining, giving it a significant advantage over its
            competitors.
          </div>
          <div className={styles.distriInfos}>
            <div className={styles.distriItem}>
              <div className={styles.distriTopLogo}>
                <img src={nodes} />
              </div>
              <div className={styles.distriMiddleDesc}>{nodeCount}</div>
              <div className={styles.distriBottomDesc}>zkTube Nodes</div>
            </div>
            <div className={styles.distriItem}>
              <div className={styles.distriTopLogo}>
                <img src={blocks} />
              </div>
              <div className={styles.distriMiddleDesc}>{nodeBlocks && `${nodeBlocks}`}</div>
              <div className={styles.distriBottomDesc}>Blocks</div>
            </div>
            <div className={styles.distriItem}>
              <div className={styles.distriTopLogo}>
                <img src={transactions} />
              </div>
              <div className={styles.distriMiddleDesc}>{nodeTransactions && `${nodeTransactions}`}</div>
              <div className={styles.distriBottomDesc}>Transctions</div>
            </div>
            <div className={styles.distriItem}>
              <div className={styles.distriTopLogo}>
                <img src={countries} />
              </div>
              <div className={styles.distriMiddleDesc}>{nodeCountries}</div>
              <div className={styles.distriBottomDesc}>Countries</div>
            </div>
          </div>
          <div className={isphone ? styles.mMapInfo : styles.mapInfo}>
            <img src={map} />
            <div className={styles.leftTriangle}>
              <img src={mapTriangle} />
            </div>
            <div className={styles.bottomTriangle}>
              <img src={mapTriangle} />
            </div>
          </div>
        </div>

        {/* token Info  */}
        <div className={isphone ? styles.mTokenDistribution : styles.tokenDistribution}>
          <div className={styles.tokenTitle}>Token Distribution</div>
          <div className={styles.tokenInfos}>
            <div className={styles.tokenItem}>
              <p className={styles.tokenNum}>330,000,000</p>
              <p className={styles.tokenNumTitle}>Maximum Supply</p>
            </div>
            <div className={styles.tokenItem}>
              <p className={styles.tokenNum}>{zktTotal}</p>
              <p className={styles.tokenNumTitle}>Current Token (ZKTR) Held</p>
            </div>
            <div className={styles.tokenItem}>
              <p className={styles.tokenNum}>{holders}</p>
              <p className={styles.tokenNumTitle}>Holding Addresses</p>
            </div>
            <div className={styles.tokenItem}>
              <p className={styles.tokenNum}>{transfers}</p>
              <p className={styles.tokenNumTitle}>Transactions</p>
            </div>
          </div>
          <div className={styles.tokenTableInfo}>
            {!isphone && <img src={bgTable} />}
            <div className={styles.tokenDisImg}>
              <img src={table} />
            </div>
            <div className={styles.roadmapTitle}>Roadmap</div>
          </div>
        </div>

        {/* roadmap */}
        <div className={isphone ? styles.mRoadmapInfos : styles.roadmapInfos}>
          {!isphone && <img src={bgLayer2} alt="" />}

          <div className={styles.roadmapItem}>
            <div className={styles.roadmapLogo}>
              <img src={isphone ? mq1 : q1} />
            </div>
            {!isphone && <div className={styles.roadmapTime}>Q1 2021</div>}
            <div className={styles.roadmapContent}>
              <div className={styles.roadmapTitle}>zkTube Protocol Development</div>
              <div className={styles.roadmapDesc}>Optimize the PLONK algorithm and release White Paper</div>
            </div>
            <div className={styles.roadmapBtn}>Completed</div>
          </div>
          <div className={styles.roadmapItem}>
            <div className={styles.roadmapLogo}>
              <img src={isphone ? mq1 : q1} />
            </div>
            {!isphone && <div className={styles.roadmapTime}>Q2 2021</div>}
            <div className={styles.roadmapContent}>
              <div className={styles.roadmapTitle}>zkTube Testnet Beta Launched</div>
              <div className={styles.roadmapDesc}>
                50,000+ users participated in the testnet and the number of nodes has exceeded 10,000+
              </div>
            </div>
            <div className={styles.roadmapBtn}>Completed</div>
          </div>
          <div className={styles.roadmapItem}>
            <div className={styles.roadmapLogo}>
              <img src={isphone ? mq3 : q3} />
            </div>
            {!isphone && <div className={styles.roadmapTime}>Q3 2021</div>}
            <div className={styles.roadmapContent}>
              <div className={styles.roadmapTitle}>zkTube Mainnet Launch</div>
              <div className={styles.roadmapDesc}>
                Upgrade testnet mining with innovative mining mode and release PayTube wallet
              </div>
            </div>
            <div
              className={styles.roadmapBtn}
              style={{ background: 'linear-gradient(90deg, #A96AD0 0%, #45FFD2 100%)' }}
            >
              Coming soon
            </div>
          </div>
          <div className={styles.roadmapItem}>
            <div className={styles.roadmapLogo}>
              <img src={isphone ? mq4 : q4} />
            </div>
            {!isphone && <div className={styles.roadmapTime}>Q4 2021</div>}
            <div className={styles.roadmapContent}>
              <div className={styles.roadmapTitle}>zkTube Network Integration</div>
              <div className={styles.roadmapDesc}>
                zkTube will support Solidity for Smart Contract, Layer 2 DEX, and Cross-Rollup
              </div>
            </div>
            <div
              className={styles.roadmapBtn}
              style={{ background: 'linear-gradient(90deg, #A96AD0 0%, #45FFD2 100%)' }}
            >
              Coming soon
            </div>
          </div>
        </div>

        {/* team */}
        <div className={isphone ? styles.mTeamContainer : styles.teamContainer}>
          {!isphone && <img src={bgTeam} />}
          <div className={styles.teamTitle}>Contributing team</div>
          <div className={styles.teamInfosContainer}>
            <div className={styles.teamInfos}>
              {teamList.map((_, i) => {
                return (
                  <div className={styles.teamCard} key={i}>
                    <div className={styles.teamLogo}>
                      <img src={_.logo} />
                    </div>
                    <div className={styles.teamName}>{_.name}</div>
                    <div className={styles.teamPosition}>{_.position}</div>
                    <div className={styles.teamBottom}>
                      <div className={styles.teamEng}>
                        <img src={eng} alt="" />
                        {_.eng}eng
                      </div>
                      <div className={styles.teamLinkedin}>
                        <a href={_.linkIn} target="_blank" rel="noreferrer">
                          <img src={linkedin} />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* footer */}
        <footer className={isphone ? styles.mFooter : styles.footer}>
          <div className={styles.footerTitle}>
            {!isphone && (
              <>
                <span className={styles.leftPoint} />
                <span className={styles.rightPoint} />
              </>
            )}
            Simple Solutions by Complex Connections...
          </div>
          {isphone ? (
            <div className={styles.mFooterInfos}>
              <Collapse>
                {mFooterList.map((_, i) => {
                  return (
                    <Panel title={_.title} key={i}>
                      {_.items.map((item, index) => {
                        // return (
                        if (i === 4) {
                          return (
                            <div key={index} className={styles.footerMail}>
                              {item.name}
                            </div>
                          );
                        } else if (i === 3) {
                          return (
                            <>
                              <a href={item.href} target="_blank" rel="noreferrer">
                                <img src={(item as any).logo} />
                                {item.name}
                              </a>
                            </>
                          );
                        } else {
                          return (
                            <a key={index} href={item.href} target="_blank" rel="noreferrer">
                              {item.name}
                            </a>
                          );
                        }
                        // );
                      })}
                    </Panel>
                  );
                })}
              </Collapse>
            </div>
          ) : (
            <div className={styles.footerInfos}>
              {footerList.map((_, i) => {
                return (
                  <>
                    <div className={styles.footerItems} key={i}>
                      <div className={styles.footerItemsTitle}>{_.title}</div>
                      <div className={styles.footerItemsList}>
                        {_.items.map((item, i) => {
                          return (
                            <a key={i} href={item.href} target="_blank" rel="noreferrer" title={item.href}>
                              {item.name}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </>
                );
              })}
              <div className={styles.footerItems}>
                <div className={styles.footerItemsTitle}>Community</div>
                <div className={styles.footerItemsList}>
                  {communities.map((_, i) => {
                    return (
                      <a key={i} href={_.href} title={_.href} target="_blank" rel="noreferrer">
                        <img src={_.logo} alt={_.href} />
                        {_.name}
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className={styles.footerItems}>
                <div className={styles.footerItemsTitle}>Contact us</div>
                <div className={styles.footerItemsListEmail}>Feedback：work@zktube.io</div>
                <div className={styles.footerItemsListEmail}>Cooperation：business@zktube.io</div>
                <div className={styles.footerItemLogo}>
                  <img src={logos} />
                </div>
              </div>
            </div>
          )}
          <div className={styles.fotterRight}>© 2021 zkTube Labs, Inc.</div>
        </footer>
      </div>
    </>
  );
};

export default WalletContent;
