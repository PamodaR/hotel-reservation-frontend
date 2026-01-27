import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Booking from './pages/Booking';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import HelpUs from './pages/HelpUs';
import './styles.css';
import ViewAllMembers from './pages/ViewAllMembers';


const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes with Layout */}
                <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
                <Route path="/home" element={<Layout><Booking /></Layout>} />
                <Route path="/members" element={<Layout><ViewAllMembers /></Layout>} />

                <Route path="/help" element={<Layout><HelpUs /></Layout>} />
            </Routes>
        </Router>
    );
};

export default App;
