'use client'
import React, { useState } from 'react';
import { Button } from './ui/button';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        checkInDate: '',
        checkOutDate: '',
        numberOfGuests: '',
        fullName: '',
        email: '',
        phoneNumber: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send booking details to server)
        console.log(formData);
        // Clear form fields
        setFormData({
            checkInDate: '',
            checkOutDate: '',
            numberOfGuests: '',
            fullName: '',
            email: '',
            phoneNumber: ''
        });
    };

    return (
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
                <div>
                    <label htmlFor="fullName" className="block text-gray-700 font-semibold">Full Name:</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                </div>
                <div>
                    <label htmlFor="phoneNumber" className="block text-gray-700 font-semibold">Phone Number:</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="block w-full mt-1 p-2 border border-gray-300 rounded-md" required />
                </div>
            </div>
            <Button type="submit" className="mt-4 font-semibold py-2 px-4 rounded-md transition duration-300">Book Now</Button>
        </form>
    );
};

export default BookingForm;
