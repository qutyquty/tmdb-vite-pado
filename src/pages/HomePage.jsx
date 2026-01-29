import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import { getPopularMovies, getPopularTvs } from '../api/tmdbApi';
import MediaCarousel from '../components/MediaCarousel';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [tvs, setTvs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataMovies = await getPopularMovies(1);
        setMovies(dataMovies.slice(0, 10));

        const dataTvs = await getPopularTvs(1);
        setTvs(dataTvs.slice(0, 10));
      } catch (error) {
        console.error("HomePage 에러; ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className='mt-4'>
      <h2 className="text-center my-4">인기 영화 TOP 10</h2>
      { movies.length > 0 ? (
          <MediaCarousel mts={movies} type={"movie"} />
        ) : (
          <p className='text-center'>영화를 불러오는 중...</p>
        )
      }
      <h2 className="text-center my-4">인기 TV TOP 10</h2>
      { tvs.length > 0 ? (
          <MediaCarousel mts={tvs} type={"tv"} />
        ) : (
          <p className='text-center'>TV를 불러오는 중...</p>
        )
      }
    </Container>
  );
};

export default HomePage;