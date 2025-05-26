import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import {
  Table, Button, Space, Tag, Badge,
  Popconfirm, message, Card, Row, Col,
  Statistic, Typography, Input, Select
} from 'antd';
import {
  HomeOutlined, PlusOutlined, EditOutlined,
  DeleteOutlined, SearchOutlined, SyncOutlined,
  CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const ManageHouses = () => {
  const [houses, setHouses] = useState([]);
  const [stats, setStats] = useState({ total: 0, available: 0, pending: 0, rejected: 0 });
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [searchText, setSearchText] = useState('');
  const [approvalStatusFilter, setApprovalStatusFilter] = useState('');
  const navigate = useNavigate();

  const handleApprove = async (id) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/admin/managehouses/${id}/approve`);
      message.success('House approved successfully');
      loadData();
    } catch (err) {
      message.error('Failed to approve house');
    }
  };
  
  const handleReject = async (id) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/admin/managehouses/${id}/reject`);
      message.success('House rejected successfully');
      loadData();
    } catch (err) {
      message.error('Failed to reject house');
    }
  };

  const fetchHouses = async (page = 1, pageSize = 10, search = '', approvalStatus = '') => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/managehouses`, {
        params: {
          page,
          limit: pageSize,
          search,
          approval_status: approvalStatus
        }
      });
      setHouses(res.data.data);
      setPagination(prev => ({
        ...prev,
        current: page,
        pageSize,
        total: res.data.total
      }));
    } catch (err) {
      message.error('Failed to fetch houses');
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/managehouses/stats`);
      setStats(res.data);
    } catch (err) {
      message.error('Failed to fetch statistics');
    }
  };

  const loadData = async (page = pagination.current, pageSize = pagination.pageSize) => {
    setLoading(true);
    await Promise.all([
      fetchHouses(page, pageSize, searchText, approvalStatusFilter),
      fetchStats()
    ]);
    setLoading(false);
  };

  

  useEffect(() => {
    loadData(1);
  }, [searchText, approvalStatusFilter]);

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
    fetchHouses(newPagination.current, newPagination.pageSize, searchText, approvalStatusFilter);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/managehouses/${id}`);
      message.success('House deleted');
      loadData();
    } catch (err) {
      message.error('Failed to delete house');
    }
  };

  const handleApprovalStatusChange = async (id, newApprovalStatus) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/admin/managehouses/${id}/approval_status`, { approval_status: newApprovalStatus });
      message.success(`Approval status updated to ${newApprovalStatus}`);
      loadData();
    } catch (err) {
      message.error('Failed to update approval status');
    }
  };

  const approvalStatusColors = {
    Available: 'green',
    Pending: 'orange',
    Rejected: 'red'
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`/admin/houses/${record.id}`}>{text}</Link>
      )
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Approval Status',
      dataIndex: 'approval_status',
      key: 'approval_status',
      render: (approval_status) => (
        <Tag color={approvalStatusColors[approval_status] || 'gray'}>{approval_status}</Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type={record.approval_status === 'approved' ? 'primary' : 'default'}
            icon={<CheckOutlined />}
            onClick={() => handleApprove(record.id)}
            disabled={record.approval_status === 'approved'}
          >
            Approve
          </Button>
          <Button
            danger={record.approval_status === 'Rejected'}
            icon={<CloseOutlined />}
            onClick={() => handleReject(record.id)}
            disabled={record.approval_status === 'Rejected'}
          >
            Reject
          </Button>
          {/* <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/houses/edit/${record.id}`)}
          /> */}
          <Button
        icon={<EditOutlined />}
        onClick={() => {
          // Determine the edit route based on item type
          const editRoute = record.type === 'car' 
            ? `/edit-car/${record.id}`
            : `/edit-house/${record.id}`;
          navigate(editRoute);
        }}
      />
          <Popconfirm
            title="Are you sure to delete this house?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Title level={2}>House Management</Title>
        <Link to="/admin/houses/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Add New House
          </Button>
        </Link>
      </div>

      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Houses" value={stats.total} prefix={<HomeOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Available" value={stats.available} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Pending" value={stats.pending} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#faad14' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic title="Rejected" value={stats.rejected} prefix={<CloseCircleOutlined />} valueStyle={{ color: '#cf1322' }} />
          </Card>
        </Col>
      </Row>

      <Card
        title="All Houses"
        extra={
          <Space>
            
            <Search
              placeholder="Search houses"
              allowClear
              enterButton={<SearchOutlined />}
              onSearch={(value) => {
                setPagination(prev => ({ ...prev, current: 1 }));
                setSearchText(value);
              }}
              style={{ width: 250 }}
            />
            <Button icon={<SyncOutlined />} onClick={() => loadData()} />
          </Space>
        }
      >
        <Table
          columns={columns}
          dataSource={houses}
          rowKey="id"
          pagination={pagination}
          loading={loading}
          onChange={handleTableChange}
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default ManageHouses;