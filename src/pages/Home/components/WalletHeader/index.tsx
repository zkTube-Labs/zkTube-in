import React, { useState, useRef } from 'react';
import styles from './index.module.scss';
import logo from '@/assets/logo1.png';
import { Link } from 'ice';
import { Overlay, Collapse, Dropdown, Menu, List } from '@alifd/next';
import menuClose from '@/assets/menuClose.png';
import menuIcon from '@/assets/menu.png';
import downLogo from '@/assets/downLogo.png';
import { useMount } from 'ahooks';

const { Panel } = Collapse;
const WalletHeader = () => {
  let headerTarget: any = useRef(null);
  const [isphone, setIsphone] = useState(false);
  const [isShow, setIsShow] = useState<boolean>(true);
  const [visibleMenu, setVisibleMenu] = useState<boolean>(false);
  const [menuList, setMenuList] = useState<any[]>([
    {
      title: 'Docs',
      href: 'https://github.com/zkTube-Labs/zkTube-docs/tree/main/docs/Tutorials',
    },
    {
      title: 'zkTube Scan',
      href: 'https://rinkeby-browser.zktube.io/',
      // href: 'https://scan.zktube.io/',
    },
    {
      title: 'FAQ',
      href: 'https://docs.zktube.io/faq/',
    },
  ]);
  useMount(() => {
    const tempIsPhone: boolean = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);

    setIsphone(tempIsPhone);
  });

  const menu = (
    <Menu className={styles.menuContainer}>
      <div className={styles.triangle} />
      <Menu.Item
        className={styles.menuItem}
        // eslint-disable-next-line no-return-assign
        onClick={() => window.open('https://zktube.zendesk.com/hc/en-us/sections/360013215451-Announcements')}
      >
        Announcement
      </Menu.Item>
    </Menu>
  );

  const handleMenu = () => {
    setIsShow(!isShow);
    setVisibleMenu(!visibleMenu);
  };

  return (
    <header className={styles.header} style={{ height: isphone ? '10vh' : '103px' }}>
      {isphone ? (
        <>
          <div
            className={styles.phoneHeader}
            ref={(ref) => {
              headerTarget = ref;
            }}
            id="phoneHeader"
          >
            <div className={styles.leftLogo} onClick={() => window.open('https://zktube.io/')}>
              <img src={logo} alt="logo" width="100%" className={styles.logo} />
            </div>
            <div className={styles.rightMenu} onClick={handleMenu}>
              <img src={isShow ? menuIcon : menuClose} alt="" />
            </div>
          </div>
          <Overlay visible={visibleMenu} align={false} safeNode={() => headerTarget}>
            <div className={styles.overlayMenu}>
              <div className={styles.shadow} />

              <div className={styles.menuContainer}>
                {/* <div className={styles.menuOne}>Home</div> */}
                <Collapse
                  style={{
                    border: 'none',
                  }}
                >
                  <Panel title="Company">
                    <div
                      onClick={() =>
                        window.open('https://zktube.zendesk.com/hc/en-us/sections/360013215451-Announcements')
                      }
                    >
                      Announcement
                    </div>
                  </Panel>
                </Collapse>
                <List
                  size="medium"
                  // header={<div>Notifications</div>}
                  dataSource={menuList}
                  renderItem={(item, i) => (
                    <List.Item key={i} title={item.title} onClick={() => window.open(item.href)} />
                  )}
                />
              </div>
            </div>
          </Overlay>
        </>
      ) : (
        <div className={styles.headerContainer}>
          {/* <Link to="#"> */}
          <div onClick={() => location.reload()} className={styles.logoContainer}>
            <img src={logo} alt="logo" width="10%" className={styles.logo} />
          </div>
          {/* </Link> */}
          <div className={styles.middleContainer}>
            <Dropdown
              trigger={
                <a style={{ cursor: 'pointer' }}>
                  Company <img src={downLogo} />
                </a>
              }
              triggerType={['hover']}
            >
              {menu}
            </Dropdown>
            {/* <a href="/#/">Company</a> */}
            {/* <a href="/#/"> */}
            <a
              href="https://github.com/zkTube-Labs/zkTube-docs/tree/main/docs/Tutorials"
              target="_blank"
              rel="noreferrer"
            >
              Docs
            </a>
            <a href="https://rinkeby-browser.zktube.io/" target="_blank" rel="noreferrer">
              {/* <a href="https://scan.zktube.io/" target="_blank" rel="noreferrer"> */}
              zkTube Scan
            </a>
            <a href="https://docs.zktube.io/faq/" target="_blank" rel="noreferrer">
              FAQ
            </a>
          </div>
          <div
            className={styles.rightBtn}
            onClick={() => window.open('https://wallet.zktube.io/wallet/detail/?from=homepage')}
          >
            Connect Wallet &gt;
          </div>
        </div>
      )}
    </header>
  );
};

export default WalletHeader;
