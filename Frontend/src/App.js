import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './Components/footer';
import Header from './Components/guest_header';
import Login from './Pages/User/Login';
import Register from './Pages/User/Register';
import ForgotPassword from './Pages/User/ForgotPassword';
import ResetPassword from './Pages/User/ResetPassword';
import AddHotel from './Pages/Hotel/AddHotel';
import ViewHotels from './Pages/Hotel/ViewHotel';
import UpdateHotel from './Pages/Hotel/UpdateHotel';
import HotelReportPage from './Pages/Hotel/HotelReport';
import MainDashboard from './Pages/Admin/main_dashboard';
import AddDestination from './Pages/Destination/AddDestination';
import ViewDestinations from './Pages/Destination/ViewDestination';
import DestinationReportPage from './Pages/Destination/DestinationReport';
import UpdateDestination from './Pages/Destination/UpdateDestination';
import UserDetailsView from './Pages/User/ViewUser';
import EditProfile from './Pages/User/EditProfile';
import Home from './Pages/Home/Home';
// Tourpackage
import Bill from './Pages/Tourpackage/customer/Bill';
import FrontPage from './Pages/Tourpackage/customer/FrontPage';
import DisplayPackage from './Pages/Tourpackage/customer/DisplayPackage';
import AdminHome from './Pages/Tourpackage/admin/AdminHome';
import PackageDetails from './Pages/Tourpackage/customer/PackageDetails';
import TravelManagement from './Pages/Tourpackage/admin/TravelManagement';
import AdminBookings from "./Pages/Tourpackage/admin/AdminBookings"

//import PackingReportGenerator from './Pages/PackingReportGenerator';

import PackingReportGenerator from './Pages/PackingReportGenerator';



function App() {
  return (
    <div>
      <Header />
      <Routes>
        {/* Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/view-user" element={<UserDetailsView />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        <Route path="/hotel-management" element={<MainDashboard />} />
        <Route path="/add-hotel" element={<AddHotel />} />
        <Route path="/view-hotels" element={<ViewHotels />} />
        <Route path="/update-hotel/:id" element={<UpdateHotel />} />
        <Route path="/hotel-report" element={<HotelReportPage />} />

        <Route path="/add-destination" element={<AddDestination />} />
        <Route path="/view-destination" element={<ViewDestinations />} />
        <Route path="/update-destination/:id" element={<UpdateDestination />} />
        <Route path="/destination-report" element={<DestinationReportPage />} />

        {/* Tourpackage Routes */}
        <Route path="/bill" element={<Bill />} />
        <Route path="/firstpage" element={<FrontPage />} />
        <Route path="/packages" element={<DisplayPackage />} />
        <Route path="/AdminHome" element={<AdminHome />} />
        <Route path="/packagedetails" element={<PackageDetails />} />
        <Route path="/admin/travel" element={<TravelManagement />} />
        <Route path="/admin/bookings" element={<AdminBookings/>} />


        {/* <Route path="/AIgenaration" element={<PackingReportGenerator/>} /> */}
        <Route path="/AI" element={<PackingReportGenerator/>} />



      </Routes>
      <Footer />
    </div>
  );
}

export default App;
