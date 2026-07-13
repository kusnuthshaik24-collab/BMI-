const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bmi_tracker';

app.use(cors());
app.use(express.json());

mongoose.connect(mongoURI)
  .then(() => console.log('Database connected successfully!'))
  .catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
  });

const bmiSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bmi: { type: Number, required: true },
  category: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const BmiRecord = mongoose.model('BmiRecord', bmiSchema);

app.post('/api/bmi', async (req, res) => {
  try {
    const { name, bmi, category } = req.body;
    const newRecord = new BmiRecord({ name, bmi, category });
    await newRecord.save();
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/bmi', async (req, res) => {
  try {
    const records = await BmiRecord.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/bmi/:id', async (req, res) => {
  try {
    const { name, bmi, category } = req.body;
    const updatedRecord = await BmiRecord.findByIdAndUpdate(
      req.params.id,
      { name, bmi, category },
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
