// config/db.js
const mongoose = require('mongoose');
const config = require('config');
const db = config.get(process.env.MONGO_URI);
const dbName = 'unity_hotels';

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            dbName: dbName,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;
