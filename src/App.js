import React from 'react';
import data from './data/smartHomeData.json';

import PairingRateChart from './components/PairingRateChart';
import SupportTicketsChart from './components/SupportTicketsChart';
import ActiveDevicesChart from './components/ActiveDevicesChart';
import AutomationAdoptionChart from './components/AutomationAdoptionChart';
import NPSChart from './components/NPSChart';
import CSATChart from './components/CSATChart';
import NpsCsatDualAxisChart from './components/NpsCsatDualAxisChart';


function App() {
  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', color: '#fff' }}>
      <h1 style={{ textAlign: 'center', paddingTop: '20px' }}>Smart Home Dashboard</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1rem',
          padding: '20px',
        }}
      >
        <div style={cardStyle}>
          <h2>Pairing Success Rate by City</h2>
          <PairingRateChart data={data} />
        </div>

        <div style={cardStyle}>
          <h2>Support Tickets by City</h2>
          <SupportTicketsChart data={data} />
        </div>

        <div style={cardStyle}>
          <h2>Monthly Active Devices</h2>
          <ActiveDevicesChart data={data} />
        </div>

        <div style={cardStyle}>
          <h2>Automation Adoption % by City</h2>
          <AutomationAdoptionChart data={data} />
        </div>

        <div style={cardStyle}>
          <h2>NPS by City</h2>
          <NPSChart data={data} />
        </div>

        <div style={cardStyle}>
          <h2>CSAT % by City</h2>
          <CSATChart data={data} />
        </div>
        <div style={cardStyle}>
          <h2>National NPS vs. CSAT (Dual Axis)</h2>
          <NpsCsatDualAxisChart data={data} />
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: '#1e1e1e',
  padding: '16px',
  borderRadius: '12px',
};

export default App;
