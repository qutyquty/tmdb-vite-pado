import { useState } from 'react';
import { Row, Tab, Tabs } from 'react-bootstrap';
import MediaCard from './MediaCard';

const CrewCredits = ({ movies, tvShows }) => {
  const [key, setKey] = useState("movies");
  
  return (
    <Tabs id="crew-credits-tabs"
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

export default CrewCredits;