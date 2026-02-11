import React, { useState } from 'react';
import {
  Calendar, User, CreditCard, Printer, Home, Search, Check,
  MapPin, Phone, Mail, Clock, Star, Coffee, Wifi, ArrowRight,
  ChevronRight, ChevronLeft
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import '../styles.css';

const API_BASE = 'http://localhost:8080/api/reservations';

const ROOM_TYPES = [
  {
    value: 'single',
    label: 'Single Room',
    rate: 5000,
    description: 'Perfect for solo travelers with essential amenities.',
    features: ['1 King Bed', 'City View', 'Free Wi-Fi', 'Work Desk'],
    color: 'from-blue-400 to-blue-600',
    icon: Home
  },
  {
    value: 'double',
    label: 'Double Room',
    rate: 8000,
    description: 'Ideal for couples seeking comfort and style.',
    features: ['1 Queen Bed', 'Sea View', 'Mini Bar', 'Balcony'],
    color: 'from-teal-400 to-teal-600',
    icon: Star
  },
  {
    value: 'suite',
    label: 'Luxury Suite',
    rate: 12000,
    description: 'Spacious luxury suite with premium furnishings.',
    features: ['Living Area', 'Panoramic View', 'Jacuzzi', 'Breakfast'],
    color: 'from-purple-400 to-purple-600',
    icon: Coffee
  },
  {
    value: 'deluxe',
    label: 'Deluxe Villa',
    rate: 15000,
    description: 'The ultimate premium experience for VIP guests.',
    features: ['2 Bedrooms', 'Private Pool', 'Butler Service', 'Lounge Access'],
    color: 'from-gold-400 to-gold-600',
    icon: Star
  }
];

const STEPS = [
  { id: 'guest', label: 'Guest Details' },
  { id: 'booking', label: 'Room & Dates' },
  { id: 'payment', label: 'Payment' },
  { id: 'bill', label: 'Confirmation' }
];

export default function Booking() {
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
      alert('Error: ' + error.message); // In real app, use toast
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
      console.error(error);
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
      console.error(error);
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

  // Helper to render progress steps
  const renderStepper = () => {
    if (currentStep === 'home' || currentStep === 'search') return null;

    const activeIndex = STEPS.findIndex(s => s.id === currentStep);

    return (
      <div className="flex items-center justify-center mb-8 w-full max-w-3xl mx-auto">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`
                            flex items-center justify-center w-10 h-10 rounded-full border-2 
                            transition-all duration-300
                            ${activeIndex >= index
                ? 'bg-primary-600 border-primary-600 text-white'
                : 'bg-white border-surface-300 text-surface-400'
              }
                       `}>
              {activeIndex > index ? <Check size={18} /> : <span>{index + 1}</span>}
            </div>
            <span className={`
                            ml-2 text-sm font-medium mr-4 hidden sm:block
                            ${activeIndex >= index ? 'text-primary-700' : 'text-surface-400'}
                       `}>
              {step.label}
            </span>
            {index < STEPS.length - 1 && (
              <div className={`h-1 w-12 sm:w-24 mr-4 rounded transition-colors duration-300 ${activeIndex > index ? 'bg-primary-600' : 'bg-surface-200'}`} />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-7xl mx-auto pb-12">
        {renderStepper()}

        {/* Home Screen */}
        {currentStep === 'home' && (
          <div className="space-y-12 animate-fade-in">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-surface-900 h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
                alt="Resort"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-900 via-transparent to-transparent"></div>

              <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-3xl">
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
                  Paradise <br />
                  <span className="text-gold-400">Awaits You</span>
                </h1>
                <p className="text-xl text-surface-200 mb-8 font-light">
                  Experience world-class luxury and comfort in the heart of our coastal sanctuary.
                </p>
                <div className="flex gap-4">
                  <Button size="lg" onClick={() => setCurrentStep('guest')}>
                    Book Your Stay
                  </Button>
                  <Button variant="secondary" size="lg" onClick={() => setCurrentStep('search')}>
                    Manage Booking
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Luxury Rooms', icon: Star, desc: 'Meticulously designed rooms with breathtaking views.' },
                { title: 'Premium Dining', icon: Coffee, desc: 'Exquisite culinary delights by world-class chefs.' },
                { title: 'World Class Service', icon: Wifi, desc: '24/7 dedicated service and personalized attention.' }
              ].map((item, i) => (
                <Card key={i} className="hover:-translate-y-1 transition-transform cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary-100/50 rounded-xl flex items-center justify-center mb-4 text-primary-600">
                      <item.icon />
                    </div>
                    <h3 className="text-xl font-bold text-surface-900 mb-2">{item.title}</h3>
                    <p className="text-surface-500">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Guest Details */}
        {currentStep === 'guest' && (
          <div className="max-w-3xl mx-auto animate-fade-in">
            <Card className="bg-white/80 backdrop-blur-md">
              <div className="p-8">
                <h2 className="text-2xl font-bold text-surface-900 font-serif mb-6">Guest Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Full Name" name="guestName" icon={User} placeholder="John Doe" value={formData.guestName} onChange={handleInputChange} required />
                  <Input label="Email Address" type="email" name="email" icon={Mail} placeholder="email@example.com" value={formData.email} onChange={handleInputChange} required />
                  <Input label="Contact Number" name="contactNumber" icon={Phone} placeholder="+94 ..." value={formData.contactNumber} onChange={handleInputChange} required />
                  <Input label="ID/Passport" name="idNumber" placeholder="ID Number" value={formData.idNumber} onChange={handleInputChange} />
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-surface-700 mb-2">Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-surface-200 rounded-xl focus:ring-2 focus:ring-primary-500 outline-none"
                      rows="3"
                      placeholder="Your residential address"
                    />
                  </div>
                </div>
                <div className="mt-8 flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setCurrentStep('home')}>Cancel</Button>
                  <Button
                    onClick={() => setCurrentStep('booking')}
                    disabled={!formData.guestName || !formData.email}
                  >
                    Next Step <ChevronRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Room Selection */}
        {currentStep === 'booking' && (
          <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-surface-900 font-serif">Select Accommodation</h2>
              {ROOM_TYPES.map(room => (
                <div
                  key={room.value}
                  onClick={() => setFormData(prev => ({ ...prev, roomType: room.value }))}
                  className={`
                                    relative p-1 rounded-2xl cursor-pointer transition-all duration-300 group
                                    ${formData.roomType === room.value ? 'bg-gradient-to-r from-primary-400 to-primary-600 shadow-lg scale-[1.01]' : 'bg-white hover:bg-surface-50 border border-surface-200'}
                                `}
                >
                  <div className={`relative flex flex-col sm:flex-row gap-6 p-6 rounded-xl h-full ${formData.roomType === room.value ? 'bg-white' : ''}`}>
                    {/* Fake image placeholder with gradient */}
                    <div className={`w-full sm:w-40 h-32 rounded-lg bg-gradient-to-br ${room.color} flex items-center justify-center text-white shrink-0`}>
                      <room.icon size={32} />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-surface-900">{room.label}</h3>
                          <p className="text-surface-500 text-sm mt-1 mb-3">{room.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {room.features.map((f, i) => (
                              <span key={i} className="text-xs px-2 py-1 bg-surface-100 rounded-md text-surface-600 font-medium md:inline-block hidden">
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-primary-600">Rs. {room.rate.toLocaleString()}</p>
                          <p className="text-xs text-surface-400">/ night</p>
                        </div>
                      </div>
                    </div>
                    {formData.roomType === room.value && (
                      <div className="absolute top-4 right-4 text-primary-600">
                        <div className="bg-primary-100 p-1 rounded-full">
                          <Check size={20} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <Card className="bg-white shadow-xl border-t-4 border-primary-500">
                  <CardContent className="p-6 space-y-6">
                    <h3 className="text-lg font-bold text-surface-900 border-b border-surface-100 pb-4">Booking Summary</h3>

                    <div className="space-y-4">
                      <Input type="date" label="Check-in Date" name="checkInDate" value={formData.checkInDate} onChange={handleInputChange} min={new Date().toISOString().split('T')[0]} />
                      <Input type="date" label="Check-out Date" name="checkOutDate" value={formData.checkOutDate} onChange={handleInputChange} min={formData.checkInDate} />
                      <Input type="number" label="Guests" name="numberOfGuests" value={formData.numberOfGuests} onChange={handleInputChange} min="1" max="10" />
                    </div>

                    {formData.checkInDate && formData.checkOutDate && (
                      <div className="bg-surface-50 p-4 rounded-xl space-y-2">
                        <div className="flex justify-between text-sm text-surface-600">
                          <span>{calculateNights()} Nights x Rs. {ROOM_TYPES.find(r => r.value === formData.roomType)?.rate.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold text-surface-900 pt-2 border-t border-surface-200">
                          <span>Total</span>
                          <span className="text-primary-600">Rs. {calculateTotal().toLocaleString()}</span>
                        </div>
                      </div>
                    )}

                    <div className="pt-4 flex flex-col gap-3">
                      <Button
                        onClick={submitReservation}
                        disabled={loading || !formData.checkInDate || !formData.checkOutDate}
                        className="w-full"
                        isLoading={loading}
                      >
                        Confirm & Pay
                      </Button>
                      <Button variant="ghost" onClick={() => setCurrentStep('guest')} className="w-full">
                        Back
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Payment Screen */}
        {currentStep === 'payment' && reservation && (
          <div className="max-w-xl mx-auto animate-fade-in pt-8">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-surface-900 mb-2">Complete Payment</h2>
                <p className="text-surface-500 mb-8">Reservation #{reservation.reservationNumber}</p>

                <div className="bg-surface-50 p-6 rounded-xl mb-8 flex justify-between items-center border border-surface-200 hover:border-primary-200 transition-colors">
                  <span className="text-surface-600 font-medium">Total Amount Due</span>
                  <span className="text-2xl font-bold text-surface-900">Rs. {reservation.totalBill.toLocaleString()}</span>
                </div>

                <div className="space-y-3 mb-8 text-left">
                  {[
                    { value: 'cash', label: 'Pay at Counter (Cash)', icon: '💵' },
                    { value: 'card', label: 'Credit / Debit Card', icon: '💳' },
                    //   { value: 'bank', label: 'Bank Transfer', icon: '🏦' }
                  ].map(method => (
                    <div
                      key={method.value}
                      onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.value }))}
                      className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${formData.paymentMethod === method.value
                        ? 'border-primary-500 bg-primary-50 ring-1 ring-primary-500'
                        : 'border-surface-200 hover:bg-surface-50'
                        }`}
                    >
                      <span className="text-2xl mr-4">{method.icon}</span>
                      <span className="font-medium text-surface-900 flex-1">{method.label}</span>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${formData.paymentMethod === method.value ? 'border-primary-500 bg-primary-500' : 'border-surface-300'}`}>
                        {formData.paymentMethod === method.value && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                    </div>
                  ))}
                </div>

                <Button onClick={completePayment} isLoading={loading} className="w-full">
                  Confirm & Pay
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bill/Search Screen - Using similar layout */}
        {currentStep === 'search' && (
          <div className="max-w-md mx-auto pt-12 animate-fade-in">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-surface-900 mb-2">Find Reservation</h2>
                <p className="text-surface-500 mb-8">Enter your booking reference</p>

                <div className="space-y-4">
                  <Input
                    className="text-center text-lg uppercase tracking-widest font-mono"
                    placeholder="RES-XXXXXX"
                    value={searchNumber}
                    onChange={(e) => setSearchNumber(e.target.value)}
                  />
                  <div className="flex gap-3">
                    <Button variant="secondary" onClick={() => setCurrentStep('home')} className="flex-1">Back</Button>
                    <Button onClick={searchReservation} disabled={loading || !searchNumber} className="flex-1" isLoading={loading}>Search</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Confirmation Bill */}
        {currentStep === 'bill' && reservation && (
          <div className="max-w-3xl mx-auto animate-fade-in pt-6">
            <div className="bg-white rounded-none md:rounded-2xl shadow-xl overflow-hidden print:shadow-none">
              <div className="bg-surface-900 text-white p-8 relative overflow-hidden">
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 bg-white/10 rounded-lg">
                        <Home className="text-gold-400" size={24} />
                      </div>
                      <h1 className="text-2xl font-serif font-bold">Ocean View Resort</h1>
                    </div>
                    <p className="text-surface-400 text-sm">Luxury Coastal Sanctuary</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-widest text-surface-400 mb-1">Reservation ID</p>
                    <p className="font-mono text-xl font-bold">{reservation.reservationNumber}</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Guest Info */}
                <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-surface-100">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-surface-500 font-bold mb-2">Guest Details</p>
                    <p className="font-bold text-surface-900">{reservation.guestName}</p>
                    <p className="text-sm text-surface-600">{reservation.email}</p>
                    <p className="text-sm text-surface-600">{reservation.contactNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs uppercase tracking-widest text-surface-500 font-bold mb-2">Status</p>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase">
                      {reservation.paymentStatus}
                    </span>
                  </div>
                </div>

                {/* Breakdown */}
                <table className="w-full mb-8">
                  <thead>
                    <tr className="border-b border-surface-200">
                      <th className="text-left py-2 font-semibold text-sm text-surface-500">Description</th>
                      <th className="text-right py-2 font-semibold text-sm text-surface-500">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-100">
                    <tr>
                      <td className="py-4">
                        <p className="font-bold text-surface-900">{reservation.roomType} Room</p>
                        <p className="text-sm text-surface-500">
                          {new Date(reservation.checkInDate).toLocaleDateString()} - {new Date(reservation.checkOutDate).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="py-4 text-right font-bold text-surface-900">
                        Rs. {reservation.totalBill.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-surface-900">
                      <td className="pt-4 font-bold text-surface-900">Total Paid</td>
                      <td className="pt-4 text-right font-bold text-2xl text-primary-600">
                        Rs. {reservation.totalBill.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>

                <div className="flex gap-4 print:hidden">
                  <Button variant="outline" onClick={printBill} className="flex-1">
                    <Printer className="w-4 h-4 mr-2" /> Print Invoice
                  </Button>
                  <Button onClick={resetForm} className="flex-1">
                    Make Another Booking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}