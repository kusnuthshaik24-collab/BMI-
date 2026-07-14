const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/bmi_tracker'; 

const connectDB = () => {
  mongoose.connect(dbURI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));
};

module.exports = connectDB;
