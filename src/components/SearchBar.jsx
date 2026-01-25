import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <Form onSubmit={handleSubmit} className='mb-4'>
      <InputGroup>
        <Form.Control type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='영화/TV 검색...' 
        />
        <Button type='submit' variant='primary'>검색</Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;