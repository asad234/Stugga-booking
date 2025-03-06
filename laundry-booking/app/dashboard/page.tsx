'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs'; // Clerk hook to get the authenticated user
import { supabase } from '@/lib/supabaseClient';
import BookingForm from '@/components/BookingForm'; // Assuming BookingForm is a separate component

export default function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser(); // Clerk user hook
  const [bookings, setBookings] = useState<any[]>([]); // Store bookings here
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      // Ensure that Clerk has finished loading and the user is signed in
      fetchBookings(user.id);
    }
  }, [isLoaded, isSignedIn, user]);

  const fetchBookings = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', userId); // Get bookings for the current user

      if (error) {
        alert('Error fetching bookings: ' + error.message);
      } else {
        setBookings(data || []);
      }
    } catch (error) {
      alert('Error fetching bookings: ' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {!isLoaded ? (
        <p>Loading...</p>
      ) : isSignedIn ? (
        <>
          <h1 className="text-2xl">Welcome to your Dashboard!</h1>
          <h2 className="text-xl mt-4">Your Bookings:</h2>

          {loading ? (
            <p>Loading your bookings...</p>
          ) : (
            <div className="mt-4">
              {bookings.length === 0 ? (
                <p>No bookings found. Please make a new booking.</p>
              ) : (
                <ul className="space-y-4">
                  {bookings.map((booking, index) => (
                    <li key={index} className="border p-4">
                      <h3 className="font-bold">Service: {booking.service_type}</h3>
                      <p>Date: {booking.date}</p>
                      <p>Time: {booking.time}</p>
                      <p>Address: {booking.address}</p>
                      <p>Notes: {booking.notes}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          <h2 className="text-xl mt-8">Make a New Booking:</h2>
          <BookingForm userId={user.id} />
        </>
      ) : (
        <div>You need to login first.</div>
      )}
    </div>
  );
}
