import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Spinner } from 'reactstrap';
import Pagination from 'src/components/Pagination/Pagination';

import Post from 'src/components/Post/Post';
import { changePage, fetchPostAsync } from 'src/redux/postSlice';

function PostPage() {
  const dispatch = useDispatch();
  const post = useSelector(state => state.post);
  const { currentPage } = post;
  console.log('post',post);

  const PAGE_LIMIT = 6;

  useEffect(() => {
    // dispatch(changePage(1))
  }, []);

  useEffect(() => {
    dispatch(fetchPostAsync({ page: currentPage, limit: PAGE_LIMIT }));
    
  }, [dispatch, currentPage]);

  return (
    <section className='wrapper'>
      <div className='container'>
        {/* <div className='row'>
          <div className='col text-center mb-5'>
            <h1 className='display-4'>
              Bootstrap 4 Cards With Background Image
            </h1>
            <p className='lead'>
              Lorem ipsum dolor sit amet at enim hac integer volutpat maecenas
              pulvinar.{' '}
            </p>
          </div>
        </div> */}
        {post.loading ? (
          <div className='d-flex justify-content-center'>
            <Spinner
              color='primary'
              style={{
                height: '3rem',
                width: '3rem',
              }}
            >
              Loading...
            </Spinner>
          </div>
        ) : (
          <div className='row'>
            {post?.list?.map((postItem, index) => (
              <div key={index} className='col-12'>
                <Post data={postItem} />
              </div>
            ))}
            {post?.list?.length > 0 && <Pagination />}
          </div>
        )}
      </div>
    </section>
  );
}

export default PostPage;
