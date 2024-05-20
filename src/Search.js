import React from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
function Search() {
  return (
    <div>
      <InputGroup className="px-4 me-4">
                <InputGroup.Text  id="search-icon">
                    <i className="bi bi-search"></i>
                </InputGroup.Text>
                <FormControl
                    placeholder="Search notes"
                    aria-label="Search notes"
                    aria-describedby="search-icon"
                />
            </InputGroup>
        </div>
  )
}

export default Search
