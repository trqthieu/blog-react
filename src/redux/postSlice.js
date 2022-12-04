import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as request from 'src/api/request';

export const fetchPostAsync = createAsyncThunk(
  'post/fetchPostAsync',
  async (params, thunkAPI) => {
    try {
      const response = await request.fetchPosts(params);
      const { data } = response;
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createPostAsync = createAsyncThunk(
  'post/createPostAsync',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.createPost(params);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updatePostAsync = createAsyncThunk(
  'post/updatePostAsync',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.updatePost(params);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deletePostAsync = createAsyncThunk(
  'post/deletePostAsync',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.deletePost(params);
      console.log('data', data);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const likePostAsync = createAsyncThunk(
  'post/likePostAsync',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.likePost(params);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const searchPostAsync = createAsyncThunk(
  'post/searchPostAsync',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.searchPost(params);
      return data;
    } catch (error) {
      if (error) {
        if (!error.response) {
          throw error;
        }
        return thunkAPI.rejectWithValue(error?.response?.data);
      }
    }
  }
);

export const showPostAsync = createAsyncThunk(
  'post/showPostAsync',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.showPost(params);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchCommentAsync = createAsyncThunk(
  'post/fetchCommentAsync',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.fetchComment(params);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const postCommentAsync = createAsyncThunk(
  'post/postCommentAsync',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.postComment(params);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateCommentAsync = createAsyncThunk(
  'post/updateCommentAsync',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.updateComment(params);

      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const deleteCommentAsync = createAsyncThunk(
  'post/deleteCommentAsync',
  async (params, thunkAPI) => {
    try {
      const { data } = await request.deleteComment(params);
      return data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const postSlice = createSlice({
  name: 'post',
  initialState: {
    list: [],
    loading: false,
    currentPage: 1,
    totalPage: 1,
    error: null,
    current: {},
    currentComments: [],
    postForm: {},
  },
  reducers: {
    fetchAllPosts: (state, action) => {
      return action.payload;
    },
    createPost: (state, action) => {
      return state;
    },
    selectPost: (state, action) => {
      state.postForm = action.payload;
    },
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: {
    [fetchPostAsync.pending]: state => {
      state.loading = true;
    },
    [fetchPostAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.list = action.payload.data;
      state.currentPage = action.payload.currentPage;
      state.totalPage = action.payload.totalPage;
    },
    [fetchPostAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [createPostAsync.pending]: state => {
      state.loading = true;
    },
    [createPostAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.list = [action.payload[0], ...state.list];
    },
    [createPostAsync.rejected]: state => {
      state.loading = false;
      state.error = 'Error';
    },

    [updatePostAsync.pending]: state => {
      state.loading = true;
    },
    [updatePostAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      const newList = state.list.map(post =>
        post._id === action.payload?.[0]._id ? action.payload[0] : post
      );
      state.current = action.payload[0];
      state.success = 'Update post success';
      state.list = newList;
    },
    [updatePostAsync.rejected]: state => {
      state.loading = false;
      state.error = 'Error';
    },

    [deletePostAsync.pending]: state => {
      state.loading = true;
    },
    [deletePostAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      const newList = state.list.filter(
        post => post._id !== action.payload._id
      );
      state.list = newList;
    },
    [deletePostAsync.rejected]: state => {
      state.loading = false;
      state.error = 'Error';
    },

    [likePostAsync.fulfilled]: (state, action) => {
      state.loading = false;
      const updatedPost = action.payload[0];
      const newPostList = state.list.map(p =>
        p._id === updatedPost._id ? updatedPost : p
      );
      state.list = newPostList;
      state.current = updatedPost;
    },

    [searchPostAsync.pending]: state => {
      state.loading = true;
    },
    [searchPostAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.list = action?.payload?.data || [];
      state.currentPage = action?.payload?.currentPage || 1;
      state.totalPage = action?.payload?.totalPage || 1;
    },
    [searchPostAsync.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },

    [showPostAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.current = action.payload[0];
    },
    [showPostAsync.pending]: state => {
      state.loading = true;
    },

    [showPostAsync.rejected]: state => {
      state.loading = false;
      state.error = 'Error';
    },

    [fetchCommentAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      const commentList = action.payload;
      state.currentComments = commentList;
    },

    [postCommentAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.currentComments = action.payload;
    },

    [updateCommentAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      const newComment = action.payload?.[0];
      const commentList = state.currentComments;
      state.currentComments = commentList.map(comment =>
        comment._id === newComment._id ? newComment : comment
      );
    },

    [deleteCommentAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      const commentList = state.currentComments;
      state.currentComments = commentList.filter(
        comment => comment._id !== action.payload._id
      );
    },
  },
});

export const { fetchAllPosts, createPost, selectPost, changePage, clearError } =
  postSlice.actions;
export default postSlice.reducer;
