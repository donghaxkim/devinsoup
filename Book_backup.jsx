import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from '../supabaseClient';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init("f5mpWfDGFUfJO3XIe");

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
    // Test Supabase connection
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('count')
          .limit(1);
        
        if (error) {
          console.error('Supabase connection test failed:', error);
        } else {
          console.log('Supabase connection successful:', data);
        }
      } catch (error) {
        console.error('Error testing Supabase connection:', error);
      }
    };

    testConnection();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetchBookedSlots();
    }
  }, [selectedDate]);

  const fetchBookedSlots = async () => {
    if (!selectedDate) return;

    const startOfDay = new Date(selectedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(selectedDate);
    endOfDay.setHours(23, 59, 59, 999);

    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('time')
        .gte('date', startOfDay.toISOString())
        .lte('date', endOfDay.toISOString());

      if (error) {
        console.error('Error fetching booked slots:', error);
        return;
      }

      const booked = data.map(booking => booking.time);
      setBookedSlots(booked);
    } catch (error) {
      console.error('Error fetching booked slots:', error);
    }
  };

  const sendConfirmationEmails = async (bookingData) => {
    const formattedDate = new Date(bookingData.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Customer confirmation email
    const customerTemplateParams = {
      to_name: bookingData.name,
      from_name: "Devin Soup",
      message: `Your appointment has been confirmed for ${formattedDate} at ${bookingData.time}.`,
      appointment_date: formattedDate,
      appointment_time: bookingData.time,
      customer_name: bookingData.name,
      customer_email: bookingData.email,
      customer_phone: bookingData.phone,
      reply_to: 'donghaxkim@gmail.com',
      to_email: bookingData.email,
      email: bookingData.email
    };

    // Barber confirmation email
    const barberTemplateParams = {
      to_name: 'Barber',
      from_name: "Booking System",
      message: `New booking from ${bookingData.name} for ${formattedDate} at ${bookingData.time}.`,
      appointment_date: formattedDate,
      appointment_time: bookingData.time,
      customer_name: bookingData.name,
      customer_email: bookingData.email,
      customer_phone: bookingData.phone,
      reply_to: bookingData.email,
      to_email: 'donghaxkim@gmail.com',
      email: 'donghaxkim@gmail.com'
    };

    try {
      console.log('Attempting to send customer email with params:', customerTemplateParams);
      // Send to customer
      const customerResult = await emailjs.send(
        'service_4r7fsvf',
        'template_sik8nap',
        {
          to_name: bookingData.name,
          from_name: "Devin Soup",
          message: `Your appointment has been confirmed for ${formattedDate} at ${bookingData.time}.`,
          appointment_date: formattedDate,
          appointment_time: bookingData.time,
          customer_name: bookingData.name,
          customer_email: bookingData.email,
          customer_phone: bookingData.phone,
          reply_to: 'donghaxkim@gmail.com',
          to_email: bookingData.email,
          email: bookingData.email
        },
        'f5mpWfDGFUfJO3XIe'
      );
      console.log('Customer email sent successfully:', customerResult);

      console.log('Attempting to send barber email with params:', barberTemplateParams);
      // Send to barber
      const barberResult = await emailjs.send(
        'service_4r7fsvf',
        'template_sik8nap',
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
          to_email: 'donghaxkim@gmail.com',
          email: 'donghaxkim@gmail.com'
        },
        'f5mpWfDGFUfJO3XIe'
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingDate = new Date(selectedDate);
      bookingDate.setHours(parseInt(selectedTime.split(':')[0]), parseInt(selectedTime.split(':')[1]));

      const bookingData = {
        date: bookingDate.toISOString(),
        time: selectedTime,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        barber_email: 'donghaxkim@gmail.com',
        status: 'confirmed',
        created_at: new Date().toISOString()
      };

      console.log('Attempting to create booking with data:', bookingData);

      // Add booking to Supabase
      const { data, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Booking created successfully:', data);

      // Send confirmation emails
      await sendConfirmationEmails(bookingData);

      setBookingSuccess(true);
      setSelectedDate(null);
      setSelectedTime(null);
      setFormData({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error creating booking:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      alert('Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="book" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Book Your Appointment</h2>
        
        {bookingSuccess ? (
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <h3 className="text-xl font-semibold text-green-800 mb-2">Booking Confirmed!</h3>
            <p className="text-green-600">We'll see you at your appointment.</p>
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
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={date => {
                    setSelectedDate(date);
                    setSelectedTime(null);
                  }}
                  minDate={new Date()}
                  className="w-full p-2 border rounded-md"
                  dateFormat="MMMM d, yyyy"
                  placeholderText="Select a date"
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Time
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                  {timeSlots.map(time => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      disabled={bookedSlots.includes(time)}
                      className={`p-2 text-sm rounded ${
                        selectedTime === time
                          ? 'bg-blue-600 text-white'
                          : bookedSlots.includes(time)
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  required
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
    </section>
  );
}
