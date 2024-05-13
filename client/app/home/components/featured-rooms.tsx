// @ts-nocheck
'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const FeaturedRooms = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('https://unity-hotels-api.vercel.app/api/rooms');
                if (!response.ok) {
                    throw new Error('Failed to fetch featured rooms');
                }
                const data = await response.json();
                setRooms(data.rooms);
            } catch (error) {
                console.error('Error fetching featured rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    console.log(rooms)

    return (
        <section className="bg-gray-200 py-12">
            <div className="container mx-auto">
                <h2 className="text-3xl font-semibold mb-8 text-center">Available Rooms</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {rooms.map(room => (
                        <div key={room.name} className="border border-gray-300 rounded-lg overflow-hidden">
                            <Link href={`/rooms?room=${room.slug}`}>
                                <img src="https://place-hold.it/500" alt="" className="w-full h-64 object-cover cursor-pointer" />
                            </Link>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">{room.name}</h3>
                                <p className="font-bold mb-4">{`Price: $${room.price} per night`}</p>
                                <Link href={`/rooms?room=${room.slug}`} className="text-amber-500 font-semibold">Book Now</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedRooms;
