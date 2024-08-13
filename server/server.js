// server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config(); // Added to load environment variables
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import authRoutes from './routes/authRoutes.js';
// import dotenv from 'dotenv';

// // const authRoutes = require('./routes/authRoutes');
// // const otpRoutes = require('./routes/otpRoutes'); // Add OTP routes

// // const { sendSmsOtp, verifySmsOtp } = require('./controllers/smsController');

// const app = express();
// const PORT = process.env.PORT || 2000; // Using environment variable for port

// // Middleware
// app.use(cors());
// app.use(express.json()); // Parse JSON bodies
// // app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Using environment variable for MongoDB URI
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// // Routes
// app.use('/api', authRoutes); // Mount authRoutes under /api/auth
// app.use('/api/otp', otpRoutes); // Mount otpRoutes under /api/otp

// // Additional Routes
// app.post('/api/send-sms-otp', sendSmsOtp);
// app.post('/api/verify-sms-otp', verifySmsOtp);

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// // Start server
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// require('dotenv').config();

// const mongoose=require('mongoose');
// mongoose.connect('mongodb+srv://dewanshgopani17:dbgopani17@project1.ronye8n.mongodb.net/?retryWrites=true&w=majority&appName=Project1');

// const express =require('express');
// const app=express();
 
// const port=process.env.SERVER_PORT | 2000;
// const authRoute=require('./routes/authRoutes');

// app.use('./api',authRoute);

// app.listen(port,function(){
//   console.log(`Server is running on https://localhost:${PORT}`);
// })





// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import authRoutes from './routes/authRoutes.js';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 2000;

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err));

// app.use('/api', authRoutes);

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import otpRoutes from './routes/otpRoutes.js'; // Import otpRoutes
import dotenv from 'dotenv';
import { sendSmsOtp, verifySmsOtp } from './controllers/smsController.js'; // Import the necessary functions

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 2000; // Using environment variable for port

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', authRoutes); // Mount authRoutes under /api
app.use('/api/otp', otpRoutes); // Mount otpRoutes under /api/otp

// Additional Routes
app.post('/api/send-sms-otp', sendSmsOtp);
app.post('/api/verify-sms-otp', verifySmsOtp);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
