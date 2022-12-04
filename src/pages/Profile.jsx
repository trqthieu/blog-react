import { Button, Space, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import images from 'src/asset/img';
import PasswordModal from 'src/components/FormModal/PasswordModal';
import UserFormModal from 'src/components/FormModal/UserFormModal';
import { getMyCollectionAsync, getMyPostsAsync } from 'src/redux/authSlice';

function Profile() {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { currentUser, myPosts, myCollection,myFriendList } = auth;
  
  const [showModal, setShowModal] = useState(false);
  console.log('myCollection', myCollection);

  useEffect(() => {
    dispatch(getMyPostsAsync());
    dispatch(getMyCollectionAsync());
  }, [dispatch]);

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
                      src={currentUser.avatar || images.defaultAvatar}
                      alt='Generic placeholder '
                      className='img-fluid img-thumbnail'
                      style={{ width: '150px', zIndex: 1 }}
                    />
                  </div>
                  <div className='ms-3'>
                    <h5>{currentUser.name}</h5>
                    <p>Viet Nam</p>
                  </div>
                  <div className='d-flex flex-column p-4'>
                    <button
                      onClick={() => setShowModal(true)}
                      type='button'
                      className='btn btn-outline-light mb-4'
                      data-mdb-ripple-color='light'
                      style={{ zIndex: 1 }}
                    >
                      Edit profile
                    </button>
                    <PasswordModal />
                    <Button type='link'>
                        <Link to='/message'>Open Message</Link>
                    </Button>
                  </div>
                </div>
                <div
                  className='p-4 text-black'
                  style={{ backgroundColor: '#f8f9fa' }}
                >
                  <div className='d-flex justify-content-end text-center py-1'>
                    <div>
                      <p className='mb-1 h5'>{myPosts?.totalPosts}</p>
                      <p className='small text-muted mb-0'>Posts</p>
                    </div>
                    <div className='px-3'>
                      <p className='mb-1 h5'>{myFriendList.length}</p>
                      <p className='small text-muted mb-0'>Friends</p>
                    </div>
                   
                  </div>
                </div>
                <div className='card-body p-4 text-black'>
                  <div className='mb-5'>
                    <p className='lead fw-normal mb-1'>About</p>
                    <div className='p-4' style={{ backgroundColor: '#f8f9fa' }}>
                      <p className='font-italic mb-1'>
                        {currentUser.description}{' '}
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
                      {myPosts?.data?.map(post => (
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
                  <div className='my-collection mt-5'>
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                      <p className='lead fw-normal mb-0'>My collection</p>
                      <p className='mb-0'>
                        <a href='#!' className='text-muted'>
                          Show all
                        </a>
                      </p>
                    </div>
                    <div className='row'>
                    {myCollection?.data?.map(post => (
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

      <UserFormModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

export default Profile;
