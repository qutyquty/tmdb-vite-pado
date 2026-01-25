import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

import { searchMulti } from '../api/tmdbApi';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';

const SearchPage = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const handleSearch = async (q) => {
    setQuery(q);
    setPage(1);
    const data = await searchMulti(q, 1);
    setResults(data);
    setHasMore(data.length > 0);
  };

  const fetchMore = async () => {
    const nextPage = page + 1;
    const data = await searchMulti(query, nextPage);
    setResults((prev) => [...prev, ...data]);
    setPage(nextPage);
    setHasMore(data.length > 0);
  };

  return (
    <Container className='mt-4'>
      <h2>검색 페이지</h2>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={results} fetchMore={fetchMore} hasMore={hasMore} />
    </Container>
  );
};

export default SearchPage;