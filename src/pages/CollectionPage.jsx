import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

import { getCollection } from "../api/tmdbApi";
import MediaList from '../components/MediaList';

const CollectionPage = () => {
  const { id } = useParams();
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCollection(id);
        setCollection(data);
      } catch (error) {
        console.error("컬렉션 불러오기 실패: ", error);
      }
    };
    fetchData();
  }, [id]);

    if (!collection) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="mt-4">
      {/* 상단 Hero 섹션 */}
      <div
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w1280${collection.backdrop_path})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          padding: "100px 20px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* 반투명 오버레이 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        ></div>

        {/* 텍스트 */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontWeight: "bold" }}>{collection.name}</h1>
          {collection.parts?.length > 0 && (
            <p style={{ fontSize: "15px" }}>
              📅 첫 작품 개봉일: {collection.parts[0].release_date}
            </p>
          )}
          {collection.overview && (
            <p
              style={{
                maxWidth: "700px",
                margin: "20px auto",
                fontSize: "16px",
                lineHeight: "1.6",
              }}
            >
              {collection.overview}
            </p>
          )}
        </div>
      </div>

      {/* 하단 영화 리스트 */}
      <Container className="mt-5">
        <MediaList items={collection.parts} type={"movie"} />
        {/* <Row>
          {collection.parts.map((movie) => (
            <Col md={3} sm={6} xs={12} key={movie.id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
                <Card.Body className="text-center">
                  <Card.Title style={{ fontSize: "16px" }}>
                    {movie.title}
                  </Card.Title>
                  <Card.Text>📅 {movie.release_date}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row> */}
      </Container>
 
    </Container>
  );
};

export default CollectionPage;