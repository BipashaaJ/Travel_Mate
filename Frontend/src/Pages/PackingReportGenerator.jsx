import React, { useState } from 'react';

const PackingReportGenerator = () => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [weather, setWeather] = useState('');
  const [report, setReport] = useState('');

  const generateReport = () => {
    let items = [];

    // Always include these essentials
    items.push('Travel documents (ID, tickets, itinerary)');
    items.push('Money, credit cards, and important contacts');
    items.push('Phone and charger');

    // Destination-based suggestions
    if (destination.toLowerCase().includes('beach')) {
      items.push('Swimsuit');
      items.push('Sunscreen');
      items.push('Flip-flops');
    } else if (destination.toLowerCase().includes('mountain')) {
      items.push('Hiking boots');
      items.push('Warm layers');
      items.push('Backpack');
    } else if (destination.toLowerCase().includes('city')) {
      items.push('Comfortable walking shoes');
      items.push('Guidebook or maps');
    }

    // Weather-based suggestions
    if (weather.toLowerCase().includes('rain')) {
      items.push('Umbrella');
      items.push('Raincoat');
    } else if (weather.toLowerCase().includes('cold')) {
      items.push('Jacket');
      items.push('Gloves');
      items.push('Beanie');
    } else if (weather.toLowerCase().includes('hot')) {
      items.push('Hat');
      items.push('Sunglasses');
      items.push('Light clothing');
    }

    // Duration-based suggestions
    const days = parseInt(duration, 10);
    if (!isNaN(days)) {
      if (days >= 3) {
        items.push('Extra changes of clothes');
        items.push('Additional toiletries');
      }
      if (days >= 7) {
        items.push('Portable charger');
        items.push('First aid kit');
        items.push('Extra snacks');
      }
    }

    // Join items into a formatted report string
    setReport(items.join('\n'));
  };

  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Packing Report Generator</h1>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Destination:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="e.g., Beach, Mountain, City"
          style={{ padding: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Duration (days):</label>
        <input
          type="number"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholder="e.g., 5"
          style={{ padding: '5px' }}
        />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ marginRight: '10px' }}>Weather:</label>
        <input
          type="text"
          value={weather}
          onChange={(e) => setWeather(e.target.value)}
          placeholder="e.g., Hot, Cold, Rainy"
          style={{ padding: '5px' }}
        />
      </div>
      <button onClick={generateReport} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Generate Packing Report
      </button>
      {report && (
        <div
          style={{
            whiteSpace: 'pre-wrap',
            marginTop: '20px',
            border: '1px solid #ccc',
            padding: '15px',
            borderRadius: '4px',
            backgroundColor: '#f9f9f9'
          }}
        >
          <h2>Packing List:</h2>
          <p>{report}</p>
        </div>
      )}
    </div>
  );
};

export default PackingReportGenerator;
