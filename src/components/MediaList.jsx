import React from 'react';
import { Row } from 'react-bootstrap';

import MediaCard from './MediaCard';

const MediaList = ({ items, type }) => {
  return (
    <Row>
      {items.map((item) => (
        <MediaCard key={item.id} item={item} type={type} />
      ))}
    </Row>
  );
};

export default MediaList;