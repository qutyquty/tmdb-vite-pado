import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { genreColors } from "../config/genreConfig";
import { processGenreData } from "../utils/utils";

const GenreChart = ({ mts, genreMap }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (mts && mts.length > 0) {  
      const processed = processGenreData(mts, genreMap);
      setData(processed);
    }
  }, [mts, genreMap]);

  // 커스텀 라벨 함수
  const renderCustomizedLabel = ({ name, percent }) => {
    return `${(percent * 100).toFixed(1)}%`;
  };

  return (
    <>
      <Row>
        <Col md={6} xs={12}>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={data} 
                  cx="50%" cy="50%"
                  outerRadius="80%"
                  dataKey="value"
                  label={renderCustomizedLabel}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={genreColors[entry.name] || "#8884d8"} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout='vertical' verticalAlign='middle' align='right' />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default GenreChart