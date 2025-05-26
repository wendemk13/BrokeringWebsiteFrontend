

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import {
//   Table, Input, Button, Space, Tag,
//   Popconfirm, message, Badge, Select,
//   Card, Row, Col, Statistic, Spin
// } from 'antd';
// import {
//   SearchOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   SyncOutlined,
//   StopOutlined,
//   CheckCircleOutlined,
//   UserOutlined,
//   ClockCircleOutlined,
//   ExclamationCircleOutlined
// } from '@ant-design/icons';
// import { Link, useNavigate } from 'react-router-dom';
// import './ManageUsers.css';

// // Constants
// const API_BASE_URL = process.env.REACT_APP_API_URL || '${process.env.REACT_APP_API_URL}';
// const DEFAULT_PAGE_SIZE = 10;
// const STATUS_FILTERS = [
//   { text: 'Active', value: true },
//   { text: 'Inactive', value: false }
// ];
// const ROLE_FILTERS = [
//   { text: 'Admin', value: 'admin' },
//   { text: 'Agent', value: 'agent' },
//   { text: 'User', value: 'user' }
// ];

// const UserList = () => {
//   // State management
//   const [state, setState] = useState({
//     users: [],
//     stats: null,
//     loading: false,
//     error: null,
//     pagination: {
//       current: 1,
//       pageSize: DEFAULT_PAGE_SIZE,
//       total: 0,
//       showSizeChanger: true,
//       pageSizeOptions: ['10', '20', '50', '100']
//     },
//     filters: {
//       role: undefined,
//       is_active: undefined,
//       search: ''
//     }
//   });

//   const navigate = useNavigate();

//   // Helper function to update nested state
//   const updateState = (updates) => {
//     setState(prev => ({ ...prev, ...updates }));
//   };
//   const { Search } = Input;

//   // API error handler
//   const handleApiError = (error, defaultMessage = 'Operation failed') => {
//     console.error('API Error:', error);
//     const errorMessage = error.response?.data?.message || error.message || defaultMessage;
//     updateState({ error: errorMessage });
//     message.error(errorMessage);
//     return errorMessage;
//   };

//   // Fetch users and stats
//   const fetchData = async () => {
//     try {
//       updateState({ loading: true, error: null });
      
//       const { pagination, filters } = state;
//       const params = {
//         page: pagination.current,
//         limit: pagination.pageSize,
//         ...filters
//       };

//       const [usersRes, statsRes] = await Promise.all([
//         axios.get(`${API_BASE_URL}/api/admin/users`, { params }),
//         axios.get(`${API_BASE_URL}/api/admin/users/stats`)
//       ]);

//       updateState({
//         users: usersRes.data.data,
//         stats: statsRes.data,
//         pagination: {
//           ...pagination,
//           total: usersRes.data.total
//         }
//       });
//     } catch (err) {
//       handleApiError(err, 'Failed to fetch data');
//     } finally {
//       updateState({ loading: false });
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [state.pagination.current, state.pagination.pageSize, state.filters]);

//   // Event handlers
//   // const handleTableChange = (newPagination, newFilters) => {
//   //   updateState({
//   //     pagination: { ...state.pagination, ...newPagination },
//   //     filters: {
//   //       ...state.filters,
//   //       role: newFilters.role?.[0],
//   //       is_active: newFilters.is_active?.[0]
//   //     }
//   //   });
//   // };
//   const handleTableChange = (pagination, filters, sorter) => {
//     updateState({
//       pagination: { 
//         ...state.pagination, 
//         current: pagination.current,
//         pageSize: pagination.pageSize
//       },
//       filters: {
//         ...state.filters,
//         role: filters.role?.[0],
//         is_active: filters.is_active?.[0]
//       }
//     });
//   };
  
//   const handleSearch = (value) => {
//     updateState({
//       filters: { ...state.filters, search: value },
//       pagination: { ...state.pagination, current: 1 }
//     });
//   };

//   const handleStatusChange = async (userId, currentStatus) => {
//     try {
//       updateState({ loading: true });
//       const newStatus = !currentStatus;
//       await axios.patch(
//         `${API_BASE_URL}/api/admin/users/${userId}/status`, 
//         { is_active: newStatus },
//         { headers: { 'Content-Type': 'application/json' } }
//       );
//       message.success(`User ${newStatus ? 'activated' : 'deactivated'} successfully`);
//       fetchData();
//     } catch (err) {
//       handleApiError(err, 'Failed to update user status');
//     }
//   };

//   const handleDelete = async (userId) => {
//     try {
//       updateState({ loading: true });
//       await axios.delete(`${API_BASE_URL}/api/admin/users/${userId}`);
//       message.success('User deleted successfully');
//       fetchData();
//     } catch (err) {
//       handleApiError(err, 'Failed to delete user');
//     }
//   };

//   // Table columns configuration
//   const columns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id',
//       width: 80,
//       sorter: true,
//       fixed: 'left'
//     },
//     {
//       title: 'Username',
//       dataIndex: 'username',
//       key: 'username',
//       render: (text) => <span className="username-cell">{text}</span>,
//       ellipsis: true
//     },
//     {
//       title: 'Name',
//       key: 'name',
//       render: (_, record) => `${record.first_name} ${record.last_name}`,
//       ellipsis: true
//     },
//     {
//       title: 'Email',
//       dataIndex: 'email',
//       key: 'email',
//       ellipsis: true
//     },
//     {
//       title: 'Role',
//       dataIndex: 'role',
//       key: 'role',
//       render: (role) => (
//         <Tag color={role === 'admin' ? 'volcano' : role === 'agent' ? 'geekblue' : 'green'}>
//           {role.toUpperCase()}
//         </Tag>
//       ),
//       filters: ROLE_FILTERS,
//       filterMultiple: false
//     },
//     {
//       title: 'Status',
//       dataIndex: 'is_active',
//       key: 'status',
//       render: (isActive) => (
//         <Badge 
//           status={isActive ? 'success' : 'error'} 
//           text={isActive ? 'ACTIVE' : 'INACTIVE'} 
//         />
//       ),
//       filters: STATUS_FILTERS,
//       filterMultiple: false
//     },
//     {
//       title: 'Joined',
//       dataIndex: 'created_at',
//       key: 'created_at',
//       render: (date) => new Date(date).toLocaleDateString(),
//       sorter: true
//     },
//     {
//       title: 'Actions',
//       key: 'actions',
//       fixed: 'right',
//       width: 200,
//       render: (_, record) => (
//         <Space size="middle">
//           <Button 
//             type={record.is_active ? 'default' : 'primary'} 
//             size="small"
//             danger={record.is_active}
//             icon={record.is_active ? <StopOutlined /> : <CheckCircleOutlined />}
//             onClick={() => handleStatusChange(record.id, record.is_active)}
//             disabled={state.loading}
//           >
//             {record.is_active ? 'Deactivate' : 'Activate'}
//           </Button>
//           <Button 
//             icon={<EditOutlined />} 
//             size="small"
//             onClick={() => navigate(`/admin/users/edit/${record.id}`)}
//             disabled={state.loading}
//           />
//           <Popconfirm
//             title="Are you sure to delete this user?"
//             onConfirm={() => handleDelete(record.id)}
//             okText="Yes"
//             cancelText="No"
//             icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
//             disabled={state.loading}
//           >
//             <Button 
//               icon={<DeleteOutlined />} 
//               size="small" 
//               danger 
//               disabled={state.loading}
//             />
//           </Popconfirm>
//         </Space>
//       )
//     }
//   ];

//   // Render loading state
//   if (state.loading && !state.users.length) {
//     return (
//       <div className="loading-container">
//         <Spin size="large" />
//       </div>
//     );
//   }

//   // Render error state
//   if (state.error && !state.users.length) {
//     return (
//       <div className="error-container">
//         <Card>
//           <div className="error-message">
//             <ExclamationCircleOutlined style={{ color: 'red', fontSize: '24px' }} />
//             <h3>Failed to load data</h3>
//             <p>{state.error}</p>
//             <Button type="primary" onClick={fetchData}>Retry</Button>
//           </div>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-container">
//       <div className="table-header">
//         <h1>User Management</h1>
//         <Link to="/admin/users/add">
//           <Button type="primary" icon={<UserOutlined />}>Add New User</Button>
//         </Link>
//       </div>

//       {state.stats && (
//         <Row gutter={[16, 16]} className="stats-row">
//           <Col xs={24} sm={12} md={6}>
//             <Card hoverable>
//               <Statistic
//                 title="Total Users"
//                 value={state.stats.totalUsers}
//                 prefix={<UserOutlined />}
//                 loading={state.loading}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={12} md={6}>
//             <Card hoverable>
//               <Statistic
//                 title="Active Users"
//                 value={state.stats.activeUsers}
//                 prefix={<CheckCircleOutlined />}
//                 loading={state.loading}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={12} md={6}>
//             <Card hoverable>
//               <Statistic
//                 title="Inactive Users"
//                 value={state.stats.inactiveUsers}
//                 prefix={<StopOutlined />}
//                 loading={state.loading}
//               />
//             </Card>
//           </Col>
//           <Col xs={24} sm={12} md={6}>
//             <Card hoverable>
//               <Statistic
//                 title="New Today"
//                 value={state.stats.newToday}
//                 prefix={<ClockCircleOutlined />}
//                 loading={state.loading}
//               />
//             </Card>
//           </Col>
//         </Row>
//       )}

//       <Card
//         className="table-card"
//         title="User List"
//         extra={
//           <Space wrap>
//              <Search
//               placeholder="Search users"
//               allowClear
//               enterButton={<SearchOutlined />}
//               size="middle"
//               onSearch={handleSearch}
//               style={{ width: 250 }}
//               disabled={state.loading}
//             /> 
//             <Button 
//               icon={<SyncOutlined />} 
//               onClick={fetchData}
//               loading={state.loading}
//               disabled={state.loading}
//             >
//               Refresh
//             </Button>
//           </Space>
//         }
//       >
//         <Table
//           columns={columns}
//           dataSource={state.users}
//           rowKey="id"
//           pagination={state.pagination}
//           loading={state.loading}
//           onChange={handleTableChange}
//           scroll={{ x: 1300 }}
//           bordered
//           size="middle"
//           locale={{
//             emptyText: state.error ? 'Error loading data' : 'No users found'
//           }}
//         />
//       </Card>
//     </div>
//   );
// };

// export default UserList;

import React from 'react'

function UserList() {
  return (
    <div>
      UserList
      UserList
      UserList
      UserList
      UserList
      UserList
      UserList
    </div>
  )
}

export default UserList
