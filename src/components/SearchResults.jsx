import React from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import { Row, Col, Spinner } from "react-bootstrap";

import MediaCard from "./MediaCard";

const SearchResults = ({ results, fetchMore, hasMore }) => {
  return (
    <InfiniteScroll
      dataLength={results.length}
      next={fetchMore}
      hasMore={hasMore}
      loader={
        <div className="text-center my-4">
          <Spinner animation="border" variant="primary" />
        </div>
      }
      style={{ overflowX: "hidden" }} // 가로 스크롤 숨기기
    >
      <Row>
        {results.map((item) => (
          // <Col key={`${item.media_type}-${item.id}`} xs={12} sm={6} md={4} lg={3}>
            <MediaCard item={item} type={item.media_type} />
          // </Col>
        ))}
      </Row>
    </InfiniteScroll>
  );
};

export default SearchResults;