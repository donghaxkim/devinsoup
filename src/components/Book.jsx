import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from '../supabaseClient';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);

export default function Book() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Generate time slots from 9 AM to 5 PM
  const timeSlots = Array.from({ length: 17 }, (_, i) => {
    const hour = Math.floor((i + 18) / 2);
    const minute = (i + 18) % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots();
    }
  }, [selectedDate]);

  const fetchBookedSlots = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('time')
        .eq('date', selectedDate.toISOString().split('T')[0]);

      if (error) throw error;
      setBookedSlots(data.map(booking => booking.time));
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: selectedDate,
        time: selectedTime,
        barber_email: 'barber.devv@gmail.com'
      };

      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData]);

      if (error) throw error;

      await sendConfirmationEmails(bookingData);
      setBookingSuccess(true);
      resetForm();
    } catch (error) {
      console.error('Error creating booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({
      name: '',
      email: '',
      phone: ''
    });
  };

  const sendConfirmationEmails = async (bookingData) => {
    try {
      const formattedDate = bookingData.date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Send email to customer
      const customerResult = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          to_name: bookingData.name,
          from_name: "Devin Soup",
          message: `Your appointment has been confirmed for ${formattedDate} at ${bookingData.time}.`,
          appointment_date: formattedDate,
          appointment_time: bookingData.time,
          customer_name: bookingData.name,
          customer_email: bookingData.email,
          customer_phone: bookingData.phone,
          reply_to: 'barber.devv@gmail.com',
          to_email: bookingData.email,
          email: bookingData.email
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      console.log('Customer email sent successfully:', customerResult);

      // Send email to barber
      const barberResult = await emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          to_name: 'Barber',
          from_name: "Booking System",
          message: `New booking from ${bookingData.name} for ${formattedDate} at ${bookingData.time}.`,
          appointment_date: formattedDate,
          appointment_time: bookingData.time,
          customer_name: bookingData.name,
          customer_email: bookingData.email,
          customer_phone: bookingData.phone,
          reply_to: bookingData.email,
          to_email: 'barber.devv@gmail.com',
          email: 'barber.devv@gmail.com'
        },
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      );
      console.log('Barber email sent successfully:', barberResult);

      console.log('All confirmation emails sent successfully');
    } catch (error) {
      console.error('Error sending confirmation emails:', error);
      console.error('Error details:', {
        message: error.message,
        text: error.text,
        status: error.status
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-50 pt-20 pb-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-display font-bold text-center mt-20 mb-8">Book an Appointment</h1>
        
        {bookingSuccess ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-green-800 mb-2">Booking Confirmed!</h2>
            <p className="text-green-600">Thank you for booking with us. We'll see you soon!</p>
            <button
              onClick={() => setBookingSuccess(false)}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Book Another Appointment
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={date => setSelectedDate(date)}
                  minDate={new Date()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select a date"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map(time => {
                    const isBooked = bookedSlots.includes(time);
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        key={time}
                        type="button"
                        onClick={() => !isBooked && setSelectedTime(time)}
                        disabled={isBooked || !selectedDate}
                        className={`px-3 py-2 text-sm rounded-md transition-colors ${
                          isBooked
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !selectedDate || !selectedTime}
              className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                isSubmitting || !selectedDate || !selectedTime
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Booking...' : 'Book Appointment'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 