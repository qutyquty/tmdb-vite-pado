import React from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';

import './ActorInfo.css';

const ActorInfo = ({ actor, knownFor, images }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6, // 한 화면에 6개
    slidesToScroll: 6, // 한번에 6개씩 이동
    responsive: [
      {
        breakpoint: 992, // 화면이 작아지면
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

  if (!actor) return null;
  
  return (
    <div
      style={{
        background: "linear-gradient(to right, #000, #333)", // fallback 배경
        position: "relative",
        padding: "40px",
        color: "white",
      }}
    >
      <Row>
        {/* 왼쪽 프로필 */}
        <Col md={4}>
          {actor.profile_path && (
            <Card.Img
              src={`${IMG_BASE_URL}${actor.profile_path}`}
              alt={actor.name}
              style={{ borderRadius: "8px" }}
            />
          )}
        </Col>

        {/* 오른쪽 정보 */}
        <Col md={8}>
          <h2>{actor.name}</h2>
          {actor.birthday && <p>🎂 {actor.birthday}</p>}
          {actor.place_of_birth && <p>📍 {actor.place_of_birth}</p>}
          {actor.known_for_department && <p>🎭 {actor.known_for_department}</p>}
          {actor.biography && <p>{actor.biography}</p>}
        </Col>
      </Row>

      {/* 대표작 */}
      <div className="mt-4">
        <h3>대표작 (영화+TV 주연작 중 TMDB vote_count 기준 내림차순)</h3>
        <Slider {...settings}>
          {knownFor.map((work) => (
            <div key={work.id} style={{ padding: "0 8px" }}>
              <Card className="h-100 d-flex flex-column border shadow-sm">
                {work.poster_path && (
                  <Link to={`/${work.media_type}/${work.id}`}>
                    <Card.Img
                      variant="top"
                      src={`${IMG_BASE_URL}${work.poster_path}`}
                      alt={work.title || work.name}
                      style={{ objectFit: "cover", height: "250px" }} // 이미지 높이 고정
                    />
                  </Link>
                )}
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title className='card-title' style={{ fontSize: "0.9rem" }}>
                    {work.media_type === "movie" ? "🎬" : "📺"}
                    {" "}
                    {work.title || work.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          ))}
        </Slider>
      </div>

      {/* 배우 이미지 갤러리 */}
      <div className="mt-4">
        <h3>배우 이미지</h3>
        <Slider {...settings}>
          {images.slice(0, 20).map((img, idx) => (
            <Col md={2} key={idx} className="mb-3">
              <Card className="h-100 border shadow-sm">
                <Card.Img
                  variant="top"
                  src={`${IMG_BASE_URL}${img.file_path}`}
                  alt={`actor-img-${idx}`}
                />
              </Card>
            </Col>
          ))}          
        </Slider>
      </div>
    </div>
  );
};

export default ActorInfo;