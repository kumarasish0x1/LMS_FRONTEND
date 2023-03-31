import React from 'react';
import MainLayout from '../../components/common/MainLayout';
import HeaderComponent from '../../components/common/Header';

const Profile = () => {
  const mainContent = (
    <div>
      {/* Your main content goes here */}
      <p>This is the main content of the website.</p>
    </div>
  );

  return (
    <MainLayout 
        headerContent={<HeaderComponent />} 
        mainContent={mainContent} 
    />
  );
};

export default Profile;
