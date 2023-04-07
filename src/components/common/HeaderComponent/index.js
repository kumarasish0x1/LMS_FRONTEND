import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import { 
  UserOutlined, 
  KeyOutlined, 
  PoweroffOutlined 
} from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';
import fetchAPI from '../../../utils/api';

const handleLogout = async () => {
  try {
    await fetchAPI('/auth/logout');
    message.success('Logged out successfully');
    setTimeout(() => {
      window.location.replace('/login');
    }, 2000);
  } catch (error) {
    message.error('Error logging out');
  }
};

const onClick = ({ key }) => {
  if (key === '3') {
    handleLogout();
  }
};

const items = [
  {
    label: (
      <Link to="/profile">
        <UserOutlined className="icon-with-margin" /> Profile
      </Link>
    ),
    key: '1',
  },
  {
    label: (
      <span>
        <KeyOutlined className="icon-with-margin" /> Change Password
      </span>
    ),
    key: '2',
  },
  {
    type: 'divider',
  },
  {
    label: (
      <span>
        <PoweroffOutlined className="icon-with-margin" /> Logout
      </span>
    ),
    key: '3',
  },
];

const HeaderComponent = (props) => {
  let { userName } = props;
  return (
    <div className='header-container'>
      <Link to="/admin"><h1>LMS</h1></Link>
      <div className="dropdown-container">
        <Dropdown menu={{ items, onClick }} trigger={['click']}>
          <a onClick={(e) => e.preventDefault()}>
          <Space>
              <span className="name-placeholder">{userName}</span>
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
};

export default HeaderComponent;
