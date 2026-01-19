import React, { useEffect, useState } from 'react';
import { Home, Users, DollarSign, Calendar, TrendingUp, CheckCircle } from 'lucide-react';
import axios from 'axios';
import '../styles.css';

const Dashboard = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/reservations/all');
            // Sort reservations by check-in date (newest first)
            const sortedReservations = response.data.sort((a, b) => 
                new Date(b.checkInDate) - new Date(a.checkInDate)
            );
            setReservations(sortedReservations);
        } catch (error) {
            console.error('Failed to fetch reservations:', error);
        } finally {
            setLoading(false);
        }
    };

    // Get today's reservations (check-in date = today)
    const getTodayReservations = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        return reservations.filter(r => {
            const checkIn = new Date(r.checkInDate);
            checkIn.setHours(0, 0, 0, 0);
            return checkIn.getTime() === today.getTime();
        });
    };

    // Calculate active guests count from today's reservations
    const getActiveGuestsCount = () => {
        return todayReservations.reduce((total, r) => total + (r.numberOfGuests || 0), 0);
    };

    const todayReservations = getTodayReservations();

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900 font-serif">Dashboard</h1>
                <div className="flex items-center gap-4">
                    <div className="text-sm text-gray-600">
                        {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border-2 border-primary-200">
                        OV
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Bookings', value: reservations.length, icon: Calendar, color: 'bg-blue-50 text-blue-600' },
                    { label: 'Active Guests', value: getActiveGuestsCount(), icon: Users, color: 'bg-emerald-50 text-emerald-600' },
                    { label: 'Revenue', value: `Rs. ${reservations.reduce((sum, r) => sum + r.totalBill, 0).toLocaleString()}`, icon: DollarSign, color: 'bg-amber-50 text-amber-600' },
                    { label: "Today's Check-ins", value: todayReservations.length, icon: CheckCircle, color: 'bg-purple-50 text-purple-600' },
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-lg">+12%</span>
                        </div>
                        <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                        <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Today's Reservations */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
                <div className="p-6 border-b border-blue-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Today's Reservations</h3>
                        <p className="text-sm text-gray-600 mt-1">Check-in date: {new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold">
                        {todayReservations.length} Bookings
                    </div>
                </div>
                <div className="overflow-x-auto bg-white">
                    {loading ? (
                        <p className="p-6 text-gray-500">Loading reservations...</p>
                    ) : todayReservations.length === 0 ? (
                        <p className="p-6 text-gray-500 text-center">No reservations for today</p>
                    ) : (
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Reservation #</th>
                                    <th className="px-6 py-4">Guest Name</th>
                                    <th className="px-6 py-4">Room Type</th>
                                    <th className="px-6 py-4">Guests</th>
                                    <th className="px-6 py-4">Check-Out</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {todayReservations.map((r, idx) => (
                                    <tr key={idx} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-4 font-bold text-blue-600">{r.reservationNumber}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{r.guestName}</td>
                                        <td className="px-6 py-4 text-gray-600">{r.roomType}</td>
                                        <td className="px-6 py-4 text-gray-600">{r.numberOfGuests || 0}</td>
                                        <td className="px-6 py-4 text-gray-500">{new Date(r.checkOutDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                r.paymentStatus === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                r.paymentStatus === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                                {r.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900">Rs. {r.totalBill.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* All Recent Bookings Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-gray-900">All Reservations</h3>
                    <button className="text-sm text-primary-600 font-medium hover:text-primary-700">View All</button>
                </div>
                <div className="overflow-x-auto">
                    {loading ? (
                        <p className="p-6 text-gray-500">Loading reservations...</p>
                    ) : (
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-medium border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Reservation #</th>
                                    <th className="px-6 py-4">Guest</th>
                                    <th className="px-6 py-4">Room Type</th>
                                    <th className="px-6 py-4">Guests</th>
                                    <th className="px-6 py-4">Check-In</th>
                                    <th className="px-6 py-4">Check-Out</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {reservations.map((r, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-primary-600">{r.reservationNumber}</td>
                                        <td className="px-6 py-4 font-medium text-gray-900">{r.guestName}</td>
                                        <td className="px-6 py-4 text-gray-600">{r.roomType}</td>
                                        <td className="px-6 py-4 text-gray-600">{r.numberOfGuests || 0}</td>
                                        <td className="px-6 py-4 text-gray-500">{new Date(r.checkInDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 text-gray-500">{new Date(r.checkOutDate).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                                r.paymentStatus === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                r.paymentStatus === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                'bg-blue-100 text-blue-700'
                                            }`}>
                                                {r.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-900">Rs. {r.totalBill.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;