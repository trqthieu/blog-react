import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Divider,
  notification,
  Space,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { changeMyPassword, clearError } from 'src/redux/authSlice';

const PasswordModal = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type,message) => {
    if (type === 'success') {
      api.success({
        message: message,
        placement: 'topRight',
      });
    } else {
      api.error({
        message: message,
        placement: 'topRight',
      });
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const auth = useSelector(state => state.auth);
  console.log('auth', auth);
  const { currentUser } = auth;
  const dispatch = useDispatch();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = values => {
    const { password, newPassword, confirmPassword } = values;
    dispatch(
      changeMyPassword({
        _id: currentUser._id,
        password,
        newPassword,
        confirmPassword,
      })
    );
    setIsModalOpen(false)
  };
  useEffect(() => {
    if(auth.success)
    {
        openNotification('success',auth.success)
    }
    if(auth.error)
    {
        openNotification('error',auth.error)
    }
    dispatch(clearError())
  });
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <>
      {contextHolder}
      
      <Button
        type='primary'
        className='btn btn-outline-light mb-4'
        onClick={showModal}
      >
        Change my password
      </Button>
      <Modal
        title='Change my password'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText='Submit'
        destroyOnClose
        footer={[
          <Button key='cancel' onClick={handleCancel}>
            Cancel
          </Button>,
          <Button form='myForm' key='submit' htmlType='submit'>
            Submit
          </Button>,
        ]}
      >
        <Form
          id='myForm'
          name='basic'
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label='New password'
            name='newPassword'
            rules={[
              {
                required: true,
                message: 'Please input your new password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label='Confirm password'
            name='confirmPassword'
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default PasswordModal;
