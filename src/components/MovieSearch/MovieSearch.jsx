// MovieSearch.jsx
import React from 'react';

import SearchBar from '../SearchBar/SearchBar';

const MovieSearch = ({ searchTerm, handleSearchChange }) => {
  return <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />;
};

export default MovieSearch;
