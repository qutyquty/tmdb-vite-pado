import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

const CastList = ({ credits }) => {
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
  console.log("credits: ", credits);

  return (
    <div className='p-4'>
      <h3>주요 출연진</h3>
      <Slider {...settings}>
        {credits.slice(0, 10).map((actor) => (
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