import React from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import MainLayout from '../../common/MainLayout';
import fetchAPI from '../../../utils/api';
import './index.css';

const { Option } = Select;

const AddUser = (props) => {
    const [errorMessage, setErrorMessage] = React.useState("");

  const addUser = async (values) => {
    try {
      await fetchAPI('/admin/users', 'POST', {
        UserName: values.name,
        UserEmail: values.email,
        UserPassword: values.password,
        UserRole: values.role,
      });
      message.success('User added successfully');
      props.toggleAddUser();
      props.onUserAdded();
    } catch (error) {
        setErrorMessage(error.message);
      message.error('Error adding user');
    }
  };

  const onFinish = (values) => {
    addUser(values);
  };

  return (
    <MainLayout>
      <div className="add-user-container">
        <div className="add-user-form-wrapper">
            <h2>Add User</h2>
            <div className='form-container'>
            <Form layout="vertical" onFinish={onFinish} className="add-user-form">
                <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input the user name!' }]}
                >
                <Input placeholder="Enter user name" />
                </Form.Item>
                <Form.Item
                label="Email"
                name="email"
                rules={[
                    { type: 'email', message: 'The input is not a valid email!' },
                    { required: true, message: 'Please input the user email!' },
                ]}
                >
                <Input placeholder="Enter user email" />
                </Form.Item>
                <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input the user password!' }]}
                >
                <Input.Password placeholder="Enter user password" />
                </Form.Item>
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
                <Button type="primary" htmlType="submit" className="add-user-form-button">
                    Add User
                </Button>
                <Button onClick={props.toggleAddUser} className="add-user-form-button cancel-button">
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

export default AddUser;
