import React from 'react';
import { Form } from 'react-bootstrap';

const SortSelect = ({ sortBy, onChange }) => {
  return (
    <Form.Select value={sortBy} onChange={(e) => onChange(e.target.value)} className='mb-3'>
      <option value="popularity.desc">인기순</option>
      <option value="release_date.desc">최신순</option>
      <option value="vote_average.desc">평점순</option>
      <option value="original_title.asc">제목순</option>
    </Form.Select>
  );
};

export default SortSelect;