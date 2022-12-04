import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import Pagination from 'src/components/Pagination/Pagination';
import Post from 'src/components/Post/Post';
import { changePage, searchPostAsync } from 'src/redux/postSlice';

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const post = useSelector(state => state.post);
  const { currentPage } = post;
  console.log('currentPage',currentPage);

  const PAGE_LIMIT = 6;
  const dispatch = useDispatch();

  const query = searchParams.get('q');

  useEffect(() => {

    dispatch(searchPostAsync({ q: query, page: currentPage, limit: PAGE_LIMIT }));

  }, [dispatch, query,currentPage]);

  return (
    <div className='container'>
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
  );
}

export default Search;
