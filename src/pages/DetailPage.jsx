import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { getMovieDetail, getTvDetail, getMovieCredits, getTvCredits, 
  getMovieVideos, getTvVideos, 
} from '../api/tmdbApi';
import MediaDetail from '../components/MediaDetail';

const DetailPage = () => {
  const { type, id } = useParams();
  const [data, setData] = useState(null);
  const [credits, setCredits] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (type === "movie") {
          const movie = await getMovieDetail(id);
          const cast = await getMovieCredits(id);
          const video = await getMovieVideos(id);
          setData(movie);
          setCredits(cast);
          setVideos(video);
        } else if (type === "tv") {
          const tv = await getTvDetail(id);
          const cast = await getTvCredits(id);
          const video = await getTvVideos(id);
          setData(tv);
          setCredits(cast);
          setVideos(video);
        }
      } catch (error) {
        console.error("DetailPage 에러: ", error);
      }
    };
    fetchData();
  }, [type, id]);

  if (!data) return <p>Loading...</p>;

  return (
    <Container className='mt-4'>
      <MediaDetail data={data} credits={credits} videos={videos} type={type} />
    </Container>
  );
};

export default DetailPage;