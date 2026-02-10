import { useNavigate } from "react-router-dom";
import { Modal, Button, Row, Col, Card } from 'react-bootstrap';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

import MediaCard from './MediaCard';

const CareerChart = ({ credits }) => {
  const navigate = useNavigate();
  const [selectedYearData, setSelectedYearData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleBarClick = (data) => {
    setSelectedYearData(data);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const getPosterUrl = (path) =>
    path ? `https://image.tmdb.org/t/p/w200${path}` : "https://placehold.co/200x300?text=No+Image";

  // const CustomTooltip = ({ active, payload, label, onCreditClick }) => {
  //   if (active && payload && payload.length) {
  //     const data = payload[0].payload;
  //     return (
  //       <div style={{ backgroundColor: "#fff", border: "1px solid #ccc", padding: "10px" }}>
  //         <p>{label}년</p>
  //         <p>
  //           주연:
  //           <ul>
  //             {data.leadCredits.map((credit) => (
  //               <li key={credit.id}>
  //                 <span style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
  //                   onClick={() => onCreditClick(credit)}
  //                 >
  //                   {credit.title} ({credit.mediaType})
  //                 </span>
  //               </li>
  //             ))}
  //           </ul>
  //         </p>
  //         <p>
  //           조연:
  //           <ul>
  //             {data.supportCredits.map((credit) => (
  //               <li key={credit.id}>
  //                 <span style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
  //                   onClick={() => onCreditClick(credit)}
  //                 >
  //                   {credit.title} ({credit.mediaType})
  //                 </span>
  //               </li>
  //             ))}
  //           </ul>
  //         </p>
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={credits} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          {/* <Tooltip content={
            <CustomTooltip onCreditClick={(credit) => {
              navigate(`/${credit.mediaType}/${credit.id}`);
            }} />
          } /> */}
          <Legend />
          <Bar dataKey="lead" stackId="a" fill="#8884d8" name="주연" 
            onClick={(data) => handleBarClick(data)}
          />
          <Bar dataKey="support" stackId="a" fill="#82ca9d" name="조연" 
            onClick={(data) => handleBarClick(data)}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedYearData?.year}년 출연작</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>주연</h5>
          <Row>
            {selectedYearData?.leadCredits.map((credit) => (
              <MediaCard key={credit.id} item={credit} type={credit.media_type} />
            ))}
          </Row>

          <h5 className="mt-4">조연</h5>
          <Row>
            {selectedYearData?.supportCredits.map((credit) => (
              <MediaCard key={credit.id} item={credit} type={credit.media_type} />
            ))}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CareerChart;