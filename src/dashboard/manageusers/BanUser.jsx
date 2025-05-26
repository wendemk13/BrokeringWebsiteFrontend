// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import {
//   Form, Input, Button, Select, DatePicker,
//   message, Card, Spin, Descriptions, Switch,Tag
// } from 'antd';
// import {
//   StopOutlined, UserOutlined, MailOutlined,
//   ClockCircleOutlined, WarningOutlined
// } from '@ant-design/icons';
// import moment from 'moment';
// import './ManageUsers.css';

// const { Option } = Select;
// const { TextArea } = Input;

// const BanUser = () => {
//   const [form] = Form.useForm();
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [user, setUser] = useState(null);
//   const [isBan, setIsBan] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(`/api/admin/users/${userId}`);
//         setUser(res.data);
//         setIsBan(res.data.status !== 'banned');
//         form.setFieldsValue({
//           action: isBan ? 'ban' : 'unban'
//         });
//       } catch (err) {
//         message.error('Failed to fetch user data');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, [userId]);

//   const onFinish = async (values) => {
//     setLoading(true);
//     try {
//       const actionData = {
//         ...values,
//         expiresAt: values.permanent ? null : values.expiresAt?.toISOString()
//       };
      
//       await axios.post(`/api/admin/users/${userId}/ban`, actionData);
//       message.success(`User ${isBan ? 'banned' : 'unbanned'} successfully`);
//       navigate(`/admin/users/${userId}`);
//     } catch (err) {
//       message.error(err.response?.data?.message || 'Operation failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!user) return <Spin size="large" className="loading-spinner" />;

//   return (
//     <div className="admin-container">
//       <Card
//         title={
//           <span>
//             <WarningOutlined /> {isBan ? 'Ban User' : 'Unban User'}
//           </span>
//         }
//       >
//         <Spin spinning={loading}>
//           <Descriptions bordered column={1} className="user-info">
//             <Descriptions.Item label="Name">
//               <UserOutlined /> {user.name}
//             </Descriptions.Item>
//             <Descriptions.Item label="Email">
//               <MailOutlined /> {user.email}
//             </Descriptions.Item>
//             <Descriptions.Item label="Current Status">
//               <Tag color={user.status === 'banned' ? 'red' : 'green'}>
//                 {user.status.toUpperCase()}
//               </Tag>
//             </Descriptions.Item>
//             {user.bannedUntil && (
//               <Descriptions.Item label="Ban Expires">
//                 <ClockCircleOutlined /> {moment(user.bannedUntil).format('LLL')}
//               </Descriptions.Item>
//             )}
//           </Descriptions>

//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={onFinish}
//             className="ban-form"
//             initialValues={{
//               action: isBan ? 'ban' : 'unban',
//               notifyUser: true,
//               permanent: false
//             }}
//           >
//             {isBan ? (
//               <>
//                 <Form.Item
//                   name="reason"
//                   label="Reason for Ban"
//                   rules={[{ required: true, message: 'Please specify reason' }]}
//                 >
//                   <Select placeholder="Select reason">
//                     <Option value="spam">Spam/Advertising</Option>
//                     <Option value="abuse">Abusive Behavior</Option>
//                     <Option value="fraud">Fraudulent Activity</Option>
//                     <Option value="other">Other</Option>
//                   </Select>
//                 </Form.Item>

//                 <Form.Item
//                   name="details"
//                   label="Additional Details"
//                 >
//                   <TextArea rows={3} placeholder="Provide additional details if needed" />
//                 </Form.Item>

//                 <Form.Item
//                   name="permanent"
//                   label="Duration"
//                   valuePropName="checked"
//                 >
//                   <Switch
//                     checkedChildren="Permanent"
//                     unCheckedChildren="Temporary"
//                   />
//                 </Form.Item>

//                 <Form.Item
//                   noStyle
//                   shouldUpdate={(prevValues, currentValues) => prevValues.permanent !== currentValues.permanent}
//                 >
//                   {({ getFieldValue }) => (
//                     !getFieldValue('permanent') && (
//                       <Form.Item
//                         name="expiresAt"
//                         label="Ban Until"
//                         rules={[{ required: true, message: 'Please select date' }]}
//                       >
//                         <DatePicker
//                           style={{ width: '100%' }}
//                           disabledDate={current => current && current < moment().endOf('day')}
//                           showTime
//                         />
//                       </Form.Item>
//                     )
//                   )}
//                 </Form.Item>
//               </>
//             ) : (
//               <Form.Item
//                 name="reason"
//                 label="Reason for Unban"
//               >
//                 <TextArea rows={3} placeholder="Explain why you're unbanning this user" />
//               </Form.Item>
//             )}

//             <Form.Item
//               name="notifyUser"
//               label="Notification"
//               valuePropName="checked"
//             >
//               <Switch
//                 checkedChildren="Notify User"
//                 unCheckedChildren="Don't Notify"
//                 defaultChecked
//               />
//             </Form.Item>

//             <Form.Item>
//               <Button
//                 type="primary"
//                 htmlType="submit"
//                 danger={isBan}
//                 icon={<StopOutlined />}
//                 loading={loading}
//               >
//                 {isBan ? 'Confirm Ban' : 'Confirm Unban'}
//               </Button>
//               <Button
//                 style={{ marginLeft: 8 }}
//                 onClick={() => navigate(`/admin/users/${userId}`)}
//               >
//                 Cancel
//               </Button>
//             </Form.Item>
//           </Form>
//         </Spin>
//       </Card>
//     </div>
//   );
// };

// export default BanUser;


import React from 'react'

function BanUser() {
  return (
    <div>BanUser
BanUserBanUser
BanUserBanUser
BanUserBanUser
BanUserBanUser
BanUserBanUser
BanUserBanUser
BanUserBanUser
BanUserBanUser
BanUser
      
    </div>
  )
}

export default BanUser
