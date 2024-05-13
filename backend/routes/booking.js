// routes/booking.js

const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// POST /api/bookings - Create a new booking
router.post('/', async (req, res) => {
    try {
        const bookingData = req.body;
        const newBooking = new Booking(bookingData);
        await newBooking.save();
        console.log('New booking:', newBooking);
        res.status(201).json({ message: 'Booking successful' });
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ message: 'Failed to create booking' });
    }
});

// GET /api/bookings - Get all bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching all bookings:', error);
        res.status(500).json({ message: 'Failed to fetch all bookings' });
    }
});

// GET /api/bookings/:username - Get bookings by username
router.get('/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const bookings = await Booking.find({ userName: username });
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching booking history:', error);
        res.status(500).json({ message: 'Failed to fetch booking history' });
    }
});

module.exports = router;
