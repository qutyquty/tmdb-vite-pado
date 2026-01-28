import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MediaCard = ({ item, type }) => {
  const typeImg = type === "movie" ? "🎬" : "📺";

  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

  const poster = item.poster_path
    ? `${IMG_BASE_URL}${item.poster_path}`
    : "https://placehold.co/300x450?text=No+Image";

  return (
    <Col xs={6} sm={4} md={2} className='mb-4'>
      <Card className='h-100 border shadow-sm'>
        <Link to={`/${type}/${item.id}`}>
          <Card.Img variant='top'
            src={poster} 
            alt={item.title || item.name}
          />
        </Link>
        <Card.Body>
          <Card.Title className='mb-2'>{item.title || item.name}</Card.Title>
          <Card.Text className='text-muted'>
            {typeImg}{" "}{item.release_date || item.first_air_date}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default MediaCard;