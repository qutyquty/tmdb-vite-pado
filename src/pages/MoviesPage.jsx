import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import { getPopularMovies } from '../api/tmdbApi';
import MediaList from '../components/MediaList';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPopularMovies();
        setMovies(data);
      } catch (error) {
        console.error("MoviesPage 에러: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className='mt-4'>
      <h2>인기 영화 TOP 20</h2>
      <MediaList items={movies} type={"movie"} />
    </Container>
  );
};

export default MoviesPage;