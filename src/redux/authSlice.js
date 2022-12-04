import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as request from 'src/api/request';

export const signInAsync = createAsyncThunk(
  'auth/signInAsync',
  async ({ formData, navigate }, thunkAPI) => {
    try {
      const response = await request.signIn(formData);
      const { accessToken } = response?.data;
      window.location.reload();
      navigate('/');
      return accessToken;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const signUpAsync = createAsyncThunk(
  'auth/signUpAsync',
  async ({ formData, navigate }, thunkAPI) => {
    try {
      const { data } = await request.signUp(formData);
      const { accessToken } = data;
      navigate('/');
      window.location.reload();
      return accessToken;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getMeAsync = createAsyncThunk(
  'auth/getMeAsync',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.getMe();
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const changeMeAsync = createAsyncThunk(
  'auth/changeMeAsync',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.changeMe(params);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const changeMyPassword = createAsyncThunk(
  'auth/changeMyPassword',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.changeMyPassword(params);
      console.log(data);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const savePostAsync = createAsyncThunk(
  'auth/savePostAsync',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.savePost(params);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getMyPostsAsync = createAsyncThunk(
  'auth/getMyPostsAsync',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.getMyPosts(params);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const getMyCollectionAsync = createAsyncThunk(
  'auth/getMyCollectionAsync',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.getMyCollection(params);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const getMyFriendRequest = createAsyncThunk(
  'auth/myFriendRequest',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.getMyFriendRequest(params);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);
export const confirmFriendRequest = createAsyncThunk(
  'auth/confirmFriendRequest',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.confirmFriendRequest(params);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error?.response?.data);
    }
  }
);

export const getMyFriendList = createAsyncThunk(
    'auth/getMyFriendList',
    async (params, thunkAPI) => {
      try {
        const { data } = await request.getMyFriendList(params);
        return data;
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  );

  export const unfriend = createAsyncThunk(
    'auth/unfriend',
    async (params, thunkAPI) => {
      try {
        const { data } = await request.unfriend(params);
        return data;
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  );

  export const saveMessage = createAsyncThunk(
    'auth/saveMessage',
    async (params, thunkAPI) => {
      try {
        const { data } = await request.saveMessage(params);
        console.log(data);
        return data;
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  );
  export const getMyRoomMessage = createAsyncThunk(
    'auth/getMyRoomMessage',
    async (params, thunkAPI) => {
      try {
        const { data } = await request.getMyRoomMessage(params);
        return data;
      } catch (error) {
        if (!error.response) {
          throw error;
        }
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  );

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    error: null,
    success: null,
    loading: false,
    myPosts: [],
    myCollection: [],
    myFriendList: [],
    myFriendRequest: [],
    myRoomMessage:[]
  },
  reducers: {
    auth: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state, action) => {
      window.location.reload();
      localStorage.clear();
      state.currentUser = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = null;
      state.success = null;
    },
    clearMyRoomMessage:state=>{
        state.myRoomMessage=[]
    }
  },
  extraReducers: {
    [signInAsync.fulfilled]: (state, action) => {
      localStorage.setItem('accessToken', JSON.stringify(action.payload || ''));
    },
    [signInAsync.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
    [signUpAsync.fulfilled]: (state, action) => {
      localStorage.setItem('accessToken', JSON.stringify(action.payload || ''));
    },
    [signUpAsync.rejected]: (state, action) => {
      state.error = action.payload.message;
    },
    [getMeAsync.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },
    [getMeAsync.rejected]: (state, action) => {
      localStorage.removeItem('accessToken');
    },

    [changeMeAsync.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
    },

    [changeMyPassword.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
      state.success = null;
    },
    [changeMyPassword.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.success = 'Change password success';
      state.loading = false;
    },
    [changeMyPassword.rejected]: (state, action) => {
      state.error = action.payload.message;
      state.loading = false;
    },
    [savePostAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentUser = action.payload;
      state.success = 'Updated your collection';
    },
    [getMyPostsAsync.fulfilled]: (state, action) => {
      state.myPosts = action.payload;
    },
    [getMyCollectionAsync.fulfilled]: (state, action) => {
      state.myCollection = action.payload;
    },
    [getMyFriendRequest.fulfilled]: (state, action) => {
      state.myFriendRequest = action.payload;
    },
    [getMyFriendList.fulfilled]: (state, action) => {
      state.myFriendList = action.payload;
    },
    [unfriend.fulfilled]: (state, action) => {
      state.myFriendList = action.payload;
    },
    [confirmFriendRequest.fulfilled]: (state, action) => {
      const newFriend = action.payload;
      const { personRequest } = newFriend;
      state.myFriendList = [...state.myFriendList, newFriend];
      state.myFriendRequest=state.myFriendRequest.filter(req=>req._id!==personRequest)
    },
    [getMyRoomMessage.fulfilled]: (state, action) => {
        state.myRoomMessage=action.payload
    },
    
  },
});

export const { auth, logout, setError, clearError,clearMyRoomMessage } = authSlice.actions;
export default authSlice.reducer;
