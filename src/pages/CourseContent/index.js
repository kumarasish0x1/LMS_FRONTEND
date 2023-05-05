import React, { useState, useEffect } from 'react';
import MainLayout from "../../components/common/MainLayout";
import './index.scss';
import CompletedSVG from '../../assets/images/Completed';
import IncompleteSVG from "../../assets/images/Incomplete";
import fetchAPI from '../../utils/api';
import { useParams, Link } from "react-router-dom";
import VideoPlayerWithContentList from '../VideoPlayerWithContentList';

const CourseContent = () => {
    const [sections, setSections] = useState([]);
    const [showContent, setShowContent] = useState(false);
    const { courseId } = useParams();

    const fetchSections = async () => {
        try {
            const response = await fetchAPI(`/courses/${courseId}/sections`);
            setSections(response.data);
        } catch (error) {
            console.error('Error fetching sections:', error);
        }
    };

    const showContentPage = () => {
        setShowContent(true);
    }

    useEffect(() => {
        fetchSections();
    }, [courseId]);

    console.log("Section: ", sections);

    if (showContent) {
        return <VideoPlayerWithContentList />
    }

    return (
        <MainLayout>
            <div id="course-content-container">
                <div className="completed-module-container">
                    <div className="completed-module">Completed Module - 0 / 10</div>
                </div>
                {sections.map((section, index) => (
                    <div className="course-section" onClick={() => showContentPage(section)}>
                        <div className="section-wrapper">
                            <div className="section-status">
                                <IncompleteSVG />
                            </div>
                            <h3 className="section-name">{section.SectionTitle}</h3>
                        </div>
                        <div className="completed-status">
                            <div>0 / 5 Videos</div>
                        </div>
                    </div>
                ))}
                {
                    /*
                        <div className="course-section">
                            <div className="section-wrapper">
                                <div className="section-status">
                                    <CompletedSVG />
                                </div>
                                <h3 className="section-name">Control Structure</h3>
                            </div>
                            <div className="completed-status completed">
                                <div>7 / 7 Videos</div>
                            </div>
                        </div>
                    */
                }
            </div>
        </MainLayout>
    )
}

export default CourseContent;