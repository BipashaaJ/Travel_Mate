const express = require("express");
const PackageBooking = require("../models/PackageBooking"); // Ensure correct casing
const sendMail = require("../utils/sendMail");
const router = express.Router();

// POST route to save a new booking
router.post("/", async (req, res) => {
  const bookingDetails = req.body;

  // Check if required fields are missing
  if (
    !bookingDetails.customerName ||
    !bookingDetails.email ||
    !bookingDetails.contactNumber ||
    !bookingDetails.numberOfPeople ||
    !bookingDetails.address ||
    bookingDetails.totalPrice === undefined ||
    !bookingDetails.cardName ||
    !bookingDetails.startDate // Add this field if it's required
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Create a new booking
    const newBooking = new PackageBooking(bookingDetails);

    // Save the booking
    await newBooking.save();

    // Respond with success
    res
      .status(201)
      .json({ message: "Booking saved successfully", booking: newBooking });

    // Send a confirmation email
    const htmlContent = `
    <html>
        <body>
        <h2>Your package has been created successfully!</h2>
        <p>
            <strong>Customer Name:</strong> ${bookingDetails.customerName}<br>
            <strong>Your Number:</strong> ${bookingDetails.contactNumber}<br>
            <strong>Email:</strong> ${bookingDetails.email}<br>
            <strong>No of People:</strong> ${bookingDetails.numberOfPeople}<br>
            <strong>Start Date:</strong> ${bookingDetails.startDate}<br>
            <strong>Price:</strong> ${bookingDetails.totalPrice}<br>
        </p>
        <p>Thank you for choosing our service!</p>
        </body>
    </html>
    `;

    // Send the email using a utility function (ensure it's properly defined)
    sendMail({
      to: bookingDetails.email,
      subject: "Package Created",
      text: `${bookingDetails.packageName} package has been created successfully.`,
      html: htmlContent,
    });

  } catch (error) {
    // Log the error and return a message
    console.error("Error saving booking:", error.message);
    res
      .status(500)
      .json({ message: "Error saving booking", error: error.message });
  }
});

// GET route to search bookings
router.get("/search", async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    const bookings = await PackageBooking.find({
      $or: [
        { customerName: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
      ],
    });
    res.json(bookings);
  } catch (error) {
    console.error("Error searching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET route to retrieve all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await PackageBooking.find();
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error retrieving bookings:", error.message);
    res
      .status(500)
      .json({ message: "Error retrieving bookings", error: error.message });
  }
});

// GET route to retrieve a booking by ID
router.get("/:id", async (req, res) => {
  try {
    const booking = await PackageBooking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(booking);
  } catch (error) {
    console.error("Error retrieving booking:", error.message);
    res
      .status(500)
      .json({ message: "Error retrieving booking", error: error.message });
  }
});

// PUT route to update a booking by ID
router.put("/:id", async (req, res) => {
  const bookingDetails = req.body;
  try {
    const updatedBooking = await PackageBooking.findByIdAndUpdate(
      req.params.id,
      bookingDetails,
      { new: true }
    );
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error updating booking:", error.message);
    res
      .status(500)
      .json({ message: "Error updating booking", error: error.message });
  }
});

// DELETE route to remove a booking by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBooking = await PackageBooking.findByIdAndDelete(
      req.params.id
    );
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error.message);
    res
      .status(500)
      .json({ message: "Error deleting booking", error: error.message });
  }
});

module.exports = router;
