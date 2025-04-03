import React, { useState } from "react";

const TravelPlanner = () => {
  const [destination, setDestination] = useState("");
  const [days, setDays] = useState("");
  const [weather, setWeather] = useState("");
  const [items, setItems] = useState([]);

  const generateItems = () => {
    let essentials = ["Passport", "Tickets", "Phone Charger", "Wallet"];
    let weatherItems =
      weather.toLowerCase() === "cold"
        ? ["Jacket", "Gloves", "Boots"]
        : weather.toLowerCase() === "hot"
        ? ["Sunglasses", "Sunscreen", "Hat"]
        : ["Umbrella", "Light Jacket"];

    let tripItems = [...essentials, ...weatherItems];

    if (parseInt(days) > 3) {
      tripItems.push("Extra Clothes", "Laundry Bag");
    }

    setItems(tripItems);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>AI Travel Assistant</h2>
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "5px", width: "100%" }}
      />
      <input
        type="number"
        placeholder="Number of Days"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "5px", width: "100%" }}
      />
      <input
        type="text"
        placeholder="Weather (Hot, Cold, Rainy)"
        value={weather}
        onChange={(e) => setWeather(e.target.value)}
        style={{ display: "block", margin: "10px 0", padding: "5px", width: "100%" }}
      />
      <button onClick={generateItems} style={{ padding: "10px", width: "100%", cursor: "pointer" }}>
        Generate Packing List
      </button>

      {items.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Packing List</h3>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TravelPlanner;
