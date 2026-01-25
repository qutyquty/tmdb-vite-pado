import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const MediaIntro = ({ data, type }) => {
  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

  return (
    <>
      {/** backdrop */}
      <div 
        style={{
          backgroundImage: `url(${BACKDROP_BASE_URL}${data.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          padding: "40px",
          color: "white",
        }} 
      >
        {/* 어두운 오버레이 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)", // 반투명 검정
            zIndex: 1,
          }}
        ></div>

        {/* 텍스트 영역 */}
        <div style={{ position: "relative", zIndex: 2 }}>
        <Row>
          {/** 왼쪽 포스터 */}
          <Col md={4}>
            <Card.Img src={`${IMG_BASE_URL}${data.poster_path}`}
              alt={data.title || data.name}
              style={{ borderRadius: "8px" }}
            />
          </Col>

          {/** 오른쪽 정보 */}
          <Col md={8}>
            <h2>{data.title || data.name}</h2>
            <p>📅 {data.release_date || data.first_air_date}</p>
            <p>
              🎭 장르: {" "}
              {data.genres && data.genres.map((g) => g.name).join(", ")}
            </p>

            {/** 영화일 경우 상영시간 */}
            {type === "movie" && data.runtime && (
              <p>⏱ 상영시간: {data.runtime}분</p>
            )}

            {/** TV일 경우 시즌/에피소드 */}
            {type === "tv" && (
              <>
                <p>📺 시즌 수: {data.number_of_seasons}</p>
                <p>🎬 에피소드 수: {data.number_of_episodes}</p>
              </>
            )}

            <p>{data.overview}</p>
          </Col>          
        </Row>
        </div>
      </div>    
    </>
  );
};

export default MediaIntro;