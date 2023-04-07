import React, { useState, useEffect } from 'react';
import HeaderComponent from '../HeaderComponent';
import Loading from '../Loading';
import { Layout, message } from 'antd';
import fetchAPI from '../../../utils/api';
const { Header, Content } = Layout;

const MainLayout = (props) => {
    const [userName, setUserName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserProfile = async () => {
        try {
            const response = await fetchAPI('/users/profile');
            setUserName(response.data.user.UserName);
            setIsLoading(false);
        } catch (error) {
            message.error('Error fetching user profile');
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    if (isLoading) {
        return <Loading />
    }

    return (
        <Layout>
            <Header>
                <HeaderComponent userName={userName} />
            </Header>
            <Content>
                {props.children}
            </Content>
        </Layout>
    );
};

export default MainLayout;
