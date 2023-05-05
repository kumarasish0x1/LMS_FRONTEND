import React, { useState } from "react";
import MenuIcon from '../../assets/images/MenuIcon';
import MainLayout from "../../components/common/MainLayout";
import VideoPlayer from "../../components/common/VideoPlayer";
import './index.scss';

const VideoPlayerWithContentList = () => {
    const [isContentListVisible, setIsContentListVisible] = useState(true);

    const toggleContentList = () => {
        setIsContentListVisible(!isContentListVisible);
    };

    return (
        <MainLayout>
            <div id="content-video-container">
                <div className="video-player-with-content-list">
                    {isContentListVisible && (
                        <div className="content-list">
                            <div className="content-header-container">
                                <h3 className="content-section-header">Java</h3>
                                <div className="content-section-progress">Progress - 5%</div>
                            </div>
                            <div className="section-contents-container">
                                <div className="content">
                                    <div className="content-title">Intro</div>
                                    <div className="content-type">Video</div>
                                </div>
                                <div className="content">
                                    <div className="content-title">Pre-requistie</div>
                                    <div className="content-type">Video</div>
                                </div>
                                <div className="content">
                                    <div className="content-title">Test Code</div>
                                    <div className="content-type">Video</div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className={`content-video-container${!isContentListVisible ? ' expanded' : ''}`}>
                        <div className="hamburger-menu-container">
                            <button className="hamburger-menu" onClick={toggleContentList}>
                                <MenuIcon className="menu-icon" />
                            </button>
                            <span className="menu-text">Menu</span>
                        </div>
                        <div className="video-player">
                            <VideoPlayer />
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    )
}

export default VideoPlayerWithContentList;