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

function FormModal() {
  const post = useSelector(state => state.post);
  const modal = useSelector(state => state.modal);
  const postForm = post.postForm;
  const [postData, setPostData] = useState({
    id: '',
    title: '',
    content: '',
    file: '',
    tags: [],
  });
  

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (postData._id) {
      dispatch(updatePostAsync(postData));
    } else {
      dispatch(createPostAsync(postData));
    }
    dispatch(toggleModal());
    dispatch(selectPost({}))
  };
  const handleChange = (value, name) => {
    const newPostData = { ...postData };
    newPostData[name] = value;
    setPostData(newPostData);
  };

  useEffect(() => {
    setPostData(postForm);
  }, [postForm]);

  return (
    <Modal
    fade={false}
      isOpen={modal.isOpen}
      toggle={() => {
        dispatch(toggleModal());
        dispatch(selectPost({}));
      }}
    >
      <ModalHeader
        toggle={() => {
          dispatch(toggleModal());
          dispatch(selectPost({}));
        }}
      >
        {postForm._id ? 'Edit post' : 'Add a new post'}
      </ModalHeader>
      <Form onSubmit={handleSubmit} className='bg-white p-4'>
        <FormGroup row>
          <Label for='title' sm={2}>
            Title
          </Label>
          <Col sm={10}>
            <Input
              type='text'
              name='title'
              id='title'
              onChange={e => handleChange(e.target.value, 'title')}
              value={postData.title}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='content' sm={2}>
            Content
          </Label>
          <Col sm={10}>
            <Input
              type='textarea'
              name='text'
              rows={6}
              id='content'
              onChange={e => handleChange(e.target.value, 'content')}
              value={postData.content}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='title' sm={2}>
            Hashtag
          </Label>
          <Col sm={10}>
            <Input
              type='text'
              name='hashtag'
              id='hashtag'
              onChange={e => handleChange(e.target.value.split(',').map(item=>item.trim()), 'tags')}
              value={postData.tags}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for='file' sm={2}>
            File
          </Label>
          <Col sm={10}>
            <FileBase64
              multiple={false}
              onDone={({ base64 }) => {
                setPostData({ ...postData, file: base64 });
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

export default FormModal;
