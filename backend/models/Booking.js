const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    roomName: { type: String, required: true },
    userName: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    numberOfGuests: { type: Number, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    amountPaid: { type: String, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
