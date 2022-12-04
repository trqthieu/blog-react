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
  Upload,
  message,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import { useDispatch, useSelector } from 'react-redux';
import { changeMyPassword } from 'src/redux/authSlice';
import SingleImageUpload from '../SingleImageUpload/SingleImageUpload';
import { clearError, updatePostAsync } from 'src/redux/postSlice';

const PostModal = ({ showPostModal, setShowPostModal }) => {
  const [api, contextHolder] = notification.useNotification();
  const post = useSelector(state => state.post);
  const { current: currentPost } = post;
  console.log('currentPost', currentPost);
  const openNotification = (type, message) => {
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

  const dispatch = useDispatch();

  const handleOk = () => {
    setShowPostModal(false);
  };
  const handleCancel = () => {
    setShowPostModal(false);
  };
  const onFinish = values => {
    const { tags } = values;
    const tagsList = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(t => t.length > 0);
      dispatch(updatePostAsync({...values,tags:tagsList,_id:currentPost._id}));
      
      setShowPostModal(false);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

 
  return (
    <>
      {contextHolder}
      <Modal
        title='Update my post'
        open={showPostModal}
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
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            title: currentPost?.title,
            content: currentPost?.content,
            tags: currentPost?.tags?.join(','),
            file: currentPost.file,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item
            label='Title'
            name='title'
            rules={[{ required: true, message: 'Please input post title!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Content'
            name='content'
            rules={[{ required: true, message: 'Please input post content!' }]}
          >
            <Input.TextArea rows={8} />
          </Form.Item>
          <Form.Item
            label='Hash Tag'
            name='tags'
            rules={[{ required: true, message: 'Please input post hashtags!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='File'
            name='file'
            rules={[{ required: true, message: 'Please input post file!' }]}
          >
            <SingleImageUpload />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default PostModal;
