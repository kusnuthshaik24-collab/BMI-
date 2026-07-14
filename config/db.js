const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://badi:kusnuth20@cluster0.umvpmlg.mongodb.net/BMI_Tracker'; 

const connectDB = () => {
  mongoose.connect(dbURI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));
};

module.exports = connectDB;
