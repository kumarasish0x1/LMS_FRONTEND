import {useEffect, useState} from 'react';
import { Layout, Col, Row } from 'antd';
import VideoPlayer from './components/VideoPlayer';
import SideBar from './components/SideBar';
import { HeatMapOutlined } from '@ant-design/icons';
import Loading from '../../components/Loading';

import { getVideoDetails } from '../../services/videoDetails';
import './index.css';

const { Header, Content } = Layout;

const CourseDashboard = () => {
    const [list, setList] = useState([]);
    const [video, setVideo] = useState('');

    useEffect(() => {
        getVideoDetails()
        .then(data => {
            setList(data);
        })
    }, []);

    function handleCallback(childData) {
        console.log("called", childData);
        setVideo(childData);
    }
    
    let sidebarData;
    if (list.length) {
        sidebarData = [...list];

        return (
            <>
                <Layout>
                    <Header className="header-section">
                        <div className='logo-container'>
                            <HeatMapOutlined className='logo' />
                        </div>
                    </Header>
                    <Content>
                        <Row className='content-container'>
                            <Col span={6} className="content-list">
                                <h2 className='sidebar-header'>Lectures</h2>
                                <SideBar data={sidebarData} parentCallback={handleCallback} />
                            </Col>
                            <Col span={18} className="content-wrapper">
                                <VideoPlayer url={video} />
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </>
        );
    } else {
        return (
            <Loading />
        )
    }
}

export default CourseDashboard;