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

const Login = () => {
    let [error, setError] = useState(false);

    const onFinish = (userDetail) => {
        fetchAPI('/auth/login', "POST", userDetail)
        .then((response) => {
            if (response.status === "success") {
                window.location.href = "/admin";
                console.log(response);
            } else {
                throw new Error(response.message);
            }
        })
        .catch((err) => {
            console.log(`Error`);
            setError(err.message);
        })
    };

    return (
        <div className='login-page-container'>
            <div className='login-form-container'>
                <div className='login-form-header'>
                    <h2>Sign in</h2>
                </div> 
                {error ? <div className='error-message'>{error}</div>: '' }
                <Form 
                    name='login-form'
                    className='registration-form'
                    onFinish={onFinish}
                >
                    <div className='input-field'>
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Enter your email' }]}
                        >
                            <Input
                                type='email' 
                                className='input' 
                                placeholder='Email' 
                                prefix={<MailOutlined className='email-icon site-form-item-icon' />}
                            />
                        </Form.Item>
                    </div>
                    <div className='input-field password-field'>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Enter your password' }]}
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
                    <p className='forgot-password'><Link to='/forgot-password'>Forgot password?</Link></p>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='btn-submit'>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <p className='signup-text'>New to LMS? <Link to='/register'>Sign up</Link></p>
            </div>
        </div>
    )
}

export default withGuest(Login);