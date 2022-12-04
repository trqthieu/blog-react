import { configureStore } from '@reduxjs/toolkit';
import postReducer from './postSlice';
import modalReducer from './modalSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';

const store = configureStore({
  reducer: {
    post: postReducer,
    modal: modalReducer,
    auth: authReducer,
    user:userReducer,
  },
});
export default store;
