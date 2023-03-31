import React from 'react';
import { Layout } from 'antd';
const { Header, Content } = Layout;

const MainLayout = ({ headerContent, mainContent }) => (
    <Layout>
        <Header>
            {headerContent}
        </Header>
        <Content>
            {mainContent}
        </Content>
    </Layout>
);

export default MainLayout;