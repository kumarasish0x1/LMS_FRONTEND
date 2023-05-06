import React, { useState, useEffect } from "react";
import MenuIcon from '../../assets/images/MenuIcon';
import MainLayout from "../../components/common/MainLayout";
import VideoPlayer from "../../components/common/VideoPlayer";
import fetchAPI from "../../utils/api";
import { useParams } from "react-router-dom";
import './index.scss';

const VideoPlayerWithContentList = (props) => {
    const [loading, setLoading] = useState(true);
    const [isContentListVisible, setIsContentListVisible] = useState(true);
    const [contentData, setContentData] = useState([]);
    const [currentUrl, setCurrentUrl] = useState("");
    const [activeContentId, setActiveContentId] = useState(null);
    const { courseId } = useParams();

    useEffect(() => {
        const fetchContentData = async () => {
            try {
                const response = await fetchAPI(`/courses/${courseId}/sections/${props.section.SectionID}/contents`);
                setContentData(response.data);
                setCurrentUrl(response.data[0].ContentUrl);
                setActiveContentId(response.data[0].ContentID);
            } catch (error) {
                console.error("Error fetching content data:", error);
            }
        };

    fetchContentData();
    setLoading(false);
  }, [courseId, props.section.SectionID]);


    const toggleContentList = () => {
        setIsContentListVisible(!isContentListVisible);
    };

    const setVideoUrl = (content) => {
        setCurrentUrl(content.ContentUrl);
        setActiveContentId(content.ContentID);
    }

    console.log("XYr32: ", props.section);
    if (loading) {
        return <div>Loading</div>
    }

    return (
        <MainLayout>
            <div id="content-video-container">
                <div className="video-player-with-content-list">
                    {isContentListVisible && (
                        <div className="content-list">
                            <div className="content-header-container">
                                <h3 className="content-section-header">{props.section.SectionTitle}</h3>
                                <div className="content-section-progress">Progress - 5%</div>
                            </div>
                            <div className="section-contents-container">
                                {contentData.map((content, index) => {
                                    return (
                                        <div 
                                            className={`content${activeContentId === content.ContentID ? " content-active" : ""}`}
                                            onClick={() => setVideoUrl(content)}
                                        >
                                            <div className="content-title">{content.ContentTitle}</div>
                                            <div className="content-type">{content.ContentType}</div>
                                        </div>
                                    )
                                })}
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
                            <VideoPlayer url={currentUrl}/>
                        </div>
                    </div>

                </div>
            </div>
        </MainLayout>
    )
}

export default VideoPlayerWithContentList;