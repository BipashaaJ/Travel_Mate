import React, { useState } from 'react';
import axios from 'axios';

const PackingReportGenerator = () => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [weather, setWeather] = useState('');
  const [report, setReport] = useState('');
  const [error, setError] = useState('');

  const generateReport = async () => {
    setError('');
    setReport('');

    try {
      const response = await axios.post("http://localhost:3001/api/packing/generate", {
        destination,
        duration,
        weather
      });

      console.log("API Response:", response.data); // Debugging

      if (!response.data || !Array.isArray(response.data.packingList)) {
        throw new Error("Invalid response format: packingList is missing");
      }

      setReport(response.data.packingList.join('\n'));
    } catch (error) {
      console.error("Error fetching packing report:", error.message);
      setError("Failed to generate packing report. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
      <h2>Packing Report Generator (AI-Powered)</h2>
      
      <label>Destination:</label>
      <input
        type="text"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        placeholder="Enter your destination"
      />
      
      <label>Duration (days):</label>
      <input
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Enter duration"
      />
      
      <label>Weather:</label>
      <input
        type="text"
        value={weather}
        onChange={(e) => setWeather(e.target.value)}
        placeholder="Enter weather conditions"
      />
      
      <button onClick={generateReport}>Generate Report</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {report && <pre style={{ background: "#f4f4f4", padding: "10px" }}>{report}</pre>}
    </div>
  );
};

export default PackingReportGenerator;
