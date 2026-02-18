import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';

import { getMovieDetail, getTvDetail, getMovieCredits, getTvCredits, 
  getMovieVideos, getTvVideos, 
} from '../api/tmdbApi';
import MediaDetail from '../components/MediaDetail';

const DetailPage = () => {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [casts, setCasts] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === "movie") {
          const movie = await getMovieDetail(id);
          const { cast, directors } = await getMovieCredits(id);
          const video = await getMovieVideos(id);
          setData(movie);
          setCasts(cast);
          setDirectors(directors);
          setVideos(video);
        } else if (type === "tv") {
          const tv = await getTvDetail(id);
          const cast = await getTvCredits(id);
          const video = await getTvVideos(id);
          setData(tv);
          setCasts(cast);
          setVideos(video);
        }
      } catch (error) {
        console.error("DetailPage 에러: ", error);
      }
    };
    fetchData();
  }, [type, id]);

  if (!data) {
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
      <MediaDetail data={data} directors={directors} casts={casts} videos={videos} type={type} />
    </Container>
  );
};

export default DetailPage;