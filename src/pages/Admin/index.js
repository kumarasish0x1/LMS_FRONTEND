import React, { useEffect, useState } from 'react';
import { Table, Button, Space, Modal, message, Layout, Menu } from "antd";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, TeamOutlined } from '@ant-design/icons';
import fetchAPI from '../../utils/api';
import { useCurrentUserContext } from '../../providers/CurrentUserProvider';
import LoadingContent from '../../components/common/LoadingContent';
import MainLayout from '../../components/common/MainLayout';
import AddUser from '../../components/Admin/AddUser';
import EditUser from '../../components/Admin/EditUser';
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


const Admin = (props) => {
    const [data, setData] = useState([]);
    const { currentUser } = useCurrentUserContext();
    const [loading, setLoading] = useState(true);
    const [collapsed, setCollapsed] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);
    const [showEditUser, setShowEditUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const editUser = (user) => {
      setSelectedUser(user);
      setShowEditUser(true);
    };

    const toggleAddUser = () => {
      setShowAddUser(!showAddUser);
    };

    const handleUserAdded = () => {
      fetchData();
    };

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Role',
            dataIndex: 'role'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '20%',
            render: (_, record) => (
                <Space size="middle" className="action-column">
                    <Button 
                        icon={<EditOutlined />} 
                        type="primary" 
                        className="action-button"
                        onClick={() => editUser(record)}
                        disabled={currentUser && currentUser === record.key}
                    >
                            Edit
                    </Button>
                    <Button 
                        icon={<DeleteOutlined />} 
                        type="primary" 
                        danger 
                        className="action-button"
                        onClick={() => deleteUser(record.key)}
                        disabled={currentUser && currentUser === record.key}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        }
    ]; 

    const fetchData = async () => {
        try {
          const response = await fetchAPI('/admin/users');
      
          const formattedData = response.data.map((user) => {
            let userRole = null;
            if (user.UserRole === 1) {
                userRole = 'Admin';
            } else if (user.UserRole === 2) {
                userRole = 'Instructor';
            } else if (user.UserRole === 3) {
                userRole = 'Student';
            }

            return (
                {
                    key: user.UserID,
                    name: user.UserName,
                    email: user.UserEmail,
                    role: userRole,
                }
            )
        });
      
          setData(formattedData);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        } catch (error) {
          console.error('Error fetching user data');
        }
      };

    const deleteUser = (userId) => {
        Modal.confirm({
          title: 'Confirm Delete?',
          icon: <ExclamationCircleOutlined />,
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
          onOk: async () => {
            try {
              const response = await fetchAPI(`/admin/users/${userId}`, 'DELETE');
      
              // Remove the deleted user from the table data
              const updatedData = data.filter((user) => user.key !== userId);
              setData(updatedData);
      
              // Show a success message
              message.success('User deleted successfully');
            } catch (error) {
              console.error(error);
              message.error('Error deleting user');
            }
          },
        });
      };
      
    useEffect(() => {
        fetchData();
    }, []);
    
    if (loading || !currentUser) { 
      return (
        <MainLayout>
          <LoadingContent />
        </MainLayout>
      )
    }

    if (showEditUser && selectedUser) {
      return (
        <EditUser
          user={selectedUser}
          toggleEditUser={() => setShowEditUser(false)}
          onUserUpdated={fetchData}
        />
      );
    }

    if (showAddUser) {
      return <AddUser toggleAddUser={toggleAddUser} onUserAdded={handleUserAdded} />;
    }

    return (
      <MainLayout>
        <Layout style={{ minHeight: `calc(100vh - 50px)` }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} className="menuItemSelected" />
            </Sider>
            <Content className='inner-content'>
              <Button type="primary add-user" onClick={toggleAddUser}>Add User</Button>
              <Table columns={columns} dataSource={data} className="user-details" />
            </Content>
        </Layout>
      </MainLayout>
    )
};

export default Admin;