import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import autoTable from 'jspdf-autotable';
import './AdminBookings.css';

const AdminBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState('');
    const [filteredBookings, setFilteredBookings] = useState([]);
    const navigate = useNavigate();
    const reportRef = useRef(); // ✅ Add ref

    useEffect(() => {
        fetchAllBookings();
    }, []);

    const fetchAllBookings = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:3001/api/book');
            setBookings(response.data);
            setFilteredBookings(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Error fetching bookings:', err.message);
            setError('Failed to fetch bookings');
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim() === '') {
            setFilteredBookings(bookings);
            return;
        }

        const filtered = bookings.filter((booking) => {
            const bookingDate = new Date(booking.bookingDate).toLocaleDateString();
            return (
                booking.customerName.toLowerCase().includes(query.toLowerCase()) ||
                booking.email.toLowerCase().includes(query.toLowerCase()) ||
                bookingDate === query
            );
        });

        setFilteredBookings(filtered);
    };

    const handleDownloadPDF = async () => {
        if (!reportRef.current) return;

        const downloadButton = document.querySelector('.admin-bookings-download-pdf-button');
        if (downloadButton) downloadButton.style.display = 'none'; // Hide button before capture

        try {
            // Load letterhead image
            const letterhead = new Image();
            letterhead.src = "/images/letterhead.png"; // Path relative to public folder

            letterhead.onload = async () => {
                const element = reportRef.current;
                const canvas = await html2canvas(element, { scale: 2, useCORS: true });

                if (downloadButton) downloadButton.style.display = 'inline-block'; // Restore button

                const imgData = canvas.toDataURL("image/png");
                const doc = new jsPDF("p", "mm", "a4");

                // Add letterhead image
                doc.addImage(letterhead, "PNG", 10, 10, 190, 25);

                doc.setFontSize(20);
                doc.setTextColor(128, 0, 128); // Purple
                doc.text("Booking Report", 70, 45);

                doc.setFontSize(12);
                doc.setTextColor(0, 0, 0);
                doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 10, 55);

                autoTable(doc, {
                    startY: 60,
                    head: [['Package', 'Customer', 'Email', 'Contact', 'People', 'Address', 'Total', 'Date']],
                    body: filteredBookings.map(b => [
                        b.package?.name || 'N/A',
                        b.customerName,
                        b.email,
                        b.contactNumber,
                        b.numberOfPeople,
                        b.address,
                        `Rs ${b.totalPrice}`,
                        new Date(b.bookingDate).toLocaleDateString()
                    ]),
                    theme: "grid",
                    styles: { fontSize: 10 },
                    headStyles: { fillColor: [212, 172, 13] } // Gold header
                });

                doc.save("booking_report.pdf");
            };
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF.");
            if (downloadButton) downloadButton.style.display = 'inline-block';
        }
    };

    const handleEdit = (booking) => {
        navigate(`/admin/bookings/edit/${booking._id}`);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this booking?')) {
            try {
                await axios.delete(`http://localhost:3001/api/book/${id}`);
                fetchAllBookings();
            } catch (err) {
                console.error('Error deleting booking:', err);
            }
        }
    };

    if (loading) return <p>Loading bookings...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="admin-bookings-wrapper">
            <div className="admin-bookings-container" ref={reportRef}>
                <button className="admin-bookings-back-button" onClick={() => navigate('/admin/travel')}>
                    Back to Travel Management
                </button>
                <h1>All Bookings</h1>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name, email, or date (MM/DD/YYYY)"
                    />
                    <button type="submit">Search</button>
                </form>
                <button onClick={handleDownloadPDF} className="admin-bookings-download-pdf-button">Download PDF</button>

                <table>
                    <thead>
                        <tr>
                            <th>Package Name</th>
                            <th>Customer Name</th>
                            <th>Email</th>
                            <th>Contact Number</th>
                            <th>Number of People</th>
                            <th>Address</th>
                            <th>Total Price</th>
                            <th>Booking Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>{booking.package ? booking.package.name : 'N/A'}</td>
                                    <td>{booking.customerName}</td>
                                    <td>{booking.email}</td>
                                    <td>{booking.contactNumber}</td>
                                    <td>{booking.numberOfPeople}</td>
                                    <td>{booking.address}</td>
                                    <td>Rs {booking.totalPrice}</td>
                                    <td>{new Date(booking.bookingDate).toLocaleDateString()}</td>
                                    <td>
                                        {/* <button onClick={() => handleEdit(booking)} className="admin-bookings-edit-button">
                                            Edit
                                        </button> */}
                                        <button onClick={() => handleDelete(booking._id)} className="admin-bookings-delete-button">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9">No bookings available.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <footer className="admin-bookings-footer">
                © {new Date().getFullYear()} Travel-Mate. All rights reserved.
            </footer>
        </div>
    );
};

export default AdminBookings;
