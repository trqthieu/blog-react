import { faUser } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { auth, signInAsync, signUpAsync,clearError as clearAuthError } from 'src/redux/authSlice';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authError = useSelector(state => state.auth.error);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if ( authError) {
      window.alert( authError);
      dispatch(clearAuthError());
    }
  });

  const handleChange = (value, name) => {
    const newData = { ...formData };
    if (value.startsWith(' ')) {
      newData[name] = value.trim();
    } else {
      newData[name] = value;
    }
    setFormData(newData);
  };
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const googleSuccess = async response => {
    const { credential } = response;
    const user = jwt_decode(credential);
    dispatch(auth(user));
    navigate('/');
  };
  const googleFailure = error => {
    console.log('Error', error);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUpAsync({ formData, navigate }));
    } else {
      dispatch(
        signInAsync({
          formData: {
            email: formData.email,
            password: formData.password,
          },
          navigate,
        })
      );
    }
  };

  return (
    <section className='vh-100'>
      <div className='container h-100'>
        <div className='row d-flex justify-content-center align-items-center'>
          <div className='col-lg-6 col-md-8'>
            <div
              className='card text-black'
              style={{
                borderRadius: '25px',
              }}
            >
              <div className='px-4'>
                <div className='row justify-content-center'>
                  <div className='order-2 order-lg-1 px-4'>
                    <p className='text-center h1 fw-bold my-4'>
                      {isSignUp ? 'Sign up' : 'Sign in'}
                    </p>

                    <form className='mx-1' onSubmit={handleSubmit}>
                      {isSignUp && (
                        <div className='d-flex flex-row align-items-center mb-2'>
                          <div className='form-outline flex-fill mb-0'>
                            <label className='form-label' htmlFor='name'>
                              Your Name
                            </label>
                            <input
                              required
                              type='text'
                              id='name'
                              className='form-control'
                              value={formData.name}
                              onChange={e =>
                                handleChange(e.target.value, 'name')
                              }
                            />
                          </div>
                        </div>
                      )}

                      <div className='d-flex flex-row align-items-center mb-2'>
                        <div className='form-outline flex-fill mb-0'>
                          <label className='form-label' htmlFor='email'>
                            Your Email
                          </label>
                          <input
                            required
                            type='email'
                            id='email'
                            className='form-control'
                            value={formData.email}
                            onChange={e =>
                              handleChange(e.target.value, 'email')
                            }
                          />
                        </div>
                      </div>

                      <div className='d-flex flex-row align-items-center mb-2'>
                        <div className='form-outline flex-fill mb-0'>
                          <label className='form-label' htmlFor='password'>
                            Password
                          </label>
                          <input
                            required
                            type='password'
                            id='password'
                            className='form-control'
                            value={formData.password}
                            onChange={e =>
                              handleChange(e.target.value, 'password')
                            }
                          />
                        </div>
                      </div>

                      {isSignUp && (
                        <div className='d-flex flex-row align-items-center mb-2'>
                          <div className='form-outline flex-fill mb-0'>
                            <label
                              className='form-label'
                              htmlFor='confirmPassword'
                            >
                              Repeat your password
                            </label>
                            <input
                              required
                              type='password'
                              id='confirmPassword'
                              className='form-control'
                              value={formData.confirmPassword}
                              onChange={e =>
                                handleChange(e.target.value, 'confirmPassword')
                              }
                            />
                          </div>
                        </div>
                      )}
                      <div className='d-flex justify-content-center my-2 mt-4'>
                        <button type='submit' className='btn btn-primary'>
                          {!isSignUp ? 'Sign in' : 'Sign up'}
                        </button>
                      </div>
                      <div className='d-flex justify-content-center my-2 mb-4'>
                        <button
                          onClick={toggleMode}
                          type='button'
                          className='btn btn-secondary'
                        >
                          {isSignUp
                            ? 'Already have an account? Sign in'
                            : "You don't have an account? Sign up"}
                        </button>
                      </div>
                      {/* <div className='d-flex justify-content-center my-2 mb-4'>
                        <GoogleLogin
                          onSuccess={googleSuccess}
                          onError={googleFailure}
                        />
                      </div> */}
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Auth;
