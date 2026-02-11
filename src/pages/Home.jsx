import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hotel, ArrowRight, User, Key, CheckCircle, MapPin, Coffee, Wifi, Tv, Utensils } from 'lucide-react';
import Button from '../components/ui/Button';

const Home = () => {
    const navigate = useNavigate();

    const amenities = [
        { icon: Wifi, label: 'Free Wi-Fi' },
        { icon: Coffee, label: 'Breakfast' },
        { icon: Tv, label: 'Smart TV' },
        { icon: Utensils, label: 'Restaurant' },
    ];

    return (
        <div className="min-h-screen bg-surface-50 flex flex-col font-sans">
            {/* Navigation Bar */}
            <nav className="bg-white/90 backdrop-blur-md border-b border-surface-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Hotel className="h-8 w-8 text-gold-500 mr-2" />
                            <span className="text-2xl font-serif font-bold text-surface-900 tracking-wide">
                                Ocean View Resort
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                            <Button 
                                variant="outline" 
                                onClick={() => navigate('/login')}
                                className="hidden sm:flex"
                            >
                                <Key className="w-4 h-4 mr-2" />
                                Login
                            </Button>
                            <Button 
                                onClick={() => navigate('/register')}
                                className="shadow-lg shadow-primary-500/20"
                            >
                                <User className="w-4 h-4 mr-2" />
                                Register
                            </Button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2049&q=80" 
                        alt="Luxury Resort Pool" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-primary-900/60 to-primary-900/40"></div>
                </div>
                
                <div className="relative z-10 max-w-4xl mx-auto animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">
                        Experience Paradise in Galle
                    </h1>
                    <p className="text-xl text-primary-50 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                        Discover the perfect blend of luxury, comfort, and breathtaking ocean views. 
                        Your unforgettable getaway starts here at Ocean View Resort.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button 
                            className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-4 text-lg shadow-xl shadow-gold-500/20"
                            onClick={() => document.getElementById('availability').scrollIntoView({ behavior: 'smooth' })}
                        >
                            Book Your Stay
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Introduction & Details Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-serif font-bold text-surface-900">
                                Welcome to Ocean View Resort
                            </h2>
                            <p className="text-surface-600 leading-relaxed text-lg">
                                Nestled along the pristine coastline of Galle, Ocean View Resort offers a sanctuary 
                                of tranquility and elegance. Whether you're here for a romantic escape, a family 
                                vacation, or a business retreat, we provide world-class amenities and personalized 
                                service to make your stay exceptional.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                {amenities.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-3 bg-surface-50 rounded-lg">
                                        <div className="p-2 bg-primary-100 rounded-full text-primary-600">
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-medium text-surface-700">{item.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6">
                                <div className="flex items-start space-x-3 text-surface-500">
                                    <MapPin className="w-5 h-5 mt-1 text-gold-500" />
                                    <span>
                                        123 Coastal Road, Galle, Sri Lanka<br/>
                                        <span className="text-sm">+94 11 234 5678</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl skew-y-1 transform transition-transform hover:skew-y-0 duration-500 group">
                            <img 
                                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                                alt="Resort Interior" 
                                className="w-full h-full object-cover transform scale-110 group-hover:scale-100 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <p className="font-serif text-2xl">Luxury Suites</p>
                                <p className="text-sm opacity-90">Starting from $150/night</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* View Room Availability Section */}
            <section id="availability" className="py-24 bg-surface-50 border-t border-surface-200">
                <div className="max-w-5xl mx-auto px-4 text-center">
                    <div className="inline-block p-3 rounded-2xl bg-white shadow-sm mb-6">
                        <CheckCircle className="w-8 h-8 text-primary-500 mx-auto" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-surface-900 mb-4">
                        Check Room Availability
                    </h2>
                    <p className="text-surface-600 mb-10 max-w-2xl mx-auto">
                        Ready to experience luxury? Enter your dates to see available rooms and exclusive offers.
                    </p>

                    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto border border-surface-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-100/50 rounded-bl-full -mr-16 -mt-16 z-0"></div>
                        <div className="relative z-10 grid md:grid-cols-3 gap-6">
                            <div className="space-y-2 text-left">
                                <label className="text-sm font-semibold text-surface-700 uppercase tracking-wider">Check-in</label>
                                <input 
                                    type="date" 
                                    className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2 text-left">
                                <label className="text-sm font-semibold text-surface-700 uppercase tracking-wider">Check-out</label>
                                <input 
                                    type="date" 
                                    className="w-full px-4 py-3 bg-surface-50 border border-surface-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <div className="flex items-end">
                                <Button className="w-full h-[50px] text-lg bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/30">
                                    Check Availability
                                </Button>
                            </div>
                        </div>
                        <p className="mt-4 text-xs text-surface-400">
                            * Best price guarantee when booking directly.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-surface-900 text-white py-12 border-t border-surface-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center opacity-80">
                    <div className="flex items-center mb-4 md:mb-0">
                        <Hotel className="h-6 w-6 text-gold-500 mr-2" />
                        <span className="text-xl font-serif font-bold">Ocean View Resort</span>
                    </div>
                    <div className="text-sm text-surface-400">
                        © {new Date().getFullYear()} Ocean View Resort. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
