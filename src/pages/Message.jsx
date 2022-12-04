import React, { useEffect, useRef, useState } from 'react';
import {
  Layout,
  Menu,
  Button,
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  message,
} from 'antd';
import { SendOutlined, EllipsisOutlined } from '@ant-design/icons';

import { io } from 'socket.io-client';

import { useDispatch, useSelector } from 'react-redux';
import {
  clearMyRoomMessage,
  getMyRoomMessage,
  saveMessage,
} from 'src/redux/authSlice';
const { Header, Sider, Content } = Layout;

const ENDPOINT = 'blog-express-production.up.railway.app';
// localhost:5000
let socket;

const Message = () => {
  const auth = useSelector(state => state.auth);
  const { myFriendList, currentUser, myRoomMessage } = auth;
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);
  const [room, setRoom] = useState();
  const [messages, setMessages] = useState([]);

  const [form] = Form.useForm();
  const messageRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  
  useEffect(() => {
    socket = io(ENDPOINT,{
        transports: ['websocket'],
    });
    return () => {
      socket.disconnect();
      dispatch(clearMyRoomMessage());
    };
  }, [dispatch]);
  const openError = () => {
    messageApi.open({
      type: 'error',
      content: 'Pls choose user you want to talk!',
    });
  };

  const scrollToBottom = () => {
    messageRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleChangeUser = ({ item, key, keyPath, selectedKeys, domEvent }) => {
    setRoom(key);

    socket.emit('join_room', {
      user: {
        _id: currentUser._id,
        name: currentUser.name,
      },
      room: key,
    });
    dispatch(getMyRoomMessage({ roomId: key }));
    if (room) {
      socket.emit('leave_room', {
        user: {
          _id: currentUser._id,
          name: currentUser.name,
        },
        room: room,
      });
      setMessages([]);
    }
  };

  const onFinish = values => {
    const { message } = values;
    if (!room) {
      openError();
      return;
    }

    socket.emit(
      'chat_room',
      {
        user: {
          _id: currentUser._id,
          name: currentUser.name,
        },
        message: message,
        room: room,
      },
      data => {
        alert(data);
      }
    );
    form.resetFields();
  };

  useEffect(() => {
    socket.on('chat_room', data => {
      setMessages([...messages, data]);
      scrollToBottom();
      if (data.user._id === currentUser?._id) {
        dispatch(
          saveMessage({
            _id: data.room,
            fromUser: data.user._id,
            content: data.message,
          })
        );
      }
    });
    return () => {
      socket.off('chat_room');
    };
  }, [dispatch, messages, currentUser?._id]);

  useEffect(() => {
    scrollToBottom();
  });

  return (
    <Layout>
      {contextHolder}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo' />
        <Menu
          onSelect={handleChangeUser}
          style={
            {
              // minHeight: '120vh',
            }
          }
          selectedKeys={room}
          theme='dark'
          mode='inline'
          items={myFriendList.map((friend, index) => {
            return {
              key: friend?._id,
              icon: (
                <img
                  alt='avatar'
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                  }}
                  src={friend?.user?.avatar}
                ></img>
              ),
              label: friend?.user?.name,
            };
          })}
        />
      </Sider>
      <Layout className='site-layout'>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: '20px',
            height: '70vh',
            overflow: 'scroll',
            scrollBehavior: 'smooth',
          }}
        >
          {myRoomMessage.map(mess => {
            return (
              <div
                key={mess._id}
                style={
                  mess.from === currentUser._id
                    ? {
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }
                    : {
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }
                }
              >
                <p
                  className='mb-1'
                  style={
                    mess.from === currentUser._id
                      ? {
                          background: '#1677ff',
                          color: '#fff',
                          padding: '10px',
                          borderRadius: '999px',
                          borderBottomRightRadius: '0',
                          display: 'inline-block',
                        }
                      : {
                          background: '#3e4042',
                          color: '#fff',
                          padding: '10px',
                          borderRadius: '999px',
                          borderTopLeftRadius: '0',
                          display: 'inline-block',
                        }
                  }
                >
                  {mess.content}
                </p>
              </div>
            );
          })}
          {messages.map((mess, index) => {
            return (
              <div
                key={index}
                style={
                  mess.user._id === currentUser._id
                    ? {
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }
                    : {
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }
                }
              >
                <p
                  className='mb-1'
                  style={
                    mess.user._id === currentUser._id
                      ? {
                          background: '#1677ff',
                          color: '#fff',
                          padding: '10px',
                          borderRadius: '999px',
                          borderBottomRightRadius: '0',
                          display: 'inline-block',
                        }
                      : {
                          background: '#3e4042',
                          color: '#fff',
                          padding: '10px',
                          borderRadius: '999px',
                          borderTopLeftRadius: '0',
                          display: 'inline-block',
                        }
                  }
                >
                  {mess.message}
                </p>
              </div>
            );
          })}

          <div style={{ float: 'left', clear: 'both' }} ref={messageRef}></div>
        </Content>
        <Form form={form} name='basic' onFinish={onFinish} autoComplete='off'>
          <Row className='justify-content-evenly'>
            <Col lg={16} md={16} sm={16}>
              <Form.Item
                value
                name='message'
                rules={[
                  { required: true, message: 'Please input your message!' },
                ]}
              >
                <Input autoFocus />
              </Form.Item>
            </Col>
            <Col lg={8}>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='d-flex align-items-center'
                >
                  <span> Send</span>
                  <SendOutlined />
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Layout>
    </Layout>
  );
};
export default Message;
