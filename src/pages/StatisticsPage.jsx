import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import { getPopularMovies, getPopularTvs } from '../api/tmdbApi';
import { movieGenreMap, tvGenreMap } from "../config/genreConfig";
import GenreChart from '../components/GenreChart';

const StatisticsPage = () => {
  const [movies, setMovies] = useState([]);
  const [tvs, setTvs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataMovies = await getPopularMovies(5); // 5페이지(5*20) -> 100개
        setMovies(dataMovies);

        const dataTvs = await getPopularTvs(5); // 5페이지(5*20) -> 100개
        setTvs(dataTvs);
      } catch (error) {
        console.error("StatisticsPage 에러: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className='mt-4'>
      <h2>인기 영화 TOP 100 장르별 분포</h2>
      <GenreChart mts={movies} genreMap={movieGenreMap} />
      <h2>인기 TV TOP 100 장르별 분포</h2>
      <GenreChart mts={tvs} genreMap={tvGenreMap} />
    </Container>
  );
};

export default StatisticsPage;