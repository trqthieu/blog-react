import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/Header/Header';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Search from './pages/Search';
import PostForm from 'src/components/FormModal/PostFormModal';
import PostDetail from './pages/PostDetail';
import PostPage from './pages/PostPage';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import OtherProfile from './pages/OtherProfile';
import DefaultLayout from './layouts/DefaultLayout';
import Message from './pages/Message';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAA1i6Hau9hFGoAYCgBaPirflKJMfRVZYE",
  authDomain: "blog-react-6ca3c.firebaseapp.com",
  projectId: "blog-react-6ca3c",
  storageBucket: "blog-react-6ca3c.appspot.com",
  messagingSenderId: "16147591323",
  appId: "1:16147591323:web:8cb7cfdcc9827f9647163e",
  measurementId: "G-V2WN5THFM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  const auth = useSelector(state => state.auth);
  const { currentUser } = auth;

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/me' element={!currentUser ? <Auth /> : <Profile />} />
        <Route path='/post' element={<PostPage />} />
        <Route
          path='/auth'
          element={currentUser ? <Navigate to={'/'} /> : <Auth />}
        />
        <Route path='/post/search' element={<Search />} />
        <Route path='/post/:id' element={<PostDetail />} />
        <Route path='/chat' element={<Chat />} />
        <Route
          path='/user/:id'
          element={!currentUser ? <Auth /> : <OtherProfile />}
        />
        {/* <Route path='/default' element={<DefaultLayout />} /> */}
        <Route
          path='/message'
          element={!currentUser ? <Auth /> : <Message />}
        />
        <Route path='/' element={<PostPage />} />
      </Routes>
      <PostForm />
    </BrowserRouter>
  );
}

export default App;
