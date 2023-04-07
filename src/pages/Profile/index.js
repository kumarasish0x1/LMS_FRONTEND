import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Button, Row, Col, message } from 'antd';
import withAuthenticatedUser from '../../hocs/withAuthenticatedUser';
import MainLayout from '../../components/common/MainLayout';
import LoadingContent from '../../components/common/LoadingContent';
import './index.css';
import {
  EditOutlined
} from '@ant-design/icons';
import fetchAPI from '../../utils/api';

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      const response = await fetchAPI('/users/profile');
      setUserName(response.data.user.UserName);
      setUserEmail(response.data.user.UserEmail);
      setTimeout(() => {
        setIsLoading(false);
    }, 5000);
    } catch (error) {
      message.error('Error fetching user profile');
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const updateUserProfile = async (name) => {
    try {
      await fetchAPI('/users/profile', 'PATCH', { UserName: name });
      message.success('Profile updated successfully');
      setUserName(name);
    } catch (error) {
      message.error('Error updating user profile');
    }
  };

  const onFinish = (values) => {
    updateUserProfile(values.name);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <LoadingContent />
      </MainLayout>
    )
}

  return (
    <MainLayout>
      <Row className='content-wrapper'>
        <Col span={24} className="profile-container">
          <div className="profile-image">
            <svg aria-hidden="true" fill="none" focusable="false" height="20" viewBox="0 0 20 20" width="20" class="css-1xaidju" id="cds-react-aria-2">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.027 2.5a3.473 3.473 0 100 6.945 3.473 3.473 0 000-6.945zM5.554 5.973a4.473 4.473 0 118.946 0 4.473 4.473 0 01-8.946 0zM6.58 11.516a.5.5 0 01.357.04 6.73 6.73 0 003.073.744 6.649 6.649 0 003.051-.743.5.5 0 01.36-.04c3.305.861 5.079 3.675 5.079 6.483h-1c0-2.34-1.439-4.676-4.152-5.467a7.676 7.676 0 01-3.336.767h-.004a7.759 7.759 0 01-3.355-.767C3.954 13.324 2.5 15.661 2.5 18h-1c0-2.81 1.793-5.622 5.08-6.484z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className='profile-name'>{userName}</h2>
          <div className='profile-email'>{userEmail}</div>
          <div className='profile-edit-icon' onClick={showModal}>
            <EditOutlined className='edit-icon' /> Edit
          </div>
        </Col>
        <Modal 
          title="Edit Profile" 
          open={isModalOpen} 
          onOk={handleOk} 
          okText="Update"
          onCancel={handleCancel}
          cancelText={null}
          maskClosable={true}
          footer={
            <div style={{ textAlign: 'left' }}>
              <Button type="primary" htmlType="submit" form="profile-update-form">
                Update
              </Button>
          </div>
          }
        >
          <Form layout="vertical" onFinish={onFinish} id="profile-update-form">
            <Form.Item
              name="name"
              rules={[{ message: 'Please input your name!' }]}
            >
              <Input placeholder="Enter your name" />
            </Form.Item>
          </Form>
        </Modal>
      </Row>
    </MainLayout>
  );
};

export default withAuthenticatedUser(Profile);