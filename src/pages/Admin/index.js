import LayoutWithSideBar from "../../components/common/LayoutWithSideBar";
import { Table, Button } from "antd";
import './index.css';

const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
        title: 'Email',
        dataIndex: 'email'
    },
    {
        title: 'Role',
        dataIndex: 'role'
    },
    {
        title: 'Action',
        dataIndex: 'action'
    }
];

const data = [
    {
      key: '1',
      name: 'Asish',
      email: 'findaks0001@gmail.com',
      role: 'Admin'
    },
    {
      key: '2',
      name: 'Jim Green',
      email: 'jim.green@gmail.com',
        role: 'Student'
    }
  ];

const Admin = () => {
    return (
        <LayoutWithSideBar>
            <Button type="primary add-user">Add User</Button>
            <Table columns={columns} dataSource={data} className="user-details" />
        </LayoutWithSideBar>
    )
};

export default Admin;