import React from 'react';
import { UserOutlined } from '@ant-design/icons';

import StreamerData from './StreamerData';
import styles from './styles/StreamContent.less';

const Stream = ({ passData }) => (
  <div className={styles.root}>
    <img
      src={
        passData.thumbnail_url
          ? passData.thumbnail_url.replace(/-{width}x{height}/, '')
          : 'cat.jpg'
      }
      alt="stream"
    />

    <div className={styles.information}>
      {Object.keys(passData).length ? (
        <>
          <StreamerData userID={passData.user_id} userImage />
          <div>
            <p>{passData.user_name}</p>
            <p>{passData.title}</p>
          </div>
          <div>
            <UserOutlined />
            {passData.viewer_count}
          </div>
        </>
      ) : null}
    </div>
  </div>
);

export default React.memo(Stream);
