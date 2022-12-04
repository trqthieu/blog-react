import {
  faCaretDown,
  faPlusCircle,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Navbar,
  NavbarBrand,
} from 'reactstrap';

import images from 'src/asset/img';
import {
  auth,
  clearError as clearAuthError,
  confirmFriendRequest,
  getMeAsync,
  logout,
  getMyFriendRequest,
  setError,
  getMyFriendList,
} from 'src/redux/authSlice';
import { openModal } from 'src/redux/modalSlice';
import {
  changePage,
  clearError as clearPostError,
  selectPost,
} from 'src/redux/postSlice';
import './Header.css';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Divider,
  notification,
  Space,
  Popover,
} from 'antd';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef();
  const { currentUser, success, myFriendRequest,myFriendList } = useSelector(
    state => state.auth
  );
  const postError = useSelector(state => state.post.error);

  console.log('myFriendList', myFriendList);

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (type, message) => {
    if (type === 'success') {
      api.success({
        message: message,
        placement: 'topRight',
        duration: 2,
      });
    } else {
      api.error({
        message: message,
        placement: 'topRight',
        duration: 2,
      });
    }
  };

  console.log('currentUser', currentUser);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  const handleSubmit = e => {
    e.preventDefault();
    const value = inputRef.current.value.trim();
    if (value.length > 0) {
      navigate(`/post/search?q=${value}`);
      dispatch(changePage(1));
    }
  };

  const confirmRequest = friendId => {
    dispatch(confirmFriendRequest({ friendId }));
  };
  const deleteRequest = () => {};

  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = newOpen => {
    setOpen(newOpen);
  };
  const getNotification = async () => {
    if (postError) {
      window.alert(postError);
      dispatch(clearPostError());
      dispatch(clearAuthError());
    }
    if (success) {
      openNotification('success', success);
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
      dispatch(clearPostError());
      dispatch(clearAuthError());
    }
  };
  useEffect(() => {
    getNotification();
  });

  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));

    if (accessToken) {
      try {
        const timeExp = jwtDecode(accessToken).exp * 1000;
        if (!timeExp || timeExp < new Date().getTime()) {
          dispatch(logout());
        } else {
          dispatch(getMeAsync());
          dispatch(getMyFriendRequest());
          dispatch(getMyFriendList());
        }
      } catch (error) {
        dispatch(setError(error.message));
        localStorage.removeItem('accessToken');
      }
    }
  }, [dispatch]);

  return (
    <Navbar
      color='dark'
      dark
      style={{
        height: '60px',
        position: 'fixed',
        zIndex: 1000,
        top: 0,
        left: 0,
        right: 0,
        padding: 0,
      }}
    >
      {/* <NavbarBrand href='#'> */}
      {contextHolder}
      <Link
        to={'/'}
        onClick={() => {
          dispatch(changePage(1));
        }}
      >
        <img
          alt='logo'
          src={images.memories}
          style={{
            height: 40,
          }}
        />
      </Link>
      {/* </NavbarBrand> */}
      <form className='form-inline my-2 my-lg-0 w-50' onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          className='form-control mr-sm-2'
          type='search'
          placeholder='Search by title, tags'
          aria-label='Search'
        />
      </form>

      <div className='icon_wrapper'>
        {currentUser ? (
          <>
            {/* {location.pathname === '/post' && ( */}
              <div
                className='icon'
                onClick={() => {
                  dispatch(selectPost({}));
                  dispatch(openModal());
                }}
              >
                <FontAwesomeIcon icon={faPlusCircle} color='white' />
              </div>
            {/* )} */}

            <Popover
              title='Friend Request'
              trigger='click'
              open={open}
              onOpenChange={handleOpenChange}
              showArrow={false}
              content={
                myFriendRequest.length > 0 ? (
                  <ul>
                    {myFriendRequest.map(friend => (
                      <div key={friend._id} className='mb-4'>
                        <Link
                          to={`/user/${friend?._id}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          className='mb-2'
                        >
                          <img
                            src={friend?.avatar}
                            alt=''
                            width={40}
                            height={40}
                            style={{
                              borderRadius: '50%',
                            }}
                          />
                          <p className='mx-4'>{friend?.name}</p>
                        </Link>
                        <div className='d-flex justify-content-between'>
                          <Button
                            type='primary'
                            onClick={() => confirmRequest(friend?._id)}
                          >
                            Confirm
                          </Button>
                          <Button type='primary' danger onClick={deleteRequest}>
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </ul>
                ) : (
                  <p>No friend request yet!</p>
                )
              }
            >
              <div className='icon'>
                <FontAwesomeIcon icon={faUserPlus} color='white' />
              </div>
            </Popover>

            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle color='none'>
                <img
                  src={currentUser.avatar || images.defaultAvatar}
                  alt='Avatar'
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                  }}
                />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem
                  header
                  style={{
                    fontSize: '18px',
                  }}
                >
                  {currentUser.name}
                </DropdownItem>
                <DropdownItem
                  onClick={() => {
                    navigate('/me');
                  }}
                >
                  Profile
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  onClick={() => {
                    dispatch(logout());
                    navigate('/');
                  }}
                >
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </>
        ) : (
          <Link to={'/auth'}>
            <div className='icon user'>
              <FontAwesomeIcon icon={faUser} color='white' />
            </div>
          </Link>
        )}
      </div>
    </Navbar>
  );
}

export default Header;
