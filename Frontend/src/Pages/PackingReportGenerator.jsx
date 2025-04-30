import React, { useState } from 'react';
import './PackingReportGenerator.css';

const PackingReportGenerator = () => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [weather, setWeather] = useState('');
  const [report, setReport] = useState('');
  const [error, setError] = useState('');

  const generateReport = () => {
    if (!destination || !duration || !weather) {
      setError('Please select all fields before generating the report.');
      setReport('');
      return;
    }
    setError('');

    let items = [];

    // Essentials
    items.push('Passport / ID');
    items.push('Travel tickets (plane/train/bus)');
    items.push('Accommodation confirmations');
    items.push('Wallet with cash & credit/debit cards');
    items.push('Phone + charger');
    items.push('Power bank');
    items.push('Travel adapter');
    items.push('Headphones/earbuds');
    items.push('Camera');
    items.push('Toiletries (toothbrush, toothpaste, deodorant)');
    items.push('Sunscreen & bug spray');
    items.push('Medications & first-aid kit');
    items.push('Reusable water bottle');
    items.push('Snacks');
    items.push('Notebook & pen');
    items.push('Face masks & hand sanitizer');

    // Destination-based
    if (destination === 'Beach') {
      items.push('Swimsuit', 'Beach towel', 'Sunscreen', 'Flip-flops');
    } else if (destination === 'Mountain') {
      items.push('Hiking boots', 'Warm layers', 'Backpack', 'Flashlight');
    } else if (destination === 'City') {
      items.push('Comfortable walking shoes', 'City map or guidebook');
    }

    // Weather-based
    if (weather === 'Rainy') {
      items.push('Umbrella', 'Raincoat', 'Waterproof shoes');
    } else if (weather === 'Cold') {
      items.push('Warm jacket', 'Gloves', 'Scarf', 'Beanie');
    } else if (weather === 'Hot') {
      items.push('Hat', 'Sunglasses', 'Light clothing');
    }

    // Duration-based
    const days = parseInt(duration, 10);
    if (!isNaN(days)) {
      if (days >= 3) items.push('Extra clothes', 'Additional toiletries');
      if (days >= 7) items.push('Laundry bag', 'Travel detergent', 'Extra snacks');
    }

    setReport(items.join('\n'));
  };

  return (
    <div className="background-wrapper">
      <div className="packing-container">
        <h1>Packing Report Generator</h1>

        <div className="input-group">
          <label>Destination:</label>
          <select value={destination} onChange={(e) => setDestination(e.target.value)}>
            <option value="">-- Select Destination --</option>
            <option value="Beach">Beach</option>
            <option value="Mountain">Mountain</option>
            <option value="City">City</option>
          </select>
        </div>

        <div className="input-group">
          <label>Duration (days):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g., 5"
          />
        </div>

        <div className="input-group">
          <label>Weather:</label>
          <select value={weather} onChange={(e) => setWeather(e.target.value)}>
            <option value="">-- Select Weather --</option>
            <option value="Hot">Hot</option>
            <option value="Cold">Cold</option>
            <option value="Rainy">Rainy</option>
          </select>
        </div>

        {error && <div className="error">{error}</div>}

        <button onClick={generateReport}>Generate Packing Report</button>

        {report && (
          <div className="report-box">
            <h2>Packing List:</h2>
            <pre>{report}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackingReportGenerator;
