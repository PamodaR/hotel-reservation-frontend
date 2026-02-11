import React from 'react';
import { Menu, Bell, User, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopBar = ({ toggleSidebar, userRole }) => {
    const navigate = useNavigate();
    const username = "Guest"; // TODO: Fetch from context or local storage if available

    return (
        <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-6 bg-white/80 backdrop-blur-md border-b border-surface-200 shadow-sm transition-all duration-300">
            {/* Left Section: Menu Toggle & Title */}
            <div className="flex items-center">
                <button
                    onClick={toggleSidebar}
                    className="p-2 mr-4 text-surface-500 rounded-lg lg:hidden hover:bg-surface-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Right Section: Actions & Profile */}
            <div className="flex items-center space-x-4">
                {/* Search Bar (Hidden on Mobile) */}
                <div className="hidden md:flex relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-surface-400">
                        <Search size={18} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 text-sm bg-surface-50 border border-surface-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all w-64"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-surface-500 rounded-full hover:bg-surface-100 transition-colors">
                    <Bell className="w-6 h-6" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                {/* User Profile Dropdown Simulator */}
                <div className="relative flex items-center pl-4 border-l border-surface-200">
                    <div className="flex flex-col items-end mr-3 hidden sm:flex">
                        <span className="text-sm font-semibold text-surface-900">{username}</span>
                        <span className="text-xs text-surface-500 font-medium bg-surface-100 px-2 py-0.5 rounded-full uppercase tracking-wider">{userRole}</span>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold shadow-md cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-primary-500 transition-all">
                        {username.charAt(0)}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default TopBar;
