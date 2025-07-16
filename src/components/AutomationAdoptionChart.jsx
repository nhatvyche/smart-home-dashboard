import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const AutomationAdoptionChart = ({ data }) => {
  const groupedData = [];

  const months = [...new Set(data.map(d => d.month))];
  const cities = [...new Set(data.map(d => d.city))];

  months.forEach(month => {
    const entry = { month };
    cities.forEach(city => {
      const record = data.find(d => d.month === month && d.city === city);
      entry[city] = record ? record.automationAdoption : 0;
    });
    groupedData.push(entry);
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={groupedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {cities.map((city, index) => (
          <Line
            key={city}
            type="monotone"
            dataKey={city}
            name={city}
            stroke={['#ff7300', '#ffc658', '#8884d8', '#82ca9d'][index % 4]}
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AutomationAdoptionChart;
