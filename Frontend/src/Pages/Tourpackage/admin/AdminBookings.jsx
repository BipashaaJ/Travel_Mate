import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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

    const downloadPDF = async () => {
        if (!reportRef.current) return;

        const downloadButton = document.querySelector('.admin-bookings-download-pdf-button');
        if (downloadButton) downloadButton.style.display = 'none'; // Hide button before capture

        try {
            const canvas = await html2canvas(reportRef.current, {
                scale: 2,
                useCORS: true
            });

            if (downloadButton) downloadButton.style.display = 'inline-block'; // Restore button

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');

            const imgWidth = 210;
            const pageHeight = 297;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('bookings_report.pdf');
        } catch (err) {
            console.error('Error generating PDF:', err);
            if (downloadButton) downloadButton.style.display = 'inline-block';
            alert('Failed to generate PDF. Please try again.');
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
                <button onClick={downloadPDF} className="admin-bookings-download-pdf-button">Download PDF</button>

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
