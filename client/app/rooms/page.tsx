// @ts-nocheck
'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Suspense } from 'react'

function InternalComponent () {
    const { user, profileInfo } = useAuth();
    const searchParams = useSearchParams();
    const router = useRouter();
    const search = searchParams.get('room')
    const [roomDetails, setRoomDetails] = useState(null);
    const [formData, setFormData] = useState({
        roomName: '',
        checkInDate: '',
        checkOutDate: '',
        numberOfGuests: '',
        userName: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        paymentStatus: '',
        amountPaid: ''
    });

    console.log(profileInfo)

    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await fetch(`https://unity-hotels-api.vercel.app/api/rooms/${search}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch room data');
                }
                const data = await response.json();
                setRoomDetails(data);
            } catch (error) {
                console.error('Error fetching room data:', error);
            }
        };

        if (search) {
            fetchRoomData();
        }
    }, [search]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedFormData = {
                ...formData,
                roomName: roomDetails.room.name,
                userName: profileInfo.username,
                fullName: profileInfo.fullname,
                email: profileInfo.email,
                phoneNumber: profileInfo.phone,
                paymentStatus: 'paid',
                amountPaid: roomDetails.room.price
            };

            // Log updatedFormData to verify that roomName is included
            console.log(updatedFormData);

            const response = await fetch('https://unity-hotels-api.vercel.app/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': localStorage.getItem('token')
                },
                body: JSON.stringify(updatedFormData)
            });
            if (!response.ok) {
                throw new Error('Failed to submit booking');
            }
            console.log('Booking submitted successfully');

            // Redirect to the same page to unmount and remount the component
            router.push(window.location.href);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };



    const handleBackClick = () => {
        router.back();
    };

    if (!roomDetails) {
        return <div>Loading...</div>;
    }

    console.log(roomDetails)

    return (
        <div>
            <button className='absolute p-8 text-white' onClick={handleBackClick}><ArrowLeft size={40} /></button>
            <div className={`w-full h-[60vh] bg-gray-500 flex items-center justify-center`}>
                <h2 className='text-4xl md:text-6xl text-white'>{roomDetails.room.name}</h2>
            </div>
            <div className="container mx-auto py-8">
                {/* Room details */}
                <p className="text-gray-700 mb-4">{roomDetails.room.description}</p>
                <p className="font-bold text-xl mb-4">{`Price: $${roomDetails.room.price} per night`}</p>
                <div className='mb-4'>
                    <h3 className="text-xl font-semibold mb-2">Specifications:</h3>
                    <ul className="list-disc list-inside">
                        <li className="text-gray-700">{`Area: ${roomDetails.room.area} square foot`}</li>
                        <li className="text-gray-700">{`Capacity: ${roomDetails.room.capacity}`}</li>
                        <li className="text-gray-700">{`Beds: ${roomDetails.room.beds}`}</li>
                        <li className="text-gray-700">{`Bathrooms: ${roomDetails.room.bathrooms}`}</li>
                    </ul>
                </div>
                <h3 className="text-xl font-semibold mb-2">Features:</h3>
                <ul className="list-disc list-inside">
                    {roomDetails.room.features.map((feature, index) => (
                        <li key={index} className="text-gray-700">{feature}</li>
                    ))}
                </ul>


                {
                    user ? (
                        <form onSubmit={handleSubmit} className="mt-8">
                            <h3 className="text-2xl font-semibold mb-4">Book Now</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="checkInDate" className="block text-gray-700 font-semibold">Check-in Date:</label>
                                    <input type="date" id="checkInDate" name="checkInDate" value={formData.checkInDate} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                                </div>
                                <div>
                                    <label htmlFor="checkOutDate" className="block text-gray-700 font-semibold">Check-out Date:</label>
                                    <input type="date" id="checkOutDate" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                                </div>
                                <div>
                                    <label htmlFor="numberOfGuests" className="block text-gray-700 font-semibold">Number of Guests:</label>
                                    <input type="number" id="numberOfGuests" name="numberOfGuests" value={formData.numberOfGuests} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                                </div>
                            </div>
                            <Button type="submit" className="mt-4 font-semibold py-2 px-4 rounded-md transition duration-300">Book Now</Button>
                        </form>
                    ) : (
                        <p className='text-center font-bold py-20 text-xl'>Please login in to book rooms!</p>
                    )
                }

            </div>
        </div>
    );
};

export default function Rooms() {
    return (
        // You could have a loading skeleton as the `fallback` too
        <Suspense>
            <InternalComponent />
        </Suspense>
    )
}