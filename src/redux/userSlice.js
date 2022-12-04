import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as request from 'src/api/request';

export const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.getUserInfo(params);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const getUserPosts = createAsyncThunk(
  'user/getUserPosts',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.getUserPosts(params);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const requestFriend = createAsyncThunk(
  'user/requestFriend',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.requestFriend(params);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const getRequestStatus = createAsyncThunk(
  'user/getRequestStatus',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.getRequestStatus(params);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    userPosts: [],
    requestStatus: false,
  },
  reducers: {},
  extraReducers: {
    [getUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
    },
    [getUserPosts.fulfilled]: (state, action) => {
      state.userPosts = action.payload;
    },
    [requestFriend.fulfilled]: (state, action) => {
      state.requestStatus = action.payload.status;
    },
    [getRequestStatus.fulfilled]: (state, action) => {
      state.requestStatus = action.payload.status;
    },
  },
});
export default userSlice.reducer;
