import React, { useState } from 'react';
import { Layout } from 'antd';

import Search from './Search';
import Streamers from './Streamers';
import StreamContent from './StreamContent';
import styles from './styles/Home.less';

const { Header } = Layout;

const Home = () => {
  const [passData, setPassData] = useState({});

  return (
    <Layout className={styles.root}>
      <Header>
        <Search setPassData={setPassData} />
      </Header>
      <Layout>
        <Streamers className={styles.streamers} setPassData={setPassData} />
        <StreamContent passData={passData} />
      </Layout>
    </Layout>
  );
};

export default React.memo(Home);
