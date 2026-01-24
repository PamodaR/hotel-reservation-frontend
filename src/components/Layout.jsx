import React from 'react';
import { Home, Users, Calendar, UserPlus } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import '../styles.css';

const Layout = ({ children }) => {
    const location = useLocation();
    const path = location.pathname;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-gray-900 text-white p-6 hidden md:flex flex-col fixed h-full z-50">
                <h2 className="text-2xl font-serif font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-gold-400">
                    Ocean View
                </h2>
                <nav className="space-y-4">
                    <Link
                        to="/dashboard"
                        className={`flex items-center gap-3 font-medium transition-colors ${path === '/dashboard' ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Home size={20} /> Dashboard
                    </Link>

                    <Link
                        to="/home"
                        className={`flex items-center gap-3 font-medium transition-colors ${path === '/home' ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Users size={20} /> Booking
                    </Link>

                    {/* ✅ Register added here */}
                    <Link
                        to="/register"
                        className={`flex items-center gap-3 font-medium transition-colors ${path === '/register' ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        <UserPlus size={20} /> Register
                    </Link>

                    <Link
                        to="/help"
                        className={`flex items-center gap-3 font-medium transition-colors ${path === '/help' ? 'text-primary-400' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Calendar size={20} /> Help & Support
                    </Link>
                </nav>

                <div className="mt-auto pt-10 border-t border-gray-800">
                    <Link to="/" className="flex items-center gap-3 text-red-400 hover:text-red-300 transition-colors">
                        Logout
                    </Link>
                </div>
            </div>

            {/* Main Content Wrapper */}
            <div className="flex-1 md:ml-64 transition-all duration-300">
                {children}
            </div>
        </div>
    );
};

export default Layout;
