import {
  faBookmark as faBookmarkReg,
  faComment,
  faHeart,
  faShareFromSquare,
} from '@fortawesome/free-regular-svg-icons';
import {
  faBookmark as faBookmarkSol,
  faEllipsis,
  faHeartCircleCheck,
  faPen,
  faPenAlt,
  faTrash,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  PopoverBody,
  PopoverHeader,
  UncontrolledPopover,
} from 'reactstrap';
import images from 'src/asset/img';
import { openModal } from 'src/redux/modalSlice';
import {
  deletePostAsync,
  fetchPostAsync,
  likePostAsync,
  selectPost,
} from 'src/redux/postSlice';
import { savePostAsync } from 'src/redux/authSlice';
import './Post.css';

function Post({ data }) {
  const dispatch = useDispatch();
  const postList = useSelector(state => state.post.list);

  const currentUser = useSelector(state => state.auth.currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = () => {
    dispatch(
      deletePostAsync({
        _id: data._id,
      })
    );
  };

  const likePost = () => {
    dispatch(likePostAsync(data));
  };

  const savePost = () => {
    dispatch(savePostAsync({ id: data._id }));
  };

  const duration = moment.duration(
    moment(new Date()).diff(moment(new Date(data.createdAt)))
  );
  const hours = duration.asHours();

  const postTime =
    hours < 24
      ? moment(new Date(data.createdAt)).fromNow()
      : moment(new Date(data.createdAt)).format('HH:mm, MMM Do YY');

  return (
    <>
      <Card className='my-2 relative' outline>
        {currentUser?._id === data.creator && (
          <div className='icon_wrapper'>
            <div
              className='icon'
              onClick={() => {
                dispatch(selectPost(data));
                dispatch(openModal());
              }}
            >
              <FontAwesomeIcon icon={faPen} />
            </div>
            <div className='icon' onClick={() => setIsOpen(true)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </div>
          </div>
        )}

        <div
          className='card text-white card-has-bg click-col'
          style={{
            backgroundImage: `url(${data?.file})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className='card-img-overlay d-flex flex-column'>
            <Link
              to={
                currentUser?._id === data.creator
                  ? '/me'
                  : `/user/${data.creator}`
              }
            >
              <div className='media d-flex align-items-center'>
                <img
                  className='mr-3 rounded-circle '
                  src={data.creatorData?.[0].avatar || images.defaultAvatar}
                  alt='Generic placeholder'
                  style={{ width: '50px', height: '50px' }}
                />
                <div className='media-body mx-2'>
                  <h6 className='my-0 text-white d-block'>
                    {data.creatorData?.[0].name}
                  </h6>
                </div>
              </div>
            </Link>
            <div className='card-body'>
              <h4 className='card-title mt-0 '>
                <Link
                  className='text-white text-line-1'
                  to={`/post/${data._id}`}
                >
                  {data.title}
                </Link>
              </h4>
              <p className='text-line-2'>{data.content}</p>
              <small>{postTime}</small>
              <br />
              <small className='mb-2'>
                {data?.tags?.map(tag => `#${tag} `)}
              </small>
            </div>
            <div className='card-footer'>
              {currentUser && (
                <div className='action d-flex justify-content-around'>
                  <span onClick={likePost}>
                    {data?.likes?.includes(currentUser._id) ? (
                      <FontAwesomeIcon
                        icon={faHeartCircleCheck}
                        color='#ed4956'
                      />
                    ) : (
                      <FontAwesomeIcon icon={faHeart} />
                    )}

                    <small>
                      {data?.likes?.length > 0 && data?.likes?.length}
                    </small>
                  </span>
                  {/* <span>
                    <FontAwesomeIcon icon={faComment} />
                    <small>{data.commentCount || 0}</small>
                  </span> */}
                  <span>
                    {currentUser?.collectionList?.includes(data._id) ? (
                      <FontAwesomeIcon
                        icon={faBookmarkSol}
                        color='#ed4956'
                        onClick={savePost}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faBookmarkReg}
                        onClick={savePost}
                      />
                    )}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
      <Modal isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} fade={false}>
        <ModalHeader toggle={() => setIsOpen(!isOpen)}>
          Are you sure?
        </ModalHeader>
        <ModalBody>This post will be deleted permanent</ModalBody>
        <ModalFooter>
          <Button onClick={() => handleDelete()} color='danger'>
            Delete
          </Button>{' '}
          <Button onClick={() => setIsOpen(false)} color='secondary'>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Post;
