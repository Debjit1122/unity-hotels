// models/Room.js

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    features: {
        type: [String],
        default: []
    },
    slug: {
        type: String,
        required: true, 
    }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
