import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, Button, Space, Tag, Badge,
  Popconfirm, message, Card, Row, Col,
  Statistic, Spin
} from 'antd';
import {
  UserOutlined, CheckCircleOutlined,
  StopOutlined, ClockCircleOutlined,
  EditOutlined, DeleteOutlined, PlusOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api/admin`;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/users`, {
        params: {
          page: pagination.current,
          limit: pagination.pageSize
        }
      });
      setUsers(res.data);
      setPagination({
        ...pagination,
        total: res.headers['x-total-count'] || res.data.length
      });
    } catch (err) {
      message.error('Failed to fetch users');
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/users/stats`);
      setStats(res.data);
    } catch (err) {
      message.error('Failed to fetch stats');
    }
  };

  const loadData = async () => {
    setLoading(true);
    await Promise.all([fetchUsers(), fetchStats()]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [pagination.current, pagination.pageSize]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`);
      message.success('User deleted');
      loadData();
    } catch (err) {
      message.error('Failed to delete user');
    }
  };

  const handleStatusChange = async (id, currentStatus) => {
    try {
      await axios.patch(`${API_BASE_URL}/users/${id}/status`, {
        is_active: !currentStatus
      });
      message.success(`User ${currentStatus ? 'deactivated' : 'activated'}`);
      loadData();
    } catch (err) {
      message.error('Failed to update status');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <Link to={`/admin/users/${text}`}>{text}</Link>
    },
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => `${record.first_name} ${record.last_name}`
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'red' : role === 'agent' ? 'blue' : 'green'}>
          {role.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'status',
      render: (active) => (
        <Badge status={active ? 'success' : 'error'} text={active ? 'Active' : 'Inactive'} />
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type={record.is_active ? 'default' : 'primary'}
            danger={record.is_active}
            onClick={() => handleStatusChange(record.id, record.is_active)}
          >
            {record.is_active ? 'Deactivate' : 'Activate'}
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/users/edit/${record.id}`)}
          />
          <Popconfirm
            title="Delete this user?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      )
    }
  ];

  if (loading && users.length === 0) {
    return <Spin size="large" className="spinner" />;
  }

  return (
    <div className="manage-users">
      <div className="header">
        <h1>User Management</h1>
        <Link to="/admin/users/add">
          <Button type="primary" icon={<PlusOutlined />}>Add User</Button>
        </Link>
      </div>

      <Row gutter={16} className="stats">
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={stats.total || 0}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={stats.active || 0}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Inactive Users"
              value={(stats.total || 0) - (stats.active || 0)}
              prefix={<StopOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="New Today"
              value={stats.today || 0}
              prefix={<ClockCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Card className="users-table">
        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={pagination}
          loading={loading}
          onChange={(pagination) => setPagination(pagination)}
        />
      </Card>
    </div>
  );
};

export default ManageUsers;