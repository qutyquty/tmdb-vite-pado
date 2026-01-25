import React, { useState } from 'react';
import { Card, Col, Row, Tab, Tabs } from 'react-bootstrap';
import MediaCard from './MediaCard';

const ActorCredits = ({ movies, tvShows }) => {
  const [key, setKey] = useState("movies");
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
  
  return (
    <Tabs id="actor-credits-tabs"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className='mb-3'
    >
      <Tab eventKey="movies" title="영화">
        <Row>
          {movies.map((movie) => (
            <MediaCard key={movie.id} item={movie} type={"movie"} />
          ))}
        </Row>
      </Tab>

      <Tab eventKey="tv" title="TV">
        <Row>
          {tvShows.map((tv) => (
            <MediaCard key={tv.id} item={tv} type={"tv"} />
          ))}
        </Row>
      </Tab>
    </Tabs>
  );
};

export default ActorCredits;