import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import './index.css';
import { Spin } from 'antd';
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

const Loading = () => {
    return (
        <Spin indicator={antIcon} className="loading" />
    )
}

export default Loading;