import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const NpsCsatDualAxisChart = ({ data }) => {
  const months = [...new Set(data.map(d => d.month))];

  const groupedData = months.map(month => {
    const records = data.filter(d => d.month === month);

    let totalNps = 0;
    let totalCsat = 0;
    let totalUsers = 0;

    records.forEach(d => {
      const users = d.monthlyActiveUsers || 1;
      totalNps += d.NPS * users;
      totalCsat += d.CSAT * users;
      totalUsers += users;
    });

    return {
      month,
      nationalNps: totalUsers ? totalNps / totalUsers : 0,
      nationalCsat: totalUsers ? totalCsat / totalUsers : 0,
    };
  });

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={groupedData} margin={{ top: 20, right: 40, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis yAxisId="left" domain={[0, 100]} tickFormatter={t => `${t}%`} />
          <YAxis yAxisId="right" orientation="right" domain={[-100, 100]} />
          <Tooltip />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="nationalCsat"
            name="CSAT (%)"
            stroke="#82ca9d"
            strokeWidth={3}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="nationalNps"
            name="NPS"
            stroke="#8884d8"
            strokeWidth={3}
            strokeDasharray="4 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NpsCsatDualAxisChart;
