import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

import { getMovieGenres, getMoviesByGenre } from '../api/tmdbApi';
import MediaList from '../components/MediaList';
import GenreBar from '../components/GenreBar';
import SortSelect from '../components/SortSelect';

const GenrePage = () => {
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState("popularity.desc");

  // 장르 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMovieGenres();
        setGenres(data.genres);
      } catch (error) {
        console.error("장르 가져오기 실패: ", error);
      }
    };
    fetchData();
  }, []);

  // 영화 가져오기
  const fetchMovies = async (genreId, pageNum, sortOption) => {
    const data = await getMoviesByGenre(genreId, pageNum, sortOption);

    if (pageNum === 1) {
      // 장르 선택 시 초기화
      setMovies(data.results);
    } else {
      // 무한 스크롤 시 이어 붙이기
      setMovies((prev) => [...prev, ...data.results]);
    }
    setHasMore(data.page < data.total_pages);
    setPage(pageNum + 1);
  };

  // 장르 선택 시 첫 페이지 로드
  useEffect(() => {
    if (selectedGenre) {
      fetchMovies(selectedGenre, 1, sortBy);
    }
  }, [selectedGenre, sortBy]);

  // 무한 스크롤에서 다음 페이지 로드
  const fetchMoreMovies = () => {
    if (selectedGenre) {
      fetchMovies(selectedGenre, page, sortBy);
    }
  };

  return (
    <Container className='mt-4'>
      <h2 className="my-3">🎬 영화 장르 탐색</h2>
      <GenreBar genres={genres} selectedGenre={selectedGenre} onSelect={setSelectedGenre} />
      <div className="mb-2"></div>   {/* 아래쪽에 margin 추가 */}
      <SortSelect sortBy={sortBy} onChange={setSortBy} />
      <div className="mb-4"></div>   {/* 아래쪽에 margin 추가 */}

      {selectedGenre ? (
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMoreMovies}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={<p style={{ textAlign: "center" }}>모든 영화를 불러왔습니다 🎉</p>}
        >
          <MediaList items={movies} type={"movie"} />
        </InfiniteScroll>
      ) : (
        <p>장르를 선택해주세요.</p>
      )}
    </Container>
  );
}

export default GenrePage;