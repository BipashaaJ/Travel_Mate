// src/components/DisplayPackage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DisplayPackage.css';

const DisplayPackage = () => {
  const [cardData, setCardData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/package');
        if (Array.isArray(response.data)) {
          setCardData(response.data);
        } else {
          console.error('API response is not an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    fetchCardData(); // Fetch data initially

    const intervalId = setInterval(fetchCardData, 30000); // Fetch data every 30 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleBookClick = (card) => {
    navigate('/packagedetails', { state: { card } });
  };

  const filteredCards = cardData.filter(card =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <h1>Packages</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by package name or location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="package-list">
        {filteredCards.map((card) => (
          <div key={card._id} className="package-card">
            {card.image && <img src={card.image} alt={card.name} className="card-image" />}
            <h2>{card.name}</h2>
            <p className="card-price">Price: Rs{card.price}</p>
            <p className="card-location">Location: {card.location}</p>
            <p className="card-duration">Duration: {card.duration}</p>
            <button className="book-button" onClick={() => handleBookClick(card)}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayPackage;
