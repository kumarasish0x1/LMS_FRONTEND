import React from 'react';
import MainLayout from '../../components/common/MainLayout';
import HeaderComponent from '../../components/common/Header';
import withAuthenticatedUser from '../../hocs/withAuthenticatedUser';

const Profile = () => {
  const mainContent = (
    <div>
      
    </div>
  );

  return (
    <MainLayout 
        headerContent={<HeaderComponent />} 
        mainContent={mainContent} 
    />
  );
};

export default withAuthenticatedUser(Profile);
