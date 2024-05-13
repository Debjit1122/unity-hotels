const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const { router: authRoutes, authMiddleware } = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const roomsRoutes = require('./routes/rooms'); // Import rooms routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/rooms', roomsRoutes); // Use rooms routes

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
module.exports = app;