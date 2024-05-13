'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import BookingHistory from '../../components/booing-history'; // Assuming you have a component for booking history
import { Calendar, Contact, Mails, MapPin, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Profile = () => {
    //@ts-ignore
    const { user, logout, profileInfo } = useAuth();
    const router = useRouter()

    const handleLogout = () => {
        logout();
    };
    //@ts-ignore
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        //@ts-ignore
        return date.toLocaleDateString('en-US', options);
    };

    if (!user) {
        return (
            <div className="flex items-center justify-center h-screen">
                Please log in to view your profile.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <header className="bg-white shadow-sm py-4">
                <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold">Your Profile</h1>
                    <button className="text-red-500 hover:text-red-700" onClick={handleLogout}>Logout</button>
                </div>
            </header>
            <main className="container h-screen flex-1 py-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h2 className="text-lg font-semibold mb-2">Personal Information</h2>
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                                        <User />
                                    </div>
                                    <p className="text-gray-700">Username: {profileInfo.username}</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                                        <Phone />
                                    </div>
                                    <p className="text-gray-700">Phone: {profileInfo.phone}</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                                        <Mails />
                                    </div>
                                    <p className="text-gray-700">Email: {profileInfo.email}</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                                        <Contact />
                                    </div>
                                    <p className="text-gray-700">Full Name: {profileInfo.fullname}</p>
                                </div>
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                                        <Calendar />
                                    </div>
                                    <p className="text-gray-700">Date of Birth: {formatDate(profileInfo.dob)}</p>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                                        <MapPin />
                                    </div>
                                    <p className="text-gray-700">Address: {profileInfo.address}</p>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-lg font-semibold mb-2">Booking History</h2>
                                <BookingHistory />
                                <Button className='w-full mt-8' onClick={() => router.push('/')}>Browse Rooms</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
