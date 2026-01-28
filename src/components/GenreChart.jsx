import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

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

  return (
    <>
      <Row>
        <Col>          
          <PieChart width={600} height={400}>
            <Pie data={data} 
              cx={250} cy={200}
              outerRadius={150}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={genreColors[entry.name] || "#8884d8"} />
              ))}
            </Pie>
            <Tooltip />
            <Legend layout='vertical' verticalAlign='middle' align='right' />
          </PieChart>
        </Col>
      </Row>
    </>
  );
};

export default GenreChart