import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, Hotel } from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import '../styles.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('role', data.user.role || 'USER'); // Ensuring correct key 'role' is used across app context
                localStorage.setItem('userId', data.user.id);
                navigate('/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Unable to connect to server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex w-full">
            {/* Left Side - Image */}
            <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-primary-900">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent"></div>
                <img
                    src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                    alt="Ocean View Resort"
                    className="w-full h-full object-cover animate-scale-in"
                />
                <div className="absolute bottom-0 left-0 z-20 p-12 text-white">
                    <div className="flex items-center mb-4">
                        <Hotel className="w-10 h-10 text-gold-400 mr-3" />
                        <h1 className="text-4xl font-serif font-bold tracking-wide">Ocean View Resort</h1>
                    </div>
                    <p className="text-lg text-primary-100 max-w-md font-light leading-relaxed">
                        Experience luxury and comfort in the heart of Galle. Manage reservations seamlessly with our premium system.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface-50">
                <div className="max-w-md w-full animate-fade-in space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-surface-900 font-serif mb-2">Welcome Back</h2>
                        <p className="text-surface-500">Please sign in to your account.</p>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start">
                            <div className="flex-1">
                                <p className="text-sm text-red-700 font-medium">Authentication Error</p>
                                <p className="text-xs text-red-600 mt-1">{error}</p>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <Input
                            label="Email Address"
                            type="email"
                            name="email"
                            icon={User}
                            placeholder="admin@oceanview.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            icon={Lock}
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-sm text-surface-600 cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 text-primary-600 border-surface-300 rounded focus:ring-primary-500" />
                                <span className="ml-2">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500 hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        <Button
                            type="submit"
                            className="w-full group"
                            isLoading={loading}
                        >
                            Sign In
                            {!loading && <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </Button>
                    </form>

                    <div className="pt-6 border-t border-surface-200">
                        <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                            <p className="text-sm text-blue-900 font-medium mb-2 flex items-center">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                Demo Credentials
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div>
                                    <span className="text-blue-500 font-semibold block">Admin</span>
                                    <span className="text-blue-700">admin@oceanview.com</span>
                                </div>
                                <div>
                                    <span className="text-blue-500 font-semibold block">Password</span>
                                    <span className="text-blue-700">admin123</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-sm text-surface-500 mt-8">
                        © 2026 Ocean View Resort. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;