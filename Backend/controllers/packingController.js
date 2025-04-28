// controllers/packingController.js

const generatePackingReport = (req, res) => {
    const { destination, duration, weather } = req.body;
  
    // Validate input data
    if (!destination || !duration || !weather) {
      return res.status(400).json({ error: "All fields are required" });
    }
  
    // Initialize packing list with essential items
    let items = [
      "Travel documents (ID, tickets, itinerary)",
      "Money, credit cards, and important contacts",
      "Phone and charger",
      "Water and food",
      "Power bank"
    ];
  
    // Destination-based suggestions
    if (destination.toLowerCase().includes("beach")) {
      items.push("Swimsuit", "Sunscreen", "Flip-flops");
    } else if (destination.toLowerCase().includes("mountain")) {
      items.push("Hiking boots", "Warm layers", "Backpack", "Tent");
    } else if (destination.toLowerCase().includes("city")) {
      items.push("Comfortable walking shoes", "Guidebook or maps");
    }
  
    // Weather-based suggestions
    if (weather.toLowerCase().includes("rain")) {
      items.push("Umbrella", "Raincoat");
    } else if (weather.toLowerCase().includes("cold")) {
      items.push("Jacket", "Gloves", "Beanie");
    } else if (weather.toLowerCase().includes("hot")) {
      items.push("Hat", "Sunglasses", "Light clothing");
    }
  
    // Duration-based suggestions
    const days = parseInt(duration, 10);
    if (!isNaN(days)) {
      if (days >= 3) items.push("Extra changes of clothes", "Additional toiletries");
      if (days >= 7) items.push("First aid kit", "Extra snacks");
    }
  
    // Respond with the generated packing list
    res.json({ packingList: items });
  };
  
  module.exports = { generatePackingReport };
  