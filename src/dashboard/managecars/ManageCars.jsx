// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
// import {
//   Table, Button, Space, Tag, Badge,
//   Popconfirm, message, Card, Row, Col,
//   Statistic, Typography, Input
// } from 'antd';
// import {
//   CarOutlined, PlusOutlined, EditOutlined,
//   DeleteOutlined, SearchOutlined, SyncOutlined,
//   CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined
// } from '@ant-design/icons';
// import { Link, useNavigate } from 'react-router-dom';

// const { Title } = Typography;
// const { Search } = Input;

// const ManageCars = () => {
//   const [cars, setCars] = useState([]);
//   const [stats, setStats] = useState({ total: 0, available: 0, pending: 0, rejected: 0 });
//   const [loading, setLoading] = useState(false);
//   const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
//   const [searchText, setSearchText] = useState('');
//   const [approvalStatusFilter, setApprovalStatusFilter] = useState('');
//   const navigate = useNavigate();

//   const fetchCars = async (page = 1, pageSize = 10, search = '', approvalStatus = '') => {
//     try {
//       const res = await axios.get('${process.env.REACT_APP_API_URL}/api/admin/managecars', {
//         params: {
//           page,
//           limit: pageSize,
//           search,
//           approval_status: approvalStatus
//         }
//       });
//       setCars(res.data.data);
//       setPagination(prev => ({
//         ...prev,
//         current: page,
//         pageSize,
//         total: res.data.total
//       }));
//     } catch (err) {
//       message.error('Failed to fetch cars');
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const res = await axios.get('${process.env.REACT_APP_API_URL}/api/admin/managecars/stats');
//       setStats(res.data);
//     } catch (err) {
//       message.error('Failed to fetch statistics');
//     }
//   };

//   const loadData = async (page = pagination.current, pageSize = pagination.pageSize) => {
//     setLoading(true);
//     await Promise.all([
//       fetchCars(page, pageSize, searchText, approvalStatusFilter),
//       fetchStats()
//     ]);
//     setLoading(false);
//   };

//   useEffect(() => {
//     loadData(1);
//   }, [searchText, approvalStatusFilter]);

//   const handleApprove = async (id) => {
//     try {
//       await axios.patch(`${process.env.REACT_APP_API_URL}/api/admin/managecars/${id}/approve`);
//       message.success('Car approved successfully');
//       loadData();
//     } catch (err) {
//       message.error('Failed to approve car');
//     }
//   };

//   const handleReject = async (id) => {
//     try {
//       await axios.patch(`${process.env.REACT_APP_API_URL}/api/admin/managecars/${id}/reject`);
//       message.success('Car rejected successfully');
//       loadData();
//     } catch (err) {
//       message.error('Failed to reject car');
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/managecars/${id}`);
//       message.success('Car deleted');
//       loadData();
//     } catch (err) {
//       message.error('Failed to delete car');
//     }
//   };

//   const approvalStatusColors = {
//     Available: 'green',
//     Pending: 'orange',
//     Rejected: 'red'
//   };

//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//       width: 80
//     },
//     {
//       title: 'Title',
//       dataIndex: 'title',
//       key: 'title',
//       render: (text, record) => (
//         <Link to={`/admin/cars/${record.id}`}>{text}</Link>
//       )
//     },
//     {
//       title: 'Brand',
//       dataIndex: 'brand',
//       key: 'brand'
//     },
//     {
//       title: 'Approval Status',
//       dataIndex: 'approval_status',
//       key: 'approval_status',
//       render: (approval_status) => (
//         <Tag color={approvalStatusColors[approval_status] || 'gray'}>
//           {approval_status}
//         </Tag>
//       )
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       render: (_, record) => (
//         <Space>
//           <Button
//             type={record.approval_status === 'approved' ? 'primary' : 'default'}
//             icon={<CheckOutlined />}
//             onClick={() => handleApprove(record.id)}
//             disabled={record.approval_status === 'approved'}
//           >
//             Approve
//           </Button>
//           <Button
//             danger={record.approval_status === 'Rejected'}
//             icon={<CloseOutlined />}
//             onClick={() => handleReject(record.id)}
//             disabled={record.approval_status === 'Rejected'}
//           >
//             Reject
//           </Button>
//           <Button
//             icon={<EditOutlined />}
//             onClick={() => navigate(`/edit-car/${record.id}`)}
//           />
//           <Popconfirm
//             title="Are you sure to delete this car?"
//             onConfirm={() => handleDelete(record.id)}
//           >
//             <Button icon={<DeleteOutlined />} danger />
//           </Popconfirm>
//         </Space>
//       )
//     }
//   ];

//   const handleTableChange = (newPagination) => {
//     setPagination(newPagination);
//     fetchCars(newPagination.current, newPagination.pageSize, searchText, approvalStatusFilter);
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
//         <Title level={2}>Car Management</Title>
//         <Link to="/admin/cars/add">
//           <Button type="primary" icon={<PlusOutlined />}>
//             Add New Car
//           </Button>
//         </Link>
//       </div>

//       <Row gutter={16} style={{ marginBottom: 20 }}>
//         <Col span={6}>
//           <Card>
//             <Statistic title="Total Cars" value={stats.total} prefix={<CarOutlined />} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card>
//             <Statistic title="Available" value={stats.available} prefix={<CheckCircleOutlined />} valueStyle={{ color: '#3f8600' }} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card>
//             <Statistic title="Pending" value={stats.pending} prefix={<ClockCircleOutlined />} valueStyle={{ color: '#faad14' }} />
//           </Card>
//         </Col>
//         <Col span={6}>
//           <Card>
//             <Statistic title="Rejected" value={stats.rejected} prefix={<CloseCircleOutlined />} valueStyle={{ color: '#cf1322' }} />
//           </Card>
//         </Col>
//       </Row>

//       <Card
//         title="All Cars"
//         extra={
//           <Space>
//             <Search
//               placeholder="Search cars"
//               allowClear
//               enterButton={<SearchOutlined />}
//               onSearch={(value) => {
//                 setPagination(prev => ({ ...prev, current: 1 }));
//                 setSearchText(value);
//               }}
//               style={{ width: 250 }}
//             />
//             <Button icon={<SyncOutlined />} onClick={() => loadData()} />
//           </Space>
//         }
//       >
//         <Table
//           columns={columns}
//           dataSource={cars}
//           rowKey="id"
//           pagination={pagination}
//           loading={loading}
//           onChange={handleTableChange}
//           scroll={{ x: true }}
//         />
//       </Card>
//     </div>
//   );
// };

// export default ManageCars;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CheckOutlined, CloseOutlined, CarOutlined, PlusOutlined,
  EditOutlined, DeleteOutlined, SearchOutlined, SyncOutlined,
  CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined
} from '@ant-design/icons';
import {
  Table, Button, Space, Tag, Popconfirm, message, Card, Row, Col,
  Statistic, Typography, Input
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;
const { Search } = Input;

const ManageCars = () => {
  const [cars, setCars] = useState([]);
  const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0, rejected: 0 });
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
  const [searchText, setSearchText] = useState('');
  const [approvalStatusFilter, setApprovalStatusFilter] = useState('');
  const navigate = useNavigate();

  const fetchCars = async (page = 1, pageSize = 10, search = '', approvalStatus = '') => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/managecars`, {
        params: { page, limit: pageSize, search, approval_status: approvalStatus }
      });
      setCars(res.data.data);
      setPagination(prev => ({
        ...prev,
        current: page,
        pageSize,
        total: res.data.total
      }));
    } catch {
      message.error('Failed to fetch cars');
    }
  };

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin/managecars/stats`);
      setStats(res.data);
    } catch {
      message.error('Failed to fetch statistics');
    }
  };

  const loadData = async (page = pagination.current, pageSize = pagination.pageSize) => {
    setLoading(true);
    await Promise.all([
      fetchCars(page, pageSize, searchText, approvalStatusFilter),
      fetchStats()
    ]);
    setLoading(false);
  };

  useEffect(() => {
    loadData(1, pagination.pageSize);
  }, [searchText, approvalStatusFilter]);

  const handleApprove = async (id) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/admin/managecars/${id}/approve`);
      message.success('Car approved successfully');
      loadData();
    } catch {
      message.error('Failed to approve car');
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/api/admin/managecars/${id}/reject`);
      message.success('Car rejected successfully');
      loadData();
    } catch {
      message.error('Failed to reject car');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/admin/managecars/${id}`);
      message.success('Car deleted');
      loadData();
    } catch {
      message.error('Failed to delete car');
    }
  };

  const approvalStatusColors = {
    Approved: 'green',
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
        <Link to={`/admin/cars/${record.id}`}>{text}</Link>
      )
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand'
    },
    {
      title: 'Approval Status',
      dataIndex: 'approval_status',
      key: 'approval_status',
      render: (status) => (
        <Tag color={approvalStatusColors[status] || 'gray'}>{status}</Tag>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type={record.approval_status === 'Approved' ? 'primary' : 'default'}
            icon={<CheckOutlined />}
            onClick={() => handleApprove(record.id)}
            disabled={record.approval_status === 'Approved'}
          >
            Approve
          </Button>
          <Button
            danger
            icon={<CloseOutlined />}
            onClick={() => handleReject(record.id)}
            disabled={record.approval_status === 'Rejected'}
          >
            Reject
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/edit-car/${record.id}`)}
          />
          <Popconfirm
            title="Are you sure to delete this car?"
            onConfirm={() => handleDelete(record.id)}
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </Space>
      )
    }
  ];

  const handleTableChange = (newPagination) => {
    setPagination(newPagination);
    fetchCars(newPagination.current, newPagination.pageSize, searchText, approvalStatusFilter);
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Title level={2}>Car Management</Title>
        <Link to="/admin/cars/add">
          <Button type="primary" icon={<PlusOutlined />}>
            Add New Car
          </Button>
        </Link>
      </div>

      <Row gutter={16} style={{ marginBottom: 20 }}>
        <Col span={6}>
          <Card>
            <Statistic title="Total Cars" value={stats.total} prefix={<CarOutlined />} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Approved" 
              value={stats.approved} 
              prefix={<CheckCircleOutlined />} 
              valueStyle={{ color: '#3f8600' }} 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Pending" 
              value={stats.pending} 
              prefix={<ClockCircleOutlined />} 
              valueStyle={{ color: '#faad14' }} 
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic 
              title="Rejected" 
              value={stats.rejected} 
              prefix={<CloseCircleOutlined />} 
              valueStyle={{ color: '#cf1322' }} 
            />
          </Card>
        </Col>
      </Row>

      <Card
        title="All Cars"
        extra={
          <Space>
            <Search
              placeholder="Search cars"
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
          dataSource={cars}
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

export default ManageCars;