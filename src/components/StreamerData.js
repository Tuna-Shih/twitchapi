import React from 'react';

import useFetch from './hooks/useFetch';

const UserData = ({ userID, gameID, userImage }) => {
  const { data: user } = useFetch(
    `https://api.twitch.tv/helix/users?id=${userID}`,
  );

  const { data: game } = useFetch(
    `https://api.twitch.tv/helix/games?id=${gameID}`,
  );

  return (
    <>
      {userImage ? (
        <img
          src={user?.data ? user.data[0].profile_image_url : null}
          alt="userImage"
        />
      ) : (
        <>{game?.data[0] ? game.data[0].name : null}</>
      )}
    </>
  );
};

export default React.memo(UserData);
