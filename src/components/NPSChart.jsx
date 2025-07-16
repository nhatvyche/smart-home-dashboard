import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const NPSChart = ({ data }) => {
  const cities = [...new Set(data.map(item => item.city))];
  const months = [...new Set(data.map(item => item.month))];

  const groupedData = months.map(month => {
    const entry = { month };
    cities.forEach(city => {
      const record = data.find(d => d.month === month && d.city === city);
      entry[city] = record ? record.NPS : 0; // <<==== Capital NPS
    });
    return entry;
  });

  const colors = ['#82ca9d', '#8884d8', '#ffc658', '#ff7300'];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={groupedData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        {cities.map((city, index) => (
          <Line
            key={city}
            type="monotone"
            dataKey={city}
            stroke={colors[index % colors.length]}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default NPSChart;
