import React from 'react';
function Search({ searchTerm ,handleSearch }) {
  return (
    <div className="search-bar my-3">
      <div className="input-group">
        <span className="input-group-text" id="search-icon">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search notes"
          aria-label="Search notes"
          aria-describedby="search-icon"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  )
}

export default Search
