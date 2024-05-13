const express = require('express');
const router = express.Router();
const Room = require('../models/Rooms');

// Route to handle GET requests to fetch all rooms
router.get('/', async (req, res) => {
    try {
        // Fetch all rooms from the database
        const rooms = await Room.find();

        res.status(200).json({ success: true, rooms });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Route to handle POST requests to add a new room
router.post('/', async (req, res) => {
    try {
        // Extract room data from request body
        const { image, name, description, price, area, capacity, beds, bathrooms, features, reviews } = req.body;

        // Create a new room instance
        const room = new Room({
            image,
            name,
            description,
            price,
            area,
            capacity,
            beds,
            bathrooms,
            features,
            reviews
        });

        // Save the room to the database
        await room.save();

        res.status(201).json({ success: true, message: 'Room added successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Route to handle GET requests to fetch a room by name
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        // Find the room with the provided name
        const room = await Room.findOne({ slug });

        if (!room) {
            return res.status(404).json({ success: false, message: 'Room not found' });
        }

        res.status(200).json({ success: true, room });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
