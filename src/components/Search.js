import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'antd';

import styles from './styles/Search.less';
import useFetch from './hooks/useFetch';

const { Option } = AutoComplete;

const Search = ({ setPassData }) => {
  const [option, setOption] = useState('');
  const [chosen, setChosen] = useState('');
  const { data } = useFetch(
    `https://api.twitch.tv/helix/search/channels?query=${option}`,
  );
  const { data: streamer } = useFetch(
    `https://api.twitch.tv/helix/streams?user_id=${chosen}`,
  );

  useEffect(() => {
    if (chosen && streamer?.data.length) {
      setPassData(streamer['data'][0]);
    }
  }, [chosen, streamer, setPassData]);

  return (
    <AutoComplete
      className={styles.root}
      onChange={setOption}
      onSelect={e =>
        setChosen(
          data.data.filter(element => element['display_name'] === e)[0]['id'],
        )
      }
      placeholder="搜尋(only streams)"
    >
      {option && data
        ? data.data.map(element => (
            <Option value={element.display_name} key={element.id}>
              {element.display_name}
            </Option>
          ))
        : null}
    </AutoComplete>
  );
};

export default React.memo(Search);
