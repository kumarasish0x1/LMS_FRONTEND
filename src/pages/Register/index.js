import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    EyeInvisibleOutlined, 
    EyeOutlined,
    InfoCircleOutlined
  } from '@ant-design/icons';
import { Button, Input, Form } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './index.css';
import withGuest from '../../hocs/withGuest';
import fetchAPI from "../../utils/api";

const Register = () => {
    let successMessage = <div className='success-message'>Registration Successful</div>;
    let [success, setSuccess] = useState(false);
    let [error, setError] = useState(false);

    const onFinish = (userDetail) => {
        fetchAPI("/auth/register", "POST", userDetail)
        .then((response) => {
            if (response.status === "success") {
                setError(false);
                setSuccess(true);
                
                setTimeout(() => {
                    window.location.href = "/login";
                }, 2000);
            } else {
                throw new Error(response.message);
            }
        })
        .catch((err) => {
            setSuccess(false);
            setError(err.message);
        })
    };

    return (
        <div className='registration-page-container'>
            <div className='registration-form-container'>
                <div className='registration-form-header'>
                    <h2>Sign up</h2>
                </div>
                {success ? successMessage : ''}
                {error ? <div className='error-message'>{error}</div>: '' }
                <Form 
                    name='registration-form'
                    className='registration-form'
                    onFinish={onFinish}
                >
                    <div className='input-field'>
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: `Enter a valid name` }]}
                        >
                            <Input 
                                type='text' 
                                className='input' 
                                placeholder='Name' 
                                prefix={<UserOutlined className='name-icon site-form-item-icon' />}
                            />
                        </Form.Item>
                    </div>
                    <div className='input-field'>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Enter a valid email' }]}
                        >
                            <Input
                                type='email' 
                                className='input' 
                                placeholder='Email' 
                                prefix={<MailOutlined className='email-icon site-form-item-icon' />}
                            />
                        </Form.Item>
                    </div>
                    <div className='input-field'>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Enter a valid password' }]}
                        >
                            <Input.Password
                                type='password' 
                                className='input' 
                                placeholder='Password' 
                                prefix={<LockOutlined className='password-icon site-form-item-icon' />}
                                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='btn-submit'>
                            Register
                        </Button>
                    </Form.Item>
                </Form>
                <p className='login-text'>Already on LMS? <Link to='/login'>Login</Link></p>
            </div>
        </div>
    )
}

export default withGuest(Register);