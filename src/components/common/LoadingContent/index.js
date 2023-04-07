import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import './index.css';

const LoadingContent = () => {
    return (
      <div className="fetching-data loading">
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </div>
    )
}

export default LoadingContent;