import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function Dashboard() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');
  const barberEmail = 'barber.devv@gmail.com';

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('barber_email', barberEmail)
          .order('date', { ascending: true });

        if (error) throw error;
        setBookings(data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();

    // Set up real-time subscription
    const subscription = supabase
      .channel('bookings_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'bookings',
          filter: `barber_email=eq.${barberEmail}`
        }, 
        (payload) => {
          console.log('Change received!', payload);
          fetchBookings(); // Refresh the bookings when changes occur
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [barberEmail]);

  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true;
    if (filter === 'today') {
      const today = new Date().toISOString().split('T')[0];
      return booking.date === today;
    }
    if (filter === 'upcoming') {
      const today = new Date().toISOString().split('T')[0];
      return booking.date > today;
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('today')}
            className={`px-4 py-2 rounded ${
              filter === 'today'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded ${
              filter === 'upcoming'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Upcoming
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredBookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {booking.customer_name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {new Date(booking.date).toLocaleDateString()} at {booking.time}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {booking.service}
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-600 dark:text-gray-300">
                  {booking.customer_email}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {booking.customer_phone}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 