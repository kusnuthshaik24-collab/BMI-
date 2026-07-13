const mongoose = require('mongoose');
const dns = require("dns")
dns.setServers(["8.8.8.8","8.8.4.4"])
const dbURI = 'mongodb+srv://kusnuthshaik24_db_user:kusnuth@20@cluster0.umvpmlg.mongodb.net/kusnuth?appname=Cluster0'; 

const connectDB = () => {
  mongoose.connect(dbURI)
    .then(() => console.log('Connected to MongoDB successfully!'))
    .catch((err) => console.error('MongoDB connection error:', err));
};

module.exports = connectDB;
