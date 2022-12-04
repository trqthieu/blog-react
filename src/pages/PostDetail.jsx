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
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import images from 'src/asset/img';
import { Button, Checkbox, Form, Input, Modal, Popover } from 'antd';
import {
  deleteCommentAsync,
  deletePostAsync,
  fetchCommentAsync,
  likePostAsync,
  postCommentAsync,
  selectPost,
  showPostAsync,
  updateCommentAsync,
} from 'src/redux/postSlice';
import PostModal from 'src/components/FormModal/PostModal';
import { savePostAsync } from 'src/redux/authSlice';

function PostDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const post = useSelector(state => state.post);
  const { currentComments } = post;

  const postData = post?.current;
  const commentRef = useRef();
  const [comment, setComment] = useState('');
  const currentUser = useSelector(state => state.auth.currentUser);

  const [commentChange, setCommentChange] = useState();

  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const [showPostModal, setShowPostModal] = useState(false);

  const [isModalOpenDeletePost, setIsModalOpenDeletePost] = useState(false);

  const savePost = () => {
    dispatch(savePostAsync({ id: postData._id }));
  };

  const handleOkDeletePost = () => {
    dispatch(deletePostAsync({ _id: postData._id }));
    setIsModalOpenDeletePost(false);
    window.location.replace('/');
  };
  const handleCancelDeletePost = () => {
    setIsModalOpenDeletePost(false);
  };

  const showModalDelete = () => {
    setIsModalDeleteOpen(true);
  };
  const handleDelete = commentId => {
    dispatch(deleteCommentAsync({ _id: commentId }));
    setIsModalDeleteOpen(false);
  };
  const handleCancel = () => {
    setIsModalDeleteOpen(false);
  };

  const [openPopover, setOpenPopover] = useState(false);
  const editPost = () => {
    setOpenPopover(false);
    setShowPostModal(true);
  };
  const deletePost = () => {
    console.log('delete');
  };
  const handleOpenPopoverChange = newOpenPopover => {
    setOpenPopover(newOpenPopover);
  };

  const formatTime = time => {
    const duration = moment.duration(
      moment(new Date()).diff(moment(new Date(time)))
    );
    const hours = duration.asHours();
    const postTime =
      hours < 24
        ? moment(new Date(time)).fromNow()
        : moment(new Date(time)).format('HH:mm, MMM Do YY');
    return postTime;
  };
  const { createdAt, updatedAt } = postData;
  const isEdited = moment(updatedAt).diff(moment(createdAt));

  const onFinish = values => {
    if (
      values.comment.trim() === commentChange.content ||
      values.comment.trim().length === 0
    ) {
      setCommentChange();
      return;
    }
    dispatch(
      updateCommentAsync({
        _id: commentChange._id,
        content: values.comment.trim(),
      })
    );
    setCommentChange();
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const likePost = () => {
    dispatch(likePostAsync(postData));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formatComment = comment.trim();
    setComment('');
    if (formatComment.length > 0) {
      dispatch(
        postCommentAsync({
          postId: id,
          content: formatComment,
          userId: currentUser._id,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(showPostAsync({ id }));

    dispatch(fetchCommentAsync({ id }));
  }, [dispatch, id]);

  return post?.loading ? (
    <div className='d-flex justify-content-center'>
      <Spinner
        color='primary'
        style={{
          height: '3rem',
          width: '3rem',
        }}
      >
        Loading...
      </Spinner>
    </div>
  ) : (
    <div className='bg-white'>
      <div
        className='overlay'
        style={{
          backgroundColor: '#000',
          backgroundImage: `url(${postData?.file})`,
          height: '300px',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className='position-relative'>
          <div
            className='col-lg-8 col-md-10 mx-auto pt-5 text-white'
            style={{
              textShadow: '2px 2px 10px #000',
            }}
          >
            <div className='post-heading'>
              <h1>{postData?.title}</h1>
              <div className='meta my-4'>
                {postData?.tags?.map((tag, index) => (
                  <Link key={index} href='#' className='text-white'>
                    #{tag}{' '}
                  </Link>
                ))}
              </div>

              <span className='meta'>
                Posted by{' '}
                <Link href='#' className='text-white'>
                  {postData?.creatorData?.[0]?.name}
                </Link>{' '}
                on {formatTime(postData.createdAt)} 
              </span>
            </div>
          </div>
          {currentUser?._id === postData.creator && (
            <Popover
              content={
                <div>
                  <Button
                    type='link'
                    onClick={editPost}
                    className='m-0'
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <FontAwesomeIcon icon={faPen} />
                    <span className='mx-2'>Edit post</span>
                  </Button>
                  <br />
                  <Button
                    type='link'
                    onClick={() => {
                      setIsModalOpenDeletePost(true);
                      setOpenPopover(false);
                    }}
                    className='m-0'
                    style={{
                      cursor: 'pointer',
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                    <span className='mx-2'>Delete post</span>
                  </Button>
                </div>
              }
              trigger='click'
              open={openPopover}
              onOpenChange={handleOpenPopoverChange}
              placement='bottomRight'
              showArrow={false}
            >
              <Button
                type='default'
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                }}
              >
                <FontAwesomeIcon icon={faEllipsis} />
              </Button>
            </Popover>
          )}
          <PostModal
            showPostModal={showPostModal}
            setShowPostModal={setShowPostModal}
          />
          <Modal
            title='Delete this post?'
            open={isModalOpenDeletePost}
            onOk={handleOkDeletePost}
            onCancel={handleCancelDeletePost}
            footer={[
              <Button key='back' onClick={handleCancelDeletePost}>
                Back
              </Button>,
              <Button
                key='submit'
                type='primary'
                danger
                onClick={handleOkDeletePost}
              >
                Delete
              </Button>,
            ]}
          >
            <p>Are you sure you want to delete this comment?</p>
          </Modal>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-8 col-md-10 mx-auto my-5'>
            <p>{postData.content}</p>
          </div>
        </div>
        {currentUser && (
          <div className='action d-flex justify-content-around py-4'>
            <span onClick={likePost}>
              {postData?.likes?.includes(currentUser._id) ? (
                <FontAwesomeIcon icon={faHeartCircleCheck} color='#ed4956' />
              ) : (
                <FontAwesomeIcon icon={faHeart} />
              )}

              <small>{postData?.likes?.length || ''}</small>
            </span>
            <span>
              <FontAwesomeIcon
                icon={faComment}
                onClick={() => {
                  commentRef.current.focus();
                }}
              />
              <small>{postData?.comments?.length || ''}</small>
            </span>
            <span>
              {currentUser?.collectionList?.includes(postData._id) ? (
                <FontAwesomeIcon
                  icon={faBookmarkSol}
                  color='#ed4956'
                    onClick={savePost}
                />
              ) : (
                <FontAwesomeIcon icon={faBookmarkReg} onClick={savePost}/>
              )}
            </span>
          </div>
        )}
      </div>
      <section style={{ backgroundColor: '#eee' }}>
        <div className='container py-5'>
          <div className='row d-flex justify-content-center'>
            <div className='col-md-12 col-lg-10 col-xl-8'>
              <div className='card'>
                {currentUser ? (
                  <div
                    className='card-footer py-3 border-0'
                    style={{ backgroundColor: '#f8f9fa' }}
                  >
                    <form onSubmit={handleSubmit}>
                      <div className='d-flex flex-start w-100'>
                        <img
                          className='rounded-circle shadow-1-strong me-3'
                          src={currentUser.avatar || images.defaultAvatar}
                          alt='avatar'
                          width={40}
                          height={40}
                        />
                        <div className='form-outline w-100'>
                          <textarea
                            ref={commentRef}
                            className='form-control'
                            id='textAreaExample'
                            rows={4}
                            style={{ background: '#fff' }}
                            placeholder='Enter your comment'
                            onChange={e => setComment(e.target.value)}
                            value={comment}
                          />
                        </div>
                      </div>
                      <div className='float-end mt-2 pt-1'>
                        <button
                          type='submit'
                          className='btn btn-primary btn-sm'
                        >
                          Post comment
                        </button>
                        <button
                          type='button'
                          className='btn btn-outline-primary btn-sm mx-4'
                          onClick={() => {
                            setComment('');
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <h4 className='p-4'>Please login to comment!</h4>
                )}
                {currentComments.map(comment => {
                  const {
                    _id,
                    userData,
                    content,
                    createdAt,
                    updatedAt,
                    userId,
                  } = comment;

                  const isEdited = moment(updatedAt).diff(moment(createdAt));

                  return (
                    <div key={_id} className='card-body py-0'>
                      <div className='d-flex flex-start align-items-center'>
                        <Link to={`/user/${comment.userId}`}><img
                          className='rounded-circle shadow-1-strong me-3'
                          src={
                            userData?.[0].avatar ||
                            'https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp'
                          }
                          alt='avatar'
                          width={60}
                          height={60}
                        /></Link>
                        <div>
                          <h6 className='fw-bold text-primary mb-1'>
                            {userData?.[0].name}
                          </h6>
                          <p className='text-muted small mb-0'>
                            Shared publicly - {formatTime(createdAt)}{' '}
                            {isEdited ? '(edited)' : ''}
                          </p>
                        </div>
                      </div>
                      <div className='d-flex justify-content-between align-items-center'>
                        {commentChange?._id === _id ? (
                          <Form
                            name='basic'
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            initialValues={{
                              comment: content,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete='off'
                            className='py-2 w-100'
                          >
                            <Form.Item
                              name='comment'
                              rules={[
                                {
                                  required: true,
                                  message: 'Please input your comment!',
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          </Form>
                        ) : (
                          <p className='mt-3 mb-4 pb-2 w-100'>{content}</p>
                        )}

                        {currentUser?._id === userId && (
                          <div className='comment-action d-flex'>
                            <div className='comment-icon mx-2'>
                              <FontAwesomeIcon
                                icon={faPen}
                                className=''
                                onClick={() => setCommentChange(comment)}
                              />
                            </div>
                            <div
                              className='comment-icon mx-2'
                              onClick={showModalDelete}
                            >
                              <FontAwesomeIcon icon={faTrash} className='' />
                            </div>
                            <Modal
                              title='Delete comments?'
                              open={isModalDeleteOpen}
                              footer={[
                                <Button key='back' onClick={handleCancel}>
                                  Back
                                </Button>,
                                <Button
                                  key='submit'
                                  type='primary'
                                  danger
                                  onClick={() => handleDelete(comment._id)}
                                >
                                  Delete
                                </Button>,
                              ]}
                            >
                              <p>
                                Are you sure you want to delete this comment?
                              </p>
                            </Modal>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PostDetail;
