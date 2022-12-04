// import { Button, Form, Input, Col, Row, Modal } from 'antd';
// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { io } from 'socket.io-client';

// const ENDPOINT = 'ws://localhost:8080';
// const socket = io(ENDPOINT);

// function Chat() {
//   const [messages, setMessages] = useState([]);
//   console.log('messages', messages);
//   const [messageInput, setMessageInput] = useState('');
//   const [currentRoom, setCurrentRoom] = useState();
//   const [showModal, setShowModal] = useState(true);
//   const currentUser = useSelector(state => state.auth.currentUser);
//   const onFinish = values => {
//     const { message } = values;
//     socket.emit('chat_room', {
//       user: currentUser,
//       message: message,
//       room: currentRoom,
//     });
//     console.log('socket', socket);
//     setMessageInput('');
//   };

//   const onFinishRoom = values => {
//     socket.emit(
//       'join_room',
//       {
//         user: currentUser,
//         room: values.room,
//       },
//       data => {
//         setCurrentRoom(data);
//       }
//     );
//     setShowModal(false);
//   };

//   useEffect(() => {
//     socket.on('chat_room', data => {
//         console.log(data);
//       setMessages([...messages, `${data.user}: ${data.message}`]);
//     });
   
//   }, [messages]);

//   useEffect(() => {
//     return () => {
//       socket.disconnect('abc');
//     };
//   }, []);

//   return (
//     <>
//       {!showModal && (
//         <div
//           className='container bg-white d-flex flex-column '
//           style={{
//             height: '600px',
//           }}
//         >
//           <div
//             className='message-container'
//             style={{
//               background: '#ccc',
//               height: '350px',
//               overflow: 'scroll',
//             }}
//           >
//             {messages.map((message, index) => {
//               return <p key={index}>{message}</p>;
//             })}
//           </div>
//           <Form
//             className='pt-4'
//             name='basic'
//             labelCol={{
//               span: 8,
//             }}
//             wrapperCol={{
//               span: 16,
//             }}
//             onFinish={onFinish}
//             initialValues={{
//               message: messageInput,
//             }}
//             autoComplete='off'
//           >
//             {/* <Row>
//           <Col span={16}>
//             <Form.Item
//               wrapperCol={{
//                 offset: 4,
//                 span: 24,
//               }}
//               name='room'
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please input your room!',
//                 },
//               ]}
//             >
//               <Input />
//             </Form.Item>
//           </Col>
//           <Col span={8}>
//             <Form.Item
//               wrapperCol={{
//                 offset: 4,
//                 span: 24,
//               }}
//             >
//               <Button type='primary' htmlType='submit'>
//                 Join
//               </Button>
//             </Form.Item>
//           </Col>
//         </Row> */}
//             <Row>
//               <Col span={16}>
//                 <Form.Item
//                   wrapperCol={{
//                     offset: 4,
//                     span: 24,
//                   }}
//                   name='message'
//                   rules={[
//                     {
//                       required: true,
//                       message: 'Please input your message!',
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//               </Col>
//               <Col span={8}>
//                 <Form.Item
//                   wrapperCol={{
//                     offset: 4,
//                     span: 24,
//                   }}
//                 >
//                   <Button type='primary' htmlType='submit'>
//                     Send
//                   </Button>
//                 </Form.Item>
//               </Col>
//             </Row>
//           </Form>
//         </div>
//       )}

//       <Modal
//         title='Join a room'
//         open={showModal}
//         destroyOnClose
//         closable={false}
//         footer={[
//           <Button form='myForm' key='submit' htmlType='submit' type='primary'>
//             Join
//           </Button>,
//         ]}
//       >
//         <Form
//           id='myForm'
//           name='basic'
//           labelCol={{
//             span: 6,
//           }}
//           wrapperCol={{
//             span: 18,
//           }}
//           onFinish={onFinishRoom}
//           autoComplete='off'
//         >
//           <Form.Item
//             label='Room'
//             name='room'
//             rules={[{ required: true, message: 'Please input room!' }]}
//           >
//             <Input />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// }

// export default Chat;
import React from "react";

function Chat() {
  return <div>Chat</div>;
}

export default Chat;
