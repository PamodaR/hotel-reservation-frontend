import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    CalendarCheck,
    Users,
    UserPlus,
    HelpCircle,
    LogOut,
    Hotel,
    X
} from 'lucide-react';

const Sidebar = ({ isOpen, toggleSidebar, userRole }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['ADMIN', 'USER', 'STAFF'] },
        { path: '/home', label: 'Bookings', icon: CalendarCheck, roles: ['ADMIN', 'USER', 'STAFF'] },
        { path: '/register-customer', label: 'Register Customer', icon: UserPlus, roles: ['USER', 'STAFF'] },
        { path: '/members', label: 'Members', icon: Users, roles: ['ADMIN'] },
        { path: '/admin/register', label: ' Registration', icon: Users, roles: ['ADMIN'] },
        { path: '/help', label: 'Help & Support', icon: HelpCircle, roles: ['ADMIN', 'USER', 'STAFF'] },
    ];

    // Filter items based on user role
    const filteredItems = navItems.filter(item => {
        if (!item.roles) return true;
        return item.roles.includes(userRole || 'USER'); // Default to USER if undefined
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        navigate('/');
    };

    return (
        <>
            {/* Mobile Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-surface-900/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleSidebar}
            />

            {/* Sidebar Container */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-surface-200 
                    transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-y-auto lg:h-screen lg:flex lg:flex-col shadow-xl lg:shadow-none
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Logo Area */}
                <div className="flex items-center justify-between h-20 px-6 border-b border-surface-100 bg-gradient-to-r from-primary-600 to-primary-800 text-white shrink-0">
                    <div className="flex items-center">
                        <Hotel className="w-8 h-8 mr-3 text-gold-400" />
                        <span className="text-xl font-serif font-bold tracking-wide">Ocean View</span>
                    </div>
                    {/* Close Button (Mobile Only) */}
                    <button onClick={toggleSidebar} className="lg:hidden text-white/80 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                    {filteredItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => window.innerWidth < 1024 && toggleSidebar()} // Close on mobile click
                            className={({ isActive }) => `
                                flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative overflow-hidden
                                ${isActive
                                    ? 'bg-primary-50 text-primary-700 shadow-sm border border-primary-100'
                                    : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900'
                                }
                            `}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-primary-600' : 'text-surface-400 group-hover:text-surface-600'}`} />
                                    <span className="relative z-10">{item.label}</span>
                                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-600 rounded-r-full" />}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* User Profile Summary (Bottom) */}
                <div className="p-4 border-t border-surface-100 bg-surface-50/50">
                    <div className="flex items-center p-3 mb-3 bg-white rounded-xl border border-surface-200 shadow-sm">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold">
                            {userRole ? userRole.charAt(0) : 'U'}
                        </div>
                        <div className="ml-3 overflow-hidden">
                            <p className="text-sm font-medium text-surface-900 truncate">Logged in as</p>
                            <p className="text-xs text-surface-500 truncate">{userRole || 'Guest'}</p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center justify-center w-full px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors duration-200"
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
