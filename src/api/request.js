import axiosClient from './index';

export const fetchPosts = params => {
  return axiosClient.get('/post', {
    params,
  });
};

export const createPost = post => {
  return axiosClient.post('/post', post);
};
export const updatePost = post => {
  return axiosClient.put('/post', post);
};
export const deletePost = post => {
  return axiosClient.delete('/post', { data: post });
};
export const likePost = params => {
  return axiosClient.post('/post/likePost', params);
};

export const searchPost = params => {
  return axiosClient.get('/post/search', {
    params,
  });
};
export const showPost = params => {
  const { id } = params;
  return axiosClient.get(`/post/${id}`);
};

export const postComment = params => {
  return axiosClient.post('/post/commentPost', params);
};
export const updateComment = params => {
  return axiosClient.put('/post/comment', params);
};
export const deleteComment = params => {
  return axiosClient.delete('/post/comment', {
    data: params,
  });
};

export const fetchComment = params => {
  const { id } = params;
  return axiosClient.get(`/post/${id}/comment`);
};
export const savePost = params => {
  return axiosClient.post(`/post/savePost`, params);
};

export const getMyPosts = params => {
  return axiosClient.get(`/user/myPosts`, {
    params,
  });
};
export const getMyCollection = params => {
  return axiosClient.get(`/user/myCollection`, {
    params,
  });
};

export const signIn = user => {
  return axiosClient.post('/user/signIn', user);
};
export const signUp = user => {
  return axiosClient.post('/user/signUp', user);
};
export const getMe = () => {
  return axiosClient.get('/user/getMe');
};
export const changeMe = params => {
  return axiosClient.post('/user/changeMe', params);
};
export const changeMyPassword = params => {
  return axiosClient.post('/user/changePassword', params);
};
export const getUserInfo = params => {
  return axiosClient.get(`/user/${params.id}`);
};
export const getUserPosts = params => {
  return axiosClient.get(`/user/${params.id}/posts`);
};
export const requestFriend = params => {
  return axiosClient.post('/user/requestFriend', params);
};
export const getMyFriendRequest = params => {
  return axiosClient.get('/user/myFriendRequest');
};
export const getMyFriendList = params => {
  return axiosClient.get('/user/myFriendList');
};
export const confirmFriendRequest = params => {
  return axiosClient.post('/user/confirmFriendRequest',params);
};
export const unfriend = params => {
  return axiosClient.post('/user/unfriend',params);
};
export const getRequestStatus = params => {
  return axiosClient.get(`/user/${params.id}/requested`);
};
export const saveMessage = params => {
  return axiosClient.post(`/user/message`,params);
};
export const getMyRoomMessage = params => {
  return axiosClient.get(`/user/message/${params.roomId}`);
};
