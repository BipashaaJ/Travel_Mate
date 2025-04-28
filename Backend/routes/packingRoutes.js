const express = require("express");
const router = express.Router();
const packingController = require('../controllers/packingController');

// Packing report generation logic
router.post("/generate", (req, res) => {
    const { destination, duration, weather } = req.body;

    if (!destination || !duration || !weather) {
        return res.status(400).json({ error: "All fields are required" });
    }

    let items = [
        "Travel documents (ID, tickets, itinerary)",
        "Money, credit cards, and important contacts",
        "Phone and charger",
        "Water and food",
        "Power bank"
    ];

    if (destination.toLowerCase().includes("beach")) {
        items.push("Swimsuit", "Sunscreen", "Flip-flops");
    }

    res.json({ packingList: items }); // Ensure correct response structure
});

module.exports = router;
