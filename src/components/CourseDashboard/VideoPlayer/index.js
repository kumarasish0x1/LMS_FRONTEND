import React from 'react'
import ReactPlayer from 'react-player';
import './index.css'

const VideoPlayer = (props) => (
    <div className='video-container'>
        <ReactPlayer
            url={props.url}
            controls 
            height="100%"
            width="100%"
            config={{
                file: {
                    attributes: {
                    controlsList: "nodownload noplaybackrate",
                    disablePictureInPicture: "true"
                    }
                }
            }}
        />
    </div>
);

export default VideoPlayer;