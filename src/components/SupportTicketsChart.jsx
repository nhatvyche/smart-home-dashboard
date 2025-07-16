import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const SupportTicketsChart = ({ data }) => {
  const groupedData = [];

  const months = [...new Set(data.map(d => d.month))];
  const cities = [...new Set(data.map(d => d.city))];

  months.forEach(month => {
    const entry = { month };
    cities.forEach(city => {
      const record = data.find(d => d.month === month && d.city === city);
      entry[city] = record ? record.supportTickets : 0;
    });
    groupedData.push(entry);
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={groupedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {cities.map((city, index) => (
          <Bar
            key={city}
            dataKey={city}
            name={city}
            fill={['#ff7300', '#ffc658', '#8884d8', '#82ca9d'][index % 4]}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SupportTicketsChart;
