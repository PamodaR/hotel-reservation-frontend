import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userRole, setUserRole] = useState(localStorage.getItem('role') || 'USER');

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Close sidebar on route change (handled in Sidebar, but good to be safe)
    // Also update role if it changes in storage (e.g. login)
    useEffect(() => {
        const handleStorageChange = () => {
            setUserRole(localStorage.getItem('role') || 'USER');
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <div className="flex h-screen overflow-hidden bg-surface-50">
            {/* Sidebar */}
            <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                userRole={userRole}
            />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 w-0 overflow-hidden">
                {/* Top Navigation */}
                <TopBar
                    toggleSidebar={toggleSidebar}
                    userRole={userRole}
                />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto bg-surface-50 p-4 sm:p-6 lg:p-8 scroll-smooth custom-scrollbar relative">
                    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;