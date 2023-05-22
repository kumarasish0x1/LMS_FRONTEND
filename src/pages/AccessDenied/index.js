import { LockOutlined } from '@ant-design/icons';
import MainLayout from '../../components/common/MainLayout';
import './index.scss';

const AccessDenied = () => {
    return (
        <MainLayout>
            <div className="access-denied">
                <LockOutlined className='lock-icon' />
                <span>Access Denied</span>
            </div>
        </MainLayout>
    )
}

export default AccessDenied;
