import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './MediaCarousel.css';

const MediaCarousel = ({ mts, type }) => {
  return (
    <Carousel interval={3000} pause={false} fade>
      {mts.map((mt) => (
        <Carousel.Item key={mt.id}>
          <Link to={`/${type}/${mt.id}`}>
            <img className='d-block w-100'
              src={`https://image.tmdb.org/t/p/w780${mt.backdrop_path}`} 
              alt={mt.title ? mt.title : mt.name} 
            />
          </Link>
          <Carousel.Caption>
            <h3>{mt.title ? mt.title : mt.name}</h3>
            <p>{mt.overview}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default MediaCarousel;