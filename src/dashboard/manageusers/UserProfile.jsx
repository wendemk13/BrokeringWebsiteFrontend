// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, Link } from 'react-router-dom';
// import {
//   Card, Descriptions, Table, Tabs, Tag,
//   Spin, Button, Badge, Timeline
// } from 'antd';
// import {
//   UserOutlined, MailOutlined, PhoneOutlined,
//   HomeOutlined, CarOutlined, CreditCardOutlined,
//   HistoryOutlined, SafetyOutlined
// } from '@ant-design/icons';
// import './ManageUsers.css';

// const { TabPane } = Tabs;

// const UserProfile = () => {
//   const { userId } = useParams();
//   const [user, setUser] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [transactions, setTransactions] = useState([]);
//   const [activity, setActivity] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [userRes, bookingsRes, transactionsRes, activityRes] = await Promise.all([
//           axios.get(`/api/admin/users/${userId}`),
//           axios.get(`/api/admin/users/${userId}/bookings`),
//           axios.get(`/api/admin/users/${userId}/transactions`),
//           axios.get(`/api/admin/users/${userId}/activity`)
//         ]);
        
//         setUser(userRes.data);
//         setBookings(bookingsRes.data);
//         setTransactions(transactionsRes.data);
//         setActivity(activityRes.data);
//       } catch (err) {
//         console.error('Failed to fetch user data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [userId]);

//   const bookingColumns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id'
//     },
//     {
//       title: 'Type',
//       dataIndex: 'type',
//       key: 'type',
//       render: type => (
//         <Tag color={type === 'house' ? 'blue' : 'green'}>
//           {type === 'house' ? <HomeOutlined /> : <CarOutlined />}
//           {type.toUpperCase()}
//         </Tag>
//       )
//     },
//     {
//       title: 'Item',
//       dataIndex: 'itemName',
//       key: 'itemName'
//     },
//     {
//       title: 'Dates',
//       dataIndex: 'dates',
//       key: 'dates',
//       render: (_, record) => `${record.startDate} to ${record.endDate}`
//     },
//     {
//       title: 'Amount',
//       dataIndex: 'amount',
//       key: 'amount',
//       render: amount => `$${amount}`
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: status => {
//         const statusMap = {
//           completed: { color: 'green', text: 'Completed' },
//           active: { color: 'blue', text: 'Active' },
//           cancelled: { color: 'red', text: 'Cancelled' }
//         };
//         return <Tag color={statusMap[status]?.color}>{statusMap[status]?.text}</Tag>;
//       }
//     }
//   ];

//   const transactionColumns = [
//     {
//       title: 'ID',
//       dataIndex: 'id',
//       key: 'id'
//     },
//     {
//       title: 'Date',
//       dataIndex: 'date',
//       key: 'date'
//     },
//     {
//       title: 'Amount',
//       dataIndex: 'amount',
//       key: 'amount',
//       render: amount => `$${amount}`
//     },
//     {
//       title: 'Method',
//       dataIndex: 'method',
//       key: 'method'
//     },
//     {
//       title: 'Status',
//       dataIndex: 'status',
//       key: 'status',
//       render: status => {
//         const statusMap = {
//           success: { color: 'green', text: 'Success' },
//           pending: { color: 'orange', text: 'Pending' },
//           failed: { color: 'red', text: 'Failed' }
//         };
//         return <Tag color={statusMap[status]?.color}>{statusMap[status]?.text}</Tag>;
//       }
//     }
//   ];

//   if (loading) return <Spin size="large" className="loading-spinner" />;
//   if (!user) return <div>User not found</div>;

//   return (
//     <div className="admin-container">
//       <div className="profile-header">
//         <h1>
//           <UserOutlined /> User Profile
//         </h1>
//         <div>
//           <Link to={`/admin/users/edit/${userId}`}>
//             <Button type="primary">Edit Profile</Button>
//           </Link>
//           <Link to={`/admin/users/ban/${userId}`} style={{ marginLeft: 8 }}>
//             <Button danger>
//               {user.status === 'banned' ? 'Unban User' : 'Ban User'}
//             </Button>
//           </Link>
//         </div>
//       </div>

//       <Card className="profile-card">
//         <Descriptions bordered column={2}>
//           <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
//           <Descriptions.Item label="Status">
//             <Badge 
//               status={user.status === 'active' ? 'success' : 'error'} 
//               text={user.status.toUpperCase()} 
//             />
//           </Descriptions.Item>
//           <Descriptions.Item label="Email">
//             <MailOutlined /> {user.email}
//           </Descriptions.Item>
//           <Descriptions.Item label="Phone">
//             <PhoneOutlined /> {user.phone || 'N/A'}
//           </Descriptions.Item>
//           <Descriptions.Item label="Role">
//             <Tag color={user.role === 'admin' ? 'red' : 'blue'}>{user.role.toUpperCase()}</Tag>
//           </Descriptions.Item>
//           <Descriptions.Item label="Joined">
//             {new Date(user.createdAt).toLocaleDateString()}
//           </Descriptions.Item>
//           <Descriptions.Item label="Last Login">
//             {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'Never'}
//           </Descriptions.Item>
//           {user.address && (
//             <Descriptions.Item label="Address" span={2}>
//               <HomeOutlined /> {user.address}
//             </Descriptions.Item>
//           )}
//         </Descriptions>
//       </Card>

//       <Tabs defaultActiveKey="1" className="profile-tabs">
//         <TabPane tab={<span><HomeOutlined /> House Bookings</span>} key="1">
//           <Table
//             columns={bookingColumns}
//             dataSource={bookings.filter(b => b.type === 'house')}
//             rowKey="id"
//             pagination={{ pageSize: 5 }}
//           />
//         </TabPane>
//         <TabPane tab={<span><CarOutlined /> Car Bookings</span>} key="2">
//           <Table
//             columns={bookingColumns}
//             dataSource={bookings.filter(b => b.type === 'car')}
//             rowKey="id"
//             pagination={{ pageSize: 5 }}
//           />
//         </TabPane>
//         <TabPane tab={<span><CreditCardOutlined /> Transactions</span>} key="3">
//           <Table
//             columns={transactionColumns}
//             dataSource={transactions}
//             rowKey="id"
//             pagination={{ pageSize: 5 }}
//           />
//         </TabPane>
//         <TabPane tab={<span><HistoryOutlined /> Activity</span>} key="4">
//           <Timeline mode="left" className="activity-timeline">
//             {activity.map((item, index) => (
//               <Timeline.Item key={index} label={new Date(item.timestamp).toLocaleString()}>
//                 <strong>{item.action}</strong>
//                 <p>{item.details}</p>
//               </Timeline.Item>
//             ))}
//           </Timeline>
//         </TabPane>
//       </Tabs>
//     </div>
//   );
// };

// export default UserProfile;
import React from 'react'

function UserProfile() {
  return (
    <div>
      UserProfile
      UserProfile
      UserProfile
UserProfile
UserProfile
UserProfile
UserProfile
UserProfile
UserProfile
UserProfile
    </div>
  )
}

export default UserProfile
