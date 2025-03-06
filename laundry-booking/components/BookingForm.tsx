'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type BookingFormProps = {
  userId: string; // Expect userId as a prop
};

export default function BookingForm({ userId }: BookingFormProps) {
  const [form, setForm] = useState({
    service_type: '',
    date: '',
    time: '',
    address: '',
    notes: ''
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!userId) {
      alert('You must be logged in to make a booking');
      return;
    }

    const { error } = await supabase.from('bookings').insert([{
      ...form,
      user_id: userId, // Insert the actual authenticated user's ID
    }]);

    if (error) {
      alert('Error booking laundry: ' + error.message);
    } else {
      alert('Booking successful!');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" placeholder="Service Type" value={form.service_type} onChange={(e) => setForm({ ...form, service_type: e.target.value })} className="border p-2 w-full" />
      <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="border p-2 w-full" />
      <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className="border p-2 w-full" />
      <input type="text" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="border p-2 w-full" />
      <textarea placeholder="Notes" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="border p-2 w-full"></textarea>
      <button type="submit" className="bg-blue-600 text-white p-2">Submit Booking</button>
    </form>
  );
}
