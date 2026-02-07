import { useEffect, useState } from "react";
import { useLocation, useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Image } from "react-bootstrap";

import CareerChart from "../components/CareerChart";
import { getActorCareerByYear } from "../api/tmdbApi";

const ActorStatPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const actor = location.state?.actor;
  const [careerData, setCareerData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getActorCareerByYear(id);
      console.log("data: ", data);
      setCareerData(data);
    };
    fetchData();
  }, [id]);

  if (!actor) return <p>배우 정보를 불러올 수 없습니다.</p>;

  return (
    // <Container className='mt-4'>
    //   <h2>{actor.name} 배우 커리어 연도별 출연작</h2>
    //   <CareerChart credits={careerData} />
    // </Container>
    <Container className="mt-4">
      {/* 상단: 배우 프로필 + 이름 */}
      <Row className="justify-content-center mb-4">
        <Col md="auto" className="text-center">
          <Image
            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
            roundedCircle
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          <h2 className="mt-3">{actor.name}</h2>
        </Col>
      </Row>

      {/* 하단: 차트 */}
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card>
            <Card.Body>
              <CareerChart credits={careerData} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ActorStatPage;