import React from 'react';
import { Pagination } from 'antd';

import '../MoviePagination/MoviePagination.css';

const MoviePagination = ({ currentPage, totalPages, onPageChange }) => {
  return <Pagination current={currentPage} total={totalPages} onChange={onPageChange} />;
};

export default MoviePagination;
