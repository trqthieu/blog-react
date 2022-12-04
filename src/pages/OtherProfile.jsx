import {
  faMessage,
  faUserMinus,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, Space, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import images from 'src/asset/img';
import {
  getRequestStatus,
  getUserInfo,
  getUserPosts,
  requestFriend,
} from 'src/redux/userSlice';
import { unfriend } from 'src/redux/authSlice';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);

function OtherProfile() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, myFriendList, myFriendRequest } = auth;
  const params = useParams();

  const [isModalOpenUnfriend, setIsModalOpenUnfriend] = useState(false);

  const user = useSelector(state => state.user);
  const { userInfo, userPosts, requestStatus } = user;
  const isFriend = myFriendList.find(f => f.user._id===userInfo._id);

  const handleFriendRequest = () => {
    dispatch(requestFriend({ friendId: userInfo._id }));
  };
  const handleUnfriend = _id => {
    dispatch(unfriend({ _id }));
  };

  useEffect(() => {
    dispatch(getUserInfo({ id: params.id }));
    dispatch(getUserPosts({ id: params.id }));
    dispatch(getRequestStatus({ id: params.id }));
    if (params.id === currentUser?._id) {
      navigate('/me');
    }
  }, [dispatch, params.id, currentUser?._id, navigate]);

  return auth.loading ? (
    <div className='d-flex justify-content-center py-4'>
      <Space size='middle'>
        <Spin size='large' />
      </Space>
    </div>
  ) : (
    <>
      <section className='h-100 gradient-custom-2'>
        <div className='container py-5 h-100'>
          <div className='row d-flex justify-content-center align-items-center h-100'>
            <div className='col col-lg-9 col-xl-7'>
              <div className='card'>
                <div
                  className='rounded-top text-white d-flex align-items-center justify-content-around'
                  style={{ backgroundColor: '#000', height: '300px' }}
                >
                  <div
                    className='d-flex flex-column'
                    style={{ width: '200px' }}
                  >
                    <img
                      src={userInfo?.avatar || images.defaultAvatar}
                      alt='Generic placeholder '
                      className='img-fluid img-thumbnail'
                      style={{ width: '150px', zIndex: 1 }}
                    />
                  </div>
                  <div className='ms-3'>
                    <h5>{userInfo?.name}</h5>
                    <p>Viet Nam</p>
                  </div>
                  <div className='d-flex flex-column p-4'>
                    {isFriend ? (
                      <>
                        <Modal
                          title='Unfriend?'
                          open={isModalOpenUnfriend}
                          onCancel={() => setIsModalOpenUnfriend(false)}
                          footer={[
                            <Button
                              key='back'
                              onClick={() => setIsModalOpenUnfriend(false)}
                            >
                              Back
                            </Button>,
                            <Button
                              key='submit'
                              type='primary'
                              danger
                              onClick={() => handleUnfriend(isFriend._id)}
                            >
                              Unfriend
                            </Button>,
                          ]}
                        >
                          <p>Are you sure you want to unfriend?</p>
                        </Modal>

                        <button
                          onClick={() => setIsModalOpenUnfriend(true)}
                          type='button'
                          className='btn btn-outline-light mb-4'
                          data-mdb-ripple-color='light'
                          style={{ zIndex: 1 }}
                        >
                          <FontAwesomeIcon icon={faUserMinus} />
                          <span>Unfriend</span>
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleFriendRequest}
                        type='button'
                        className='btn btn-outline-light mb-4'
                        data-mdb-ripple-color='light'
                        style={{ zIndex: 1 }}
                      >
                        {/* <Spin indicator={antIcon} /> {' '} */}
                        <FontAwesomeIcon
                          icon={requestStatus ? faUserMinus : faUserPlus}
                        />
                        <span>
                          {requestStatus ? 'Cancel request' : 'Add friend'}
                        </span>
                      </button>
                    )}

                    {isFriend && (
                      <button
                        type='button'
                        className='btn btn-outline-light mb-4'
                        data-mdb-ripple-color='light'
                        style={{ zIndex: 1 }}
                      >
                        <Link to='/message'>
                          <FontAwesomeIcon icon={faMessage} /> Message
                        </Link>
                      </button>
                    )}
                  </div>
                </div>
                <div
                  className='p-4 text-black'
                  style={{ backgroundColor: '#f8f9fa' }}
                >
                  <div className='d-flex justify-content-end text-center py-1'>
                    <div>
                      <p className='mb-1 h5'>{userPosts?.totalPosts}</p>
                      <p className='small text-muted mb-0'>Posts</p>
                    </div>
                  </div>
                </div>
                <div className='card-body p-4 text-black'>
                  <div className='mb-5'>
                    <p className='lead fw-normal mb-1'>About</p>
                    <div className='p-4' style={{ backgroundColor: '#f8f9fa' }}>
                      <p className='font-italic mb-1'>
                        {userInfo?.description}{' '}
                      </p>
                    </div>
                  </div>
                  <div className='my-post'>
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                      <p className='lead fw-normal mb-0'>Recent photos</p>
                      <p className='mb-0'>
                        <a href='#!' className='text-muted'>
                          Show all
                        </a>
                      </p>
                    </div>
                    <div className='row'>
                      {userPosts?.data?.map(post => (
                        <div
                          key={post._id}
                          className='col col-md-4 col-sm-6 mb-4 mb-2'
                        >
                          <Link to={`/post/${post._id}`}>
                            <div
                              className='post-overlay'
                              style={{
                                borderRadius: '10px',
                                overflow: 'hidden',
                                height: '100px',
                                backgroundImage: `url(${post.file})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                              }}
                            ></div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default OtherProfile;
