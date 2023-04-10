import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import MainLayout from '../../common/MainLayout';
import fetchAPI from '../../../utils/api';
import './index.css';

const { Option } = Select;

const EditUser = (props) => {
    const [errorMessage, setErrorMessage] = React.useState("");

  const editUser = async (values) => {
    try {
        await fetchAPI(`/admin/users/${props.user.key}`, 'PATCH', {
            UserRole: values.role
          });
          message.success('Update successfully');
          props.onUserUpdated();
          props.toggleEditUser();
    } catch (error) {
        setErrorMessage(error.message);
        message.error('Error updating user');
    }
  };

  const onFinish = (values) => {
    editUser(values);
  };

  return (
    <MainLayout>
      <div className="edit-user-container">
        <div className="edit-user-form-wrapper">
            <h2>Edit User</h2>
            <div className='form-container'>
            <div className='user-details-container'>
                <div className='user-detail-box'>Name: {props.user.name}</div>
                <div className='user-detail-box'>Email: {props.user.email}</div>
                <div className='user-detail-box'>Current Role: {props.user.role}</div>
            </div>
            <Form layout="vertical" onFinish={onFinish} className="edit-user-form">
                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: 'Please select a user role!' }]}
                >
                    <Select placeholder="Select a user role">
                        <Option value={2}>Instructor</Option>
                        <Option value={3}>Student</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    {errorMessage ? <div className="error-message">{errorMessage}</div> : ''}
                    <Button type="primary" htmlType="submit" className="edit-user-form-button">
                        Update
                    </Button>
                    <Button onClick={props.toggleEditUser} className="edit-user-form-button cancel-button">
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditUser;
