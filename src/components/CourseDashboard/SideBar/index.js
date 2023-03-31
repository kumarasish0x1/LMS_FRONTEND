import {useState, useEffect} from 'react';
import { CheckCircleOutlined, PlaySquareOutlined } from '@ant-design/icons';
import './index.css';

const SideBar = (props) => {
    const [activeDivId, setActiveDivId] = useState("1");

    useEffect(() => {
        props.parentCallback(props.data[0].url);
    }, []);

    function handleClick(id, url) {
        setActiveDivId(id);
        props.parentCallback(url)
    }

    const sidebarDiv = props.data.map((d) => {
        let status;
        if (d.status === "completed") {
            status = <CheckCircleOutlined className='content-image completed' />;
        } else {
            status = <PlaySquareOutlined className='content-image' />;
        }
        
        let isActive;
        if (d.id === activeDivId) {
            isActive = true;
        } else {
            isActive = false;
        }

        return (
            <div className={isActive ? 'content active' : 'content'} onClick={() => handleClick(d.id, d.url)} key={d.id}>
                {status}
                <div className='content-detail-container'>
                    <div className='content-title'>{d.name}</div>
                    <div className='content-type'>{d.type}</div>
                </div>
            </div>
        );
    });

    return (
        <>
            {sidebarDiv}
        </>
    );
}

export default SideBar;