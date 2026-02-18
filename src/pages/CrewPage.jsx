import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

import { getCrewMovieCredits, getCrewTvCredits, getCrewDetail } from "../api/tmdbApi";
import CrewCredits from '../components/CrewCredits';
import CrewInfo from '../components/CrewInfo';

const CrewPage = () => {
  const { id } = useParams();
  const [crew, setCrew] = useState(null);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const crewDetail = await getCrewDetail(id);
        const movieCredits = await getCrewMovieCredits(id);
        const tvCredits = await getCrewTvCredits(id);

        // 영화: 개봉일 기준 내림차순 정렬
        const sortedMovies = movieCredits
          .filter((m) => m.release_date)
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        
        // TV: 첫방영일 기준 내림차순 정렬
        const sortedTv = tvCredits
          .filter((t) => t.first_air_date)
          .sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date));

        setCrew(crewDetail);
        setMovies(sortedMovies);
        setTvShows(sortedTv);
      } catch (error) {
        console.error("CrewPage 에러: ", error);
      }
    };
    fetchData();
  }, [id]);

  if (!crew) {
    return (
      <div className='text-center my-4'>
        <Spinner animation='border' role='status' variant='primary'>
          <span className='visually-hidden'>Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container className='mt-4'>      
      <CrewInfo crew={crew} />
      <div className='mt-4'>
        <CrewCredits movies={movies} tvShows={tvShows} />
      </div>
    </Container>
  );
};

export default CrewPage;