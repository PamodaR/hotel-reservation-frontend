import React, { useState, useEffect } from 'react';
import { Users2, Trash2, Shield, User as UserIcon, Search, AlertCircle } from 'lucide-react';
import Table, { TableRow, TableCell } from '../components/ui/Table';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ViewAllMembers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/users/all');
            const data = await response.json();

            if (data.success) {
                setUsers(data.users);
            } else {
                setError(data.message || 'Failed to fetch users');
            }
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Unable to connect to server');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:8080/api/users/${userId}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                // alert('User deleted successfully'); // Optional: replace with toast
                fetchUsers();
            } else {
                alert(data.message || 'Failed to delete user');
            }
        } catch (err) {
            console.error('Error deleting user:', err);
            alert('Unable to connect to server');
        }
    };

    const filteredUsers = users.filter(user =>
        user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRoleBadgeColor = (role) => {
        switch (role) {
            case 'ADMIN': return 'bg-red-100 text-red-700 border-red-200';
            case 'STAFF': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-green-100 text-green-700 border-green-200';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-surface-900 font-serif">Member Management</h1>
                    <p className="text-surface-500 mt-1">View and manage system users.</p>
                </div>
                <div className="w-full md:w-64">
                    <Input
                        placeholder="Search members..."
                        icon={Search}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-2">
                    <AlertCircle size={20} />
                    {error}
                </div>
            )}

            <Card>
                <div className="overflow-x-auto">
                    <Table headers={['ID', 'Full Name', 'Email', 'Username', 'Role', 'Actions']}>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan="6" className="text-center py-8 text-surface-500">
                                    Loading users...
                                </TableCell>
                            </TableRow>
                        ) : filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan="6" className="text-center py-8 text-surface-500">
                                    No users found matching your search.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-mono text-xs text-surface-500">#{user.id}</TableCell>
                                    <TableCell className="font-medium text-surface-900">{user.fullName || '-'}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.username || '-'}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getRoleBadgeColor(user.role)}`}>
                                            {user.role === 'ADMIN' ? <Shield size={12} /> : <UserIcon size={12} />}
                                            {user.role}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="p-2 text-surface-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete User"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </Table>
                </div>
                {!loading && (
                    <div className="px-6 py-4 border-t border-surface-100 bg-surface-50/50 rounded-b-2xl">
                        <p className="text-sm text-surface-500">
                            Showing {filteredUsers.length} of {users.length} members
                        </p>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default ViewAllMembers;