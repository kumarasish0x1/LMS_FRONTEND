import React from 'react';

const VideoPlayer = ({ videoId }) => {
  return (
    <div>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        width="500"
        height="300"
        allowfullscreen
      ></iframe>
    </div>
  );
};

export default VideoPlayer;
