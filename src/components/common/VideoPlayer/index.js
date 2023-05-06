import React from 'react';
import ReactPlayer from 'react-player';
import './index.scss'

function VideoPlayer({ url }) {
  return (
      <ReactPlayer
        className='react-player'
        url={url}
        width='100%'
        height='100%'
        controls={true}
      />
  );
}

export default VideoPlayer;
