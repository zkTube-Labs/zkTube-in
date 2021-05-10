import React, {useState} from 'react';
import {Link} from "ice";
import styles from './index.module.scss';
import { useMount } from 'ahooks';

import TESTNET from '@/assets/testnet.png';

const Announcement = () => {
  const [title, setTitle] = useState<string>('zktube testnet has been online notifications...');
  const [body, setBody] = useState<string>('The combination of zero knowledge protocol and layer2');
  const [articleUrl, setArticalUrl] = useState<string>('https://zktube.zendesk.com/');

  useMount(() => {
    getAnnouncement();
  });

  const getAnnouncement = () => {
    const queryUrl = 'https://zktube.zendesk.com/api/v2/help_center/articles.json?page[size]=1';

    fetch(queryUrl).then((response) => {
      response.json().then((announcemnet) => {
        if (announcemnet?.articles[0]) {
          setTitle(announcemnet?.articles[0]?.title);
          // setBody(announcemnet?.articles[0]?.body);
          setArticalUrl(announcemnet?.articles[0]?.html_url);

          const richText = announcemnet?.articles[0]?.body;
          let content = richText.replace(/<.+?>/g, '');
          console.log('richText', content);

          const bodyContent = document.querySelector('#bodyContent');
          if (bodyContent) {
            bodyContent.innerHTML = announcemnet?.articles[0]?.body;
          }
        }
        // console.log('getAnnouncement', announcemnet, announcemnet?.articles[0]?.title, announcemnet?.articles[0]?.body);
      });
    });
  };

  return (
    <div className={styles.testnet}>
      <img className={styles.announceBG} src={TESTNET}/>
      <div className={styles.ourphil}>
        
        <div style={{fontSize: "22PX", fontWeight:"bold", marginBottom:"5px", marginTop: "15px"}}>
          {title}
        </div>
        <div id="bodyContent" className={styles.announceContent}>
          {body}
          {/* <div id="bodyContent"></div> */}
        </div>
      </div>
      <a href={articleUrl} target="_blank">
        <div className={styles.arrow}>
          <div style={{fontSize: "20px", fontWeight:"bold"}}>&gt;</div>
        </div>
      </a>
    
    </div>
  );
};
export default Announcement;
