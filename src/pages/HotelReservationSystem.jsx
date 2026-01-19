import React, { useState } from 'react';
import './styles.css';
import { Calendar, User, CreditCard, Printer, Home, Search, Check, MapPin, Phone, Mail, Clock, Star, Coffee, Wifi, Tv, LogIn, Lock, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE = 'http://localhost:8080/api/reservations';

const ROOM_TYPES = [
  {
    value: 'single',
    label: 'Single Room',
    rate: 5000,
    description: 'Perfect for solo travelers',
    features: ['1 King Bed', 'City View', 'Free Wi-Fi'],
    color: 'from-blue-400 to-blue-600'
  },
  {
    value: 'double',
    label: 'Double Room',
    rate: 8000,
    description: 'Ideal for couples',
    features: ['1 Queen Bed', 'Sea View', 'Mini Bar'],
    color: 'from-teal-400 to-teal-600'
  },
  {
    value: 'suite',
    label: 'Suite',
    rate: 12000,
    description: 'Spacious luxury suite',
    features: ['Living Area', 'Panoramic View', 'Jacuzzi'],
    color: 'from-purple-400 to-purple-600'
  },
  {
    value: 'deluxe',
    label: 'Deluxe Suite',
    rate: 15000,
    description: 'Premium experience',
    features: ['2 Bedrooms', 'Private Pool', 'Butler Service'],
    color: 'from-gold-400 to-gold-600'
  }
];

export default function HotelReservationSystem() {
  const [currentStep, setCurrentStep] = useState('home');
  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    contactNumber: '',
    address: '',
    idNumber: '',
    roomType: 'single',
    numberOfGuests: 1,
    checkInDate: '',
    checkOutDate: '',
    specialRequests: '',
    paymentMethod: 'cash'
  });
  const [reservation, setReservation] = useState(null);
  const [searchNumber, setSearchNumber] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };



  const calculateNights = () => {
    if (formData.checkInDate && formData.checkOutDate) {
      const checkIn = new Date(formData.checkInDate);
      const checkOut = new Date(formData.checkOutDate);
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      return nights > 0 ? nights : 1;
    }
    return 0;
  };

  const calculateTotal = () => {
    const room = ROOM_TYPES.find(r => r.value === formData.roomType);
    const nights = calculateNights();
    return room ? room.rate * nights : 0;
  };

  const submitReservation = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        setReservation(data);
        setCurrentStep('payment');
      } else {
        alert('Failed to create reservation');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  const completePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/${reservation.reservationNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...reservation, paymentStatus: 'PAID' })
      });

      if (response.ok) {
        const data = await response.json();
        setReservation(data);
        setCurrentStep('bill');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  const searchReservation = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/${searchNumber}`);
      if (response.ok) {
        const data = await response.json();
        setReservation(data);
        setCurrentStep('bill');
      } else {
        alert('Reservation not found');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
    setLoading(false);
  };

  const printBill = () => {
    window.print();
  };

  const resetForm = () => {
    setCurrentStep('home');
    setFormData({
      guestName: '',
      email: '',
      contactNumber: '',
      address: '',
      idNumber: '',
      roomType: 'single',
      numberOfGuests: 1,
      checkInDate: '',
      checkOutDate: '',
      specialRequests: '',
      paymentMethod: 'cash'
    });
    setReservation(null);
    setSearchNumber('');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans text-gray-900">
      {/* Navigation Bar */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentStep('home')}>
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center shadow-lg shadow-primary-500/30">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-800 to-primary-600 font-serif tracking-tight">Ocean View</h1>
                <p className="text-xs text-gray-500 tracking-wide uppercase font-semibold">Resort & Spa</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {currentStep !== 'home' && (
                <button
                  onClick={resetForm}
                  className="text-sm text-gray-600 hover:text-primary-600 font-medium transition-colors flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Return Home
                </button>
              )}
              <Link
                to="/dashboard"
                className="text-sm text-gray-600 hover:text-primary-600 font-medium transition-colors px-3 py-2"
              >
                Dashboard
              </Link>
              <Link
                to="/help"
                className="text-sm text-gray-600 hover:text-primary-600 font-medium transition-colors px-3 py-2"
              >
                Help
              </Link>
              <Link
                to="/"
                className="text-sm bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20 flex items-center gap-2"
              >
                <LogIn size={16} /> Sign Out
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 px-6 md:px-8">



        {/* Home Screen */}
        {currentStep === 'home' && (
          <div className="max-w-7xl mx-auto animate-fade-in">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-900 mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-primary-900/40 z-10"></div>
              {/* Abstract background pattern using CSS gradients */}
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=2649&auto=format&fit=crop')] bg-cover bg-center opacity-50"></div>

              <div className="relative z-20 py-24 px-8 md:px-16 text-center md:text-left">
                <h2 className="text-4xl md:text-6xl font-bold text-white font-serif mb-6 leading-tight">
                  Escape to <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 to-gold-100">Paradise</span>
                </h2>
                <p className="text-lg text-gray-200 mb-10 max-w-xl leading-relaxed">
                  Experience world-class luxury and comfort. Book your perfect stay with us today and create unforgettable memories.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => setCurrentStep('guest')}
                    className="px-8 py-4 bg-white text-primary-900 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    Book Your Stay
                  </button>
                  <button
                    onClick={() => setCurrentStep('search')}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-xl font-semibold hover:bg-white/20 transition-all"
                  >
                    Manage Booking
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-100 transition-colors">
                  <Star className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">Luxury Rooms</h3>
                <p className="text-gray-600 leading-relaxed">Indulge in our meticulously designed rooms featuring modern amenities and breathtaking views.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-100 transition-colors">
                  <Coffee className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">Premium Dining</h3>
                <p className="text-gray-600 leading-relaxed">Savor exquisite culinary delights prepared by our world-class chefs in a stunning atmosphere.</p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1 group">
                <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-100 transition-colors">
                  <Wifi className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">World Class Service</h3>
                <p className="text-gray-600 leading-relaxed">Enjoy 24/7 dedicated service, high-speed Wi-Fi, and personalized attention to detail.</p>
              </div>
            </div>
          </div>
        )}

        {/* Search Screen */}
        {currentStep === 'search' && (
          <div className="max-w-xl mx-auto pt-12 animate-fade-in opacity-0 fill-mode-forwards" style={{ animation: 'fadeIn 0.5s forwards' }}>
            <div className="card-glass p-8 md:p-12">
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
                  <Search className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 font-serif mb-2">Find Reservation</h2>
                <p className="text-gray-500">Enter your booking reference number to view details</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Reservation Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., RES-123456"
                    value={searchNumber}
                    onChange={(e) => setSearchNumber(e.target.value)}
                    className="input-field text-lg text-center tracking-widest uppercase placeholder:normal-case"
                  />
                </div>

                <button
                  onClick={searchReservation}
                  disabled={loading || !searchNumber}
                  className="btn-primary w-full shadow-primary-500/20"
                >
                  {loading ? 'Searching...' : 'Search Reservation'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Guest Details */}
        {currentStep === 'guest' && (
          <div className="max-w-4xl mx-auto pt-6 animate-fade-in opacity-0 fill-mode-forwards" style={{ animation: 'fadeIn 0.5s forwards' }}>
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-gray-200 flex-1"></div>
              <h2 className="text-2xl font-bold text-gray-900 font-serif">Guest Information</h2>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="card-glass p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        name="guestName"
                        placeholder="John Doe"
                        value={formData.guestName}
                        onChange={handleInputChange}
                        className="input-field pl-12"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="input-field pl-12"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="contactNumber"
                        placeholder="+94 77 123 4567"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        className="input-field pl-12"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">ID/Passport Number</label>
                    <input
                      type="text"
                      name="idNumber"
                      placeholder="Identiy Card Number"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Residential Address</label>
                    <textarea
                      name="address"
                      placeholder="Street address, City, Country"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="4"
                      className="input-field resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  onClick={() => setCurrentStep('booking')}
                  disabled={!formData.guestName || !formData.email || !formData.contactNumber}
                  className="btn-primary flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Booking
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Booking & Room Selection */}
        {currentStep === 'booking' && (
          <div className="max-w-6xl mx-auto pt-6 animate-fade-in opacity-0 fill-mode-forwards" style={{ animation: 'fadeIn 0.5s forwards' }}>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Left Column: Room Selection */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 font-serif mb-6">Select Accommodation</h2>
                <div className="grid grid-cols-1 gap-6">
                  {ROOM_TYPES.map(room => (
                    <div
                      key={room.value}
                      onClick={() => setFormData(prev => ({ ...prev, roomType: room.value }))}
                      className={`relative overflow-hidden rounded-2xl border-2 transition-all cursor-pointer group ${formData.roomType === room.value
                        ? 'border-primary-500 bg-primary-50/50 shadow-lg scale-[1.01]'
                        : 'border-transparent bg-white hover:border-gray-200 shadow-sm hover:shadow-md'
                        }`}
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Gradient Decoration simulating image */}
                        <div className={`h-32 md:h-auto md:w-32 bg-gradient-to-br ${room.color} flex items-center justify-center text-white`}>
                          <Home className="w-8 h-8 opacity-50" />
                        </div>

                        <div className="p-6 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{room.label}</h3>
                              <p className="text-gray-500 text-sm mb-3">{room.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {room.features.map((feature, idx) => (
                                  <span key={idx} className="text-xs px-2 py-1 bg-white border border-gray-200 rounded-md text-gray-600">
                                    {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-primary-700">Rs. {room.rate.toLocaleString()}</p>
                              <p className="text-xs text-gray-500">per night</p>
                            </div>
                          </div>
                        </div>

                        {formData.roomType === room.value && (
                          <div className="absolute top-4 right-4 bg-primary-500 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg animate-bounce-short">
                            <Check size={16} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Booking Summary & Details */}
              <div className="w-full md:w-96">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 sticky top-24">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Booking Summary</h3>

                  <div className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Check-in Date</label>
                      <input
                        type="date"
                        name="checkInDate"
                        value={formData.checkInDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="input-field text-sm py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Check-out Date</label>
                      <input
                        type="date"
                        name="checkOutDate"
                        value={formData.checkOutDate}
                        onChange={handleInputChange}
                        min={formData.checkInDate}
                        className="input-field text-sm py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Guests</label>
                      <input
                        type="number"
                        name="numberOfGuests"
                        min="1"
                        max="10"
                        value={formData.numberOfGuests}
                        onChange={handleInputChange}
                        className="input-field text-sm py-2"
                      />
                    </div>
                  </div>

                  {formData.checkInDate && formData.checkOutDate && (
                    <div className="mt-8 pt-6 border-t border-dashed border-gray-200">
                      <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
                        <span>{calculateNights()} Nights</span>
                        <span>x Rs. {ROOM_TYPES.find(r => r.value === formData.roomType)?.rate.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <span className="font-bold text-gray-900">Total</span>
                        <span className="text-3xl font-bold text-primary-700">
                          Rs. {calculateTotal().toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="mt-8 space-y-3">
                    <button
                      onClick={submitReservation}
                      disabled={loading || !formData.checkInDate || !formData.checkOutDate}
                      className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Processing...' : 'Proceed to Payment'}
                    </button>
                    <button
                      onClick={() => setCurrentStep('guest')}
                      className="w-full py-3 text-gray-500 font-medium hover:text-gray-900 transition-colors"
                    >
                      Back to Guest Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment */}
        {currentStep === 'payment' && reservation && (
          <div className="max-w-xl mx-auto pt-10 animate-fade-in opacity-0 fill-mode-forwards" style={{ animation: 'fadeIn 0.5s forwards' }}>
            <div className="card-glass p-8 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 to-primary-600"></div>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-serif">Complete Payment</h2>
                <p className="text-gray-500 mt-2">Reservation #<span className="font-mono font-bold text-gray-900">{reservation.reservationNumber}</span></p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">Total Amount Due</span>
                  <span className="text-2xl font-bold text-gray-900">Rs. {reservation.totalBill.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {[
                  { value: 'cash', label: 'Pay at Counter (Cash)', icon: '💵' },
                  { value: 'card', label: 'Credit / Debit Card', icon: '💳' },
                  { value: 'bank', label: 'Bank Transfer', icon: '🏦' }
                ].map(method => (
                  <div
                    key={method.value}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.value }))}
                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === method.value
                      ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500'
                      : 'border-gray-200 hover:border-primary-200'
                      }`}
                  >
                    <span className="text-2xl mr-4">{method.icon}</span>
                    <span className="font-medium text-gray-900 flex-1">{method.label}</span>
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.paymentMethod === method.value ? 'border-primary-500 bg-primary-500' : 'border-gray-300'
                      }`}>
                      {formData.paymentMethod === method.value && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={completePayment}
                disabled={loading}
                className="btn-primary w-full py-4 text-lg shadow-xl shadow-primary-500/20"
              >
                {loading ? 'Processing...' : 'Confirm & Pay'}
              </button>
            </div>
          </div>
        )}

        {/* Bill/Invoice */}
        {currentStep === 'bill' && reservation && (
          <div className="max-w-3xl mx-auto pt-6 animate-fade-in opacity-0 fill-mode-forwards" style={{ animation: 'fadeIn 0.5s forwards' }}>
            <div className="bg-white rounded-none md:rounded-2xl shadow-2xl overflow-hidden print:shadow-none">
              {/* Invoice Header */}
              <div className="bg-gray-900 text-white p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                  <Home size={120} />
                </div>
                <div className="relative z-10">
                  <h1 className="text-3xl font-serif font-bold mb-2">Ocean View Resort</h1>
                  <div className="flex items-center gap-6 text-sm text-gray-400 mt-4">
                    <span className="flex items-center gap-1"><MapPin size={14} /> Tangalle, Sri Lanka</span>
                    <span className="flex items-center gap-1"><Phone size={14} /> +94 77 123 4567</span>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-8">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Invoice To</p>
                    <h3 className="text-xl font-bold text-gray-900">{reservation.guestName}</h3>
                    <p className="text-gray-500">{reservation.email}</p>
                    <p className="text-gray-500">{reservation.contactNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-1">Invoice Details</p>
                    <p className="font-mono text-gray-900 font-bold">#{reservation.reservationNumber}</p>
                    <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
                    <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase">
                      Paid via {reservation.paymentMethod}
                    </div>
                  </div>
                </div>

                <div className="mb-12">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b-2 border-gray-100">
                        <th className="text-left py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Description</th>
                        <th className="text-center py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Nights</th>
                        <th className="text-right py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600">
                      <tr>
                        <td className="py-6">
                          <p className="font-bold text-gray-900 mb-1">{ROOM_TYPES.find(r => r.value === reservation.roomType)?.label || reservation.roomType}</p>
                          <p className="text-sm">Check-in: {reservation.checkInDate}</p>
                          <p className="text-sm">Check-out: {reservation.checkOutDate}</p>
                        </td>
                        <td className="text-center py-6 align-top pt-8">
                          {Math.ceil((new Date(reservation.checkOutDate) - new Date(reservation.checkInDate)) / (1000 * 60 * 60 * 24))}
                        </td>
                        <td className="text-right py-6 align-top pt-8 font-bold text-gray-900">
                          Rs. {reservation.totalBill.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="border-t-2 border-gray-900">
                        <td colSpan="2" className="pt-6 text-right font-bold text-gray-900 uppercase text-sm">Total Due</td>
                        <td className="pt-6 text-right text-2xl font-bold text-primary-600">
                          Rs. {reservation.totalBill.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>

                <div className="flex gap-4 print:hidden">
                  <button onClick={printBill} className="flex-1 py-4 border-2 border-gray-900 text-gray-900 rounded-xl font-bold hover:bg-gray-900 hover:text-white transition-all flex items-center justify-center gap-2">
                    <Printer size={20} /> Download PDF
                  </button>
                  <button onClick={resetForm} className="flex-1 py-4 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/30">
                    New Booking
                  </button>
                </div>

                <div className="mt-12 text-center text-xs text-gray-400 print:mt-20">
                  <p>Thank you for choosing Ocean View Resort. We hope you enjoy your stay.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Global CSS for Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}