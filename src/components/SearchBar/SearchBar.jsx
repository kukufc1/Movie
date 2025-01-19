import React from 'react';

const SearchBar = ({ searchTerm, handleSearchChange }) => (
  <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Поиск фильма..." />
);

export default SearchBar;
