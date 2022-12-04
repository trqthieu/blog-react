import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changePage } from 'src/redux/postSlice';
import  './Pagination.css'

function Pagination() {
  const post = useSelector(state => state.post);
  const dispatch = useDispatch();
  const { currentPage, totalPage } = post;
  return (
    <nav aria-label='Page navigation example' color='white' className='my-4'>
      <ul className='pagination justify-content-center'>
      <li
          className={`page-item ${currentPage > 1 ? '' : 'disabled'}`}
        >
          <span
            className='page-link'
            
            onClick={() => dispatch(changePage(currentPage - 1))}
          >
            Previous
          </span>
        </li>
        {currentPage > 1 && (
          <li className='page-item'>
            <span
              className='page-link'
              
              onClick={() => dispatch(changePage(currentPage - 1))}
            >
              {currentPage - 1}
            </span>
          </li>
        )}
        <li className='page-item'>
          <span className='page-link active' >
            {currentPage}
          </span>
        </li>
        {currentPage < totalPage && (
          <li className='page-item'>
            <span
              className='page-link'
              
              onClick={() => dispatch(changePage(currentPage + 1))}
            >
              {currentPage + 1}
            </span>
          </li>
        )}
        <li
          className={`page-item ${currentPage < totalPage ? '' : 'disabled'}`}
        >
          <span
            className='page-link'
            
            onClick={() => dispatch(changePage(currentPage + 1))}
          >
            Next
          </span>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
