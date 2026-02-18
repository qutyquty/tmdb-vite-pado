import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

const CastList = ({ casts, directors }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6, // 기본 PC 화면
    slidesToScroll: 6, // 한번에 6개씩 이동
    responsive: [
      {
        breakpoint: 1024, // 태블릿 (1024px 이하)
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768, // 모바일 (768px 이하)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

  return (
    <div className='p-4'>
      <h3>주요 스태프&출연진</h3>
      <Slider {...settings}>
        {directors && directors.map((d) => (
          <Col md={2} key={d.id} className='mb-4'>
            <Card className='h-100 boarder shadow-sm'>
              <Link to={`/crew/${d.id}`}>
                {d.profile_path && (
                  <Card.Img variant='top'
                    src={`${IMG_BASE_URL}${d.profile_path}`}
                    alt={d.name}
                  />
                )}
              </Link>
              <Card.Body>
                <Card.Title className='mb-2'>{d.name}</Card.Title>
                <Card.Text className='text-muted'>Director</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
        {casts.slice(0, 10).map((actor) => (
          <Col md={2} key={actor.cast_id || actor.credit_id} className='mb-4'>
            <Card className='h-100 boarder shadow-sm'>
              <Link to={`/actor/${actor.id}`}>
                {actor.profile_path && (
                  <Card.Img variant='top'
                    src={`${IMG_BASE_URL}${actor.profile_path}`}
                    alt={actor.name}
                  />
                )}
              </Link>
              <Card.Body>
                <Card.Title className='mb-2'>{actor.name}</Card.Title>
                <Card.Text className='text-muted'>{actor.character}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Slider>
    </div>
  );
};

export default CastList;