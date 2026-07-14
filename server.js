// 1. Bypass restricted ISP local DNS lookup blocks
const dns = require('node:dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000; // Render automatically assigns 10000

const mongoURI = process.env.MONGODB_URI || 'mongodb://badi:choti20@cluster0.umvpmlg.mongodb.net/BMI_Tracker';

// --- BULLETPROOF CORS CONFIGURATION ---
app.use(cors({
  // Setting origin to true dynamically reflects the requesting origin.
  // This automatically accepts localhost, Vercel subdomains, and custom domains.
  origin: true, 
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Database Connection
mongoose.connect(mongoURI)
  .then(() => console.log('Database connected successfully!'))
  .catch((err) => {
    console.error('Database connection error:', err.message);
  });

// Schema definition
const bmiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  bmi: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const BmiRecord = mongoose.model('BmiRecord', bmiSchema);

// --- ROUTES ---

// Create
app.post('/api/bmi', async (req, res) => {
  try {
    const { name, age, height, weight, bmi, category } = req.body;
    
    if (!name || age === undefined || !height || !weight || bmi === undefined || !category) {
      return res.status(400).json({ error: 'All fields (name, age, height, weight, bmi, category) are required.' });
    }

    const newRecord = new BmiRecord({ name, age, height, weight, bmi, category });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read
app.get('/api/bmi', async (req, res) => {
  try {
    const records = await BmiRecord.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update
app.put('/api/bmi/:id', async (req, res) => {
  try {
    const { name, age, height, weight, bmi, category } = req.body;
    const updatedRecord = await BmiRecord.findByIdAndUpdate(
      req.params.id,
      { name, age, height, weight, bmi, category },
      { new: true }
    );
    if (!updatedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete
app.delete('/api/bmi/:id', async (req, res) => {
  try {
    const deletedRecord = await BmiRecord.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
