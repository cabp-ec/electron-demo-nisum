import React from 'react';
import { PlayerInterface } from './player.interface';
import ReactPlayer from 'react-player/lazy';

export const Player: React.FC<PlayerInterface> = ({ isVideo = true, resourceUrl }: PlayerInterface) => {
  console.log('PLAYER PLAY: ', resourceUrl);

  return (
    <div className="bg-secondary rounded w-100 h-100">
      <ReactPlayer
        url={ resourceUrl }
        width="100%"
        height="100%"
      />
    </div>
  );
};
