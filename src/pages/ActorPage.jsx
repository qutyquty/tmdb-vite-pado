import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

import { getActorMovieCredits, getActorTvCredits, getActorDetail,
  getActorImages, getActorKnownFor,
  getActorTopMainRolesByVoteCount,
 } from "../api/tmdbApi";
import ActorCredits from '../components/ActorCredits';
import ActorInfo from '../components/ActorInfo';

const ActorPage = () => {
  const { id } = useParams();
  const [actor, setActor] = useState(null);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [knownFor, setKnownFor] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const actorDetail = await getActorDetail(id);
        const movieCredits = await getActorMovieCredits(id);
        const tvCredits = await getActorTvCredits(id);
        const actorImages = await getActorImages(id);
        
        // TMDB 제공 대표작(3개)
        const baseKnowFor = await getActorKnownFor(actorDetail.name);

        // 배우가 주연으로 나온 영화 중 투표수 상위 20개
        const topMainRoles = await getActorTopMainRolesByVoteCount(id, 20);

        // 영화: 개봉일 기준 내림차순 정렬
        const sortedMovies = movieCredits
          .filter((m) => m.release_date)
          .sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        
        // TV: 첫방영일 기준 내림차순 정렬
        const sortedTv = tvCredits
          .filter((t) => t.first_air_date)
          .sort((a, b) => new Date(b.first_air_date) - new Date(a.first_air_date));

        setActor(actorDetail);
        setMovies(sortedMovies);
        setTvShows(sortedTv);
        setKnownFor(topMainRoles);
        setImages(actorImages);
      } catch (error) {
        console.error("ActorPage 에러: ", error);
      }
    };
    fetchData();
  }, [id]);

  if (!actor) {
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
      <ActorInfo actor={actor} knownFor={knownFor} images={images} />
      <div className='mt-4'>
        <ActorCredits movies={movies} tvShows={tvShows} />
      </div>
    </Container>
  );
};

export default ActorPage;