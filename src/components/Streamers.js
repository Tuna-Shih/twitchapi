import React, { useEffect, useState } from 'react';
import { List, Button } from 'antd';

import StreamerData from './StreamerData';
import useFetch from './hooks/useFetch';
import styles from './styles/Streamers.less';

const { Item: ListItem } = List;

const Streamers = ({ setPassData }) => {
  const [renderMore, setRenderMore] = useState(true);
  const [streamData, setStreamData] = useState([]);
  const { data: streamers } = useFetch(
    `https://api.twitch.tv/helix/streams?language=zh&first=20`,
  );

  useEffect(() => {
    setStreamData(
      streamers ? streamers.data.slice(0, renderMore ? 10 : 20) : [],
    );
  }, [renderMore, streamers]);

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <span>中文台觀看人數排名</span>
      </div>

      <List
        renderItem={streamer => (
          <ListItem
            actions={[<div>{streamer.viewer_count}</div>]}
            onClick={() => setPassData(streamer)}
          >
            <ListItem.Meta
              avatar={<StreamerData userID={streamer.user_id} userImage />}
              title={streamer.user_name}
              description={<StreamerData gameID={streamer.game_id} />}
            />
          </ListItem>
        )}
        dataSource={streamData}
        itemLayout="horizontal"
      />

      <Button onClick={() => setRenderMore(!renderMore)}>
        {renderMore ? '顯示更多' : '顯示更少'}
      </Button>
    </div>
  );
};

export default React.memo(Streamers);
