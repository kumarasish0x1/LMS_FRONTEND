import {
    UserOutlined,
    MailOutlined,
    LockOutlined,
    EyeInvisibleOutlined, 
    EyeOutlined,
    InfoCircleOutlined
  } from '@ant-design/icons';
import { Button, Input, Form } from 'antd';
import { Link } from 'react-router-dom';
import './index.css';

// need to have a separate location
async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

const Login = () => {
    return (
        <div className='login-page-container'>
            <div className='login-form-container'>
                <div className='login-form-header'>
                    <h2>Sign in</h2>
                </div> 
                <Form 
                    name='login-form'
                    className='registration-form'
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

export default Login;