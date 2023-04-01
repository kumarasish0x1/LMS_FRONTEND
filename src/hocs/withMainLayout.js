import React from 'react';
import HeaderComponent from '../components/common/HeaderComponent';
import { Layout } from 'antd';
const { Header, Content } = Layout;


const withMainLayout = (WrappedComponent) => {
    return (props) => {
      return (
        <Layout>
            <Header>
                <HeaderComponent />
            </Header>
            <Content>
                <WrappedComponent {...props} />
            </Content>
        </Layout>
      );
    };
};
  
export default withMainLayout ;