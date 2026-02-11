import React, { useEffect, useState } from 'react';
import { Users, DollarSign, Calendar, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';
import StatCard from '../components/ui/StatCard';
import Table, { TableRow, TableCell } from '../components/ui/Table';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

const Dashboard = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReservations();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/reservations/all');
            const sortedReservations = response.data.sort((a, b) =>
                new Date(b.checkInDate) - new Date(a.checkInDate)
            );
            setReservations(sortedReservations);
        } catch (error) {
            console.error('Failed to fetch reservations:', error);
            // Fallback for demo if API fails
            setReservations([]);
        } finally {
            setLoading(false);
        }
    };

    const getTodayReservations = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return reservations.filter(r => {
            const checkIn = new Date(r.checkInDate);
            checkIn.setHours(0, 0, 0, 0);
            return checkIn.getTime() === today.getTime();
        });
    };

    const todayReservations = getTodayReservations();
    const activeGuests = todayReservations.reduce((total, r) => total + (r.numberOfGuests || 0), 0);
    const totalRevenue = reservations.reduce((sum, r) => sum + r.totalBill, 0);

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-surface-900 font-serif">Dashboard Overview</h1>
                    <p className="text-surface-500 mt-1">Welcome back, here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-surface-200">
                    <Calendar className="text-primary-600 w-5 h-5" />
                    <span className="text-sm font-medium text-surface-700">
                        {new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Bookings"
                    value={reservations.length}
                    icon={Calendar}
                    change="+12% from last month"
                    trend="up"
                />
                <StatCard
                    title="Active Guests"
                    value={activeGuests}
                    icon={Users}
                    change="+5% today"
                    trend="up"
                />
                <StatCard
                    title="Total Revenue"
                    value={`Rs. ${totalRevenue.toLocaleString()}`}
                    icon={DollarSign}
                    change="+8.2% from last month"
                    trend="up"
                />
                <StatCard
                    title="Today's Check-ins"
                    value={todayReservations.length}
                    icon={CheckCircle}
                    change="On track"
                    trend="neutral"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Today's Arrivals */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Today's Arrivals</CardTitle>
                        <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-full border border-primary-100">
                            {todayReservations.length} Guests
                        </span>
                    </CardHeader>
                    <div className="overflow-hidden">
                        {loading ? (
                            <div className="p-8 text-center text-surface-500">Loading...</div>
                        ) : todayReservations.length === 0 ? (
                            <div className="p-12 text-center">
                                <div className="mx-auto w-12 h-12 bg-surface-100 rounded-full flex items-center justify-center mb-3">
                                    <Clock className="text-surface-400" />
                                </div>
                                <p className="text-surface-500">No check-ins scheduled for today</p>
                            </div>
                        ) : (
                            <Table headers={['Guest', 'Room', 'Guests', 'Status', 'Bill']}>
                                {todayReservations.map((r, idx) => (
                                    <TableRow key={idx}>
                                        <TableCell className="font-medium text-surface-900">{r.guestName}</TableCell>
                                        <TableCell>{r.roomType}</TableCell>
                                        <TableCell>{r.numberOfGuests}</TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${r.paymentStatus === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                                    r.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {r.paymentStatus}
                                            </span>
                                        </TableCell>
                                        <TableCell className="font-semibold">Rs. {r.totalBill.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </Table>
                        )}
                    </div>
                </Card>

                {/* Quick Actions / Recent Activity Placeholder */}
                <Card className="h-full">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <div className="space-y-6">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex gap-4">
                                <div className="mt-1">
                                    <div className="w-2 h-2 rounded-full bg-primary-500 ring-4 ring-primary-50" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-surface-900">New Reservation Confirmed</p>
                                    <p className="text-xs text-surface-500 mt-0.5">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                        <div className="pt-4 mt-4 border-t border-surface-100">
                            <button className="w-full py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors">
                                View All Activity
                            </button>
                        </div>
                    </div>
                </Card>
            </div>

            {/* All Recent Bookings (Collapsible or truncated) */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Booking History</CardTitle>
                </CardHeader>
                <div className="overflow-x-auto">
                    <Table headers={['ID', 'Guest Name', 'Room Type', 'Check In', 'Check Out', 'Status', 'Amount']}>
                        {reservations.slice(0, 5).map((r, idx) => (
                            <TableRow key={idx}>
                                <TableCell className="font-mono text-xs text-surface-500">{r.reservationNumber || '#' + (idx + 1)}</TableCell>
                                <TableCell className="font-medium">{r.guestName}</TableCell>
                                <TableCell>{r.roomType}</TableCell>
                                <TableCell>{new Date(r.checkInDate).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(r.checkOutDate).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${r.paymentStatus === 'Confirmed' ? 'bg-green-100 text-green-800' :
                                            r.paymentStatus === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-gray-100 text-gray-800'
                                        }`}>
                                        {r.paymentStatus}
                                    </span>
                                </TableCell>
                                <TableCell>Rs. {r.totalBill.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </Table>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;