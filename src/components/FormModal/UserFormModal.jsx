import React, { useEffect, useState } from 'react';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Spinner,
  Modal,
  ModalHeader,
} from 'reactstrap';
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import {
  createPostAsync,
  selectPost,
  updatePostAsync,
} from 'src/redux/postSlice';
import { toggleModal } from 'src/redux/modalSlice';
import { changeMeAsync } from 'src/redux/authSlice';

function UserFormModal({ showModal, setShowModal }) {
  const modal = useSelector(state => state.modal);
  const auth = useSelector(state => state.auth);
  const { currentUser } = auth;
  const [userData, setUserData] = useState({
    name: '',
    avatar: '',
    description: '',
  });
  const handleChange = (value, name) => {
    const newUserData = { ...userData };
    newUserData[name] = value;
    setUserData(newUserData);
  };

  useEffect(() => {
    setUserData(currentUser);
  }, [currentUser]);

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    console.log('auth', auth.currentUser);
    console.log('userData', userData);
    if (userData.name.trim().length > 0) {
      dispatch(changeMeAsync(userData));
      setShowModal(false)
    }
  };

  return (
    <Modal
      fade={false}
      isOpen={showModal}
      toggle={() => setShowModal(!showModal)}
    >
      <ModalHeader toggle={() => setShowModal(!showModal)}>
        Change your profile
      </ModalHeader>
      <Form onSubmit={handleSubmit} className='bg-white p-4'>
        <FormGroup row>
          <Label for='title' sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input
              type='text'
              name='title'
              id='title'
              onChange={e => handleChange(e.target.value, 'name')}
              value={userData.name}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='content' sm={2}>
            Description
          </Label>
          <Col sm={10}>
            <Input
              type='textarea'
              name='text'
              id='content'
              onChange={e => handleChange(e.target.value, 'description')}
              value={userData.description}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for='file' sm={2}>
            Picture
          </Label>
          <Col sm={10}>
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => {
                setUserData({ ...userData, avatar: base64 });
              }}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button type='submit'>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </Modal>
  );
}

export default UserFormModal;
