import React, { useContext } from 'react';
import { NotesContext } from './context/NotesContext';

const Search = () => {
  const { searchTerm, handleSearch } = useContext(NotesContext);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      className="form-control"
      placeholder="Search notes..."
    />
  );
};

export default Search;
