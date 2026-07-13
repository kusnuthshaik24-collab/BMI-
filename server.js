const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bmi_tracker';

mongoose.connect(mongoURI)
  .then(() => console.log('Database connected successfully!'))
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });
