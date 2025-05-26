import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Form, Input, Button, Select, Switch,
  message, Card, Spin, Row, Col
} from 'antd';
import {
  UserOutlined, MailOutlined, PhoneOutlined,
  LockOutlined, SafetyOutlined
} from '@ant-design/icons';
import './ManageUsers.css';

const { Option } = Select;
const { TextArea } = Input;

const UserForm = () => {
  const [form] = Form.useForm();
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (userId && userId !== 'add') {
      setIsEditMode(true);
      fetchUser();
    }
  }, [userId]);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/admin/users/${userId}`);
      form.setFieldsValue({
        ...res.data,
        isActive: res.data.status === 'active'
      });
    } catch (err) {
      message.error('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const userData = {
        ...values,
        status: values.isActive ? 'active' : 'inactive'
      };
      
      if (isEditMode) {
        await axios.put(`/api/admin/users/${userId}`, userData);
        message.success('User updated successfully');
      } else {
        await axios.post('/api/admin/users', userData);
        message.success('User created successfully');
        navigate('/admin/users');
      }
    } catch (err) {
      message.error(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      await axios.post(`/api/admin/users/${userId}/reset-password`);
      message.success('Password reset link sent to user');
    } catch (err) {
      message.error('Failed to reset password');
    }
  };

  return (
    <div className="admin-container">
      <Card
        title={
          <span>
            {isEditMode ? (
              <>
                <UserOutlined /> Edit User
              </>
            ) : (
              <>
                <UserOutlined /> Add New User
              </>
            )}
          </span>
        }
      >
        <Spin spinning={loading}>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              role: 'customer',
              isActive: true
            }}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: 'Please input name' }]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please input email' },
                    { type: 'email', message: 'Invalid email' }
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                >
                  <Input prefix={<PhoneOutlined />} placeholder="Phone" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="role"
                  label="Role"
                  rules={[{ required: true }]}
                >
                  <Select placeholder="Select role">
                    <Option value="admin">Admin</Option>
                    <Option value="agent">Agent</Option>
                    <Option value="customer">Customer</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {!isEditMode && (
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                      { required: true, message: 'Please input password' },
                      { min: 6, message: 'Minimum 6 characters' }
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: 'Please confirm password' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject('Passwords do not match');
                        }
                      })
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" />
                  </Form.Item>
                </Col>
              </Row>
            )}

            <Form.Item
              name="address"
              label="Address"
            >
              <TextArea rows={2} placeholder="Address" />
            </Form.Item>

            <Form.Item
              name="isActive"
              label="Status"
              valuePropName="checked"
            >
              <Switch
                checkedChildren="Active"
                unCheckedChildren="Inactive"
              />
            </Form.Item>

            {isEditMode && (
              <Form.Item>
                <Button
                  type="dashed"
                  icon={<SafetyOutlined />}
                  onClick={handleResetPassword}
                >
                  Reset Password
                </Button>
              </Form.Item>
            )}

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                {isEditMode ? 'Update User' : 'Create User'}
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={() => navigate('/admin/users')}>
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default UserForm;
