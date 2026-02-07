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

const CareerChart = ({ credits }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={credits} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="lead" stackId="a" fill="#8884d8" name="주연" />
        <Bar dataKey="support" stackId="a" fill="#82ca9d" name="조연" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CareerChart;