import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Booking from './pages/Booking';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import HelpUs from './pages/HelpUs';
import ViewAllMembers from './pages/ViewAllMembers';
import ProtectedRoute from './components/ProtectedRoute';
import './styles.css';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register publicMode={true} />} />

                {/* Protected Routes - All authenticated users */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Layout><Dashboard /></Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/home"
                    element={
                        <ProtectedRoute>
                            <Layout><Booking /></Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/help"
                    element={
                        <ProtectedRoute>
                            <Layout><HelpUs /></Layout>
                        </ProtectedRoute>
                    }
                />

                {/* Staff & User Routes */}
                <Route
                    path="/register-customer"
                    element={
                        <ProtectedRoute allowedRoles={['STAFF', 'USER']}>
                            <Layout><Register publicMode={false} onlyCustomer={true} /></Layout>
                        </ProtectedRoute>
                    }
                />

                {/* Admin-only Routes */}
                <Route
                    path="/admin/register"
                    element={
                        <ProtectedRoute allowedRoles={['ADMIN']}>
                            <Layout><Register publicMode={false} /></Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/members"
                    element={
                        <ProtectedRoute allowedRoles={['ADMIN']}>
                            <Layout><ViewAllMembers /></Layout>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;