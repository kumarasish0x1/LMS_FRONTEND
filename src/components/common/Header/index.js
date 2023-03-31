import React from 'react';
import './index.css';
import { UserOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';

const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const items = [
    {
      label: 'Profile',
      key: '1',
    },
    {
      label: 'Change Password',
      key: '2',
    },
    {
      label: 'Logout',
      key: '3',
    },
  ];

const Header = () => (
  <div className='header-container'>
    <h1>LMS</h1>
    <div className="dropdown-container">
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
      >
        <a onClick={(e) => e.preventDefault()}>
        <Space>
            <span className="name-placeholder">John Doe</span>
            <span className="custom-icon"></span>
            <div className="user-icon-container">
                <UserOutlined className="user-icon" />
        </div>
        </Space>
        </a>
      </Dropdown>
    </div>
  </div>
);

export default Header;
