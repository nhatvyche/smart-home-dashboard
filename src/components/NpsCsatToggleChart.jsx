import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const NpsCsatNationalChart = ({ data }) => {
  const [metric, setMetric] = useState('NPS');
  const months = [...new Set(data.map(d => d.month))];

  const groupedData = months.map(month => {
    const filtered = data.filter(d => d.month === month);
    let totalWeighted = 0;
    let totalUsers = 0;

    filtered.forEach(d => {
      const score = d[metric];
      const users = d.monthlyActiveUsers || 1; // fallback to avoid div by 0
      totalWeighted += score * users;
      totalUsers += users;
    });

    return {
      month,
      national: totalUsers ? totalWeighted / totalUsers : 0
    };
  });

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <button onClick={() => setMetric('NPS')} disabled={metric === 'NPS'}>NPS</button>
        <button onClick={() => setMetric('CSAT')} disabled={metric === 'CSAT'} style={{ marginLeft: '10px' }}>CSAT</button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={groupedData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="national"
            stroke="#00c49f"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name={`National Avg ${metric}`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NpsCsatNationalChart;
