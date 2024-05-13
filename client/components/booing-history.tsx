// @ts-nocheck
import { useAuth } from '@/contexts/AuthContext';
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

const BookingHistory = () => {
    const [bookings, setBookings] = useState([]);
    const { profileInfo, user } = useAuth();
    useEffect(() => {
        fetchBookingHistory();
    }, []); // Fetch booking history on component mount

    const fetchBookingHistory = async () => {
        try {
            const response = await fetch(`https://unity-hotels-api.vercel.app/api/bookings/${profileInfo.username}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': user.token
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch booking history');
            }
            const data = await response.json();
            setBookings(data);
        } catch (error) {
            console.error('Error fetching booking history:', error);
        }
    };

    return (
        <div className="space-y-4">
            {bookings.map(booking => (
                <div key={booking._id} className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between flex-wrap">
                    <div>
                        <h3 className="text-lg font-semibold">{booking.roomName}</h3>
                        <p className="text-gray-600">Check-in: {new Date(booking.checkInDate).toLocaleDateString()}</p>
                        <p className="text-gray-600">Check-out: {new Date(booking.checkOutDate).toLocaleDateString()}</p>
                        <p className="text-sm font-semibold text-green-600">Confirmed</p>
                    </div>
                    <Button variant="destructive">Cancel</Button>
                </div>
            ))}
        </div>
    );
};

export default BookingHistory;
