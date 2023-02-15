import './index.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container">
            <div className='navigation'>
                <Link to="/login" className='login-link'>Login</Link>
                <Link to="/register"><Button type="primary" className='sign-up-button'>Sign up</Button></Link>
            </div>
            <div className="main-heading">Learning Management System</div>
        </div>
    )
}

export default Home;