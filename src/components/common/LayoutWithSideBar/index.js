import MainLayout from '../MainLayout';
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import './index.css'
const { Sider, Content } = Layout;

function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

const items = [
    getItem('Admin', '1', <TeamOutlined />),
  ];

const LayoutWithSideBar = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
            <MainLayout>
                <Layout style={{ minHeight: `calc(100vh - 50px)` }}>
                    <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} className="menuItemSelected" />
                    </Sider>
                    <Content className='inner-content'>
                      {props.children}
                    </Content>
                </Layout>
            </MainLayout>
    );
};

export default LayoutWithSideBar;