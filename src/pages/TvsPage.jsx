import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

import { getPopularTvs } from '../api/tmdbApi';
import MediaList from '../components/MediaList';

const TvsPage = () => {
  const [tvs, setTvs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPopularTvs();
        setTvs(data);
      } catch (error) {
        console.error("TvsPage 에러: ", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container className='mt-4'>
      <h2>인기 TV</h2>
      <MediaList items={tvs} type={"tv"} />
    </Container>
  );
};

export default TvsPage;