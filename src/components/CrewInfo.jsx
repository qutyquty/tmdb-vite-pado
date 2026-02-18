import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';

import './ActorInfo.css';

const CrewInfo = ({ crew }) => {

  const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";

  if (!crew) return null;
  
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
          {crew.profile_path && (
            <Card.Img
              src={`${IMG_BASE_URL}${crew.profile_path}`}
              alt={crew.name}
              style={{ borderRadius: "8px" }}
            />
          )}
        </Col>

        {/* 오른쪽 정보 */}
        <Col md={8}>
          <h2>
            {crew.name}{" "}
          </h2>
          {crew.birthday && <p>🎂 {crew.birthday}</p>}
          {crew.place_of_birth && <p>📍 {crew.place_of_birth}</p>}
          {crew.known_for_department && <p>🎭 {crew.known_for_department}</p>}
          {crew.biography && <p>{crew.biography}</p>}
        </Col>
      </Row>
    </div>
  );
};

export default CrewInfo;