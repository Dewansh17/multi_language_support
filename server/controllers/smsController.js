// // server/controllers/smsController.js

// const twilio = require('twilio');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// const sendSmsOtp = async (req, res) => {
//     const { mobile } = req.body;
//     if (!mobile.startsWith('+')) {
//         return res.status(400).send({ success: false, message: 'Please include the country code in the mobile number.' });
//     }
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     const token = jwt.sign({ mobile, otp }, process.env.JWT_SECRET, { expiresIn: '10m' });

//     try {
//         await client.messages.create({
//             body: `Your OTP code is ${otp}`,
//             from: process.env.TWILIO_PHONE_NUMBER,
//             to: mobile,
//         });
//         res.status(200).send({ success: true, token });
//     } catch (error) {
//         res.status(500).send({ success: false, message: error.toString() });
//     }
// };

// const verifySmsOtp = (req, res) => {
//     const { mobile, otp, token } = req.body;
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (decoded.mobile === mobile && decoded.otp == otp) {
//             res.status(200).send({ success: true });
//         } else {
//             res.status(400).send({ success: false, message: 'Invalid OTP' });
//         }
//     } catch (error) {
//         res.status(400).send({ success: false, message: 'Token expired or invalid' });
//     }
// };

// module.exports = {
//     sendSmsOtp,
//     verifySmsOtp,
// };


// controllers/smsController.js
// const twilio = require('twilio');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// const sendSmsOtp = async (req, res) => {
//     const { mobile } = req.body;
//     if (!mobile || !mobile.startsWith('+')) {
//         return res.status(400).json({ success: false, message: 'Invalid phone number format. Please include country code.' });
//     }
//     const otp = Math.floor(100000 + Math.random() * 900000);
//     const token = jwt.sign({ mobile, otp }, process.env.JWT_SECRET, { expiresIn: '10m' });

//     try {
//         await client.messages.create({
//             body: `Your OTP code is ${otp}`,
//             from: process.env.TWILIO_PHONE_NUMBER,
//             to: mobile,
//         });

//         res.status(200).json({ success: true, token });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// const verifySmsOtp = (req, res) => {
//     const { mobile, otp, token } = req.body;
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (decoded.mobile === mobile && decoded.otp == otp) {
//             res.status(200).json({ success: true });
//         } else {
//             res.status(400).json({ success: false, message: 'Invalid OTP' });
//         }
//     } catch (error) {
//         res.status(400).json({ success: false, message: 'Token expired or invalid' });
//     }
// };

// module.exports = {
//     sendSmsOtp,
//     verifySmsOtp,
// };


// smsController.js
// import Otp from '../models/otpModel.js';
// import otpGenerator from 'otp-generator';
// import twilio from 'twilio';
// import dotenv from 'dotenv';

// dotenv.config();

// const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;
// const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// export const sendSmsOtp = async (req, res) => {
//   const { mobile } = req.body;

//   console.log('Received phone number:', mobile);

//   // Updated regex to match international phone number formats
//   if (!/^\+\d{10,15}$/.test(mobile)) {
//     console.error('Phone number format is invalid:', mobile);
//     return res.status(400).send({ success: false, message: 'Invalid phone number format' });
//   }

//   try {
//     const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });
//     console.log('Generated OTP:', otp);

//     const message = await client.messages.create({
//       body: `Your OTP code is: ${otp}`,
//       from: TWILIO_PHONE_NUMBER, // Using TWILIO_PHONE_NUMBER directly
//       to: mobile,
//     });

//     console.log('OTP sent successfully:', message.sid);
//     res.status(200).send({ success: true, message: 'OTP sent successfully', otp });
//   } catch (error) {
//     console.error('Error sending OTP:', error);
//     res.status(500).send({ success: false, message: 'Error sending OTP' });
//   }
// };

// export const verifySmsOtp = async (req, res) => {
//   const { mobile, otp } = req.body;

//   console.log('Verifying OTP for mobile:', mobile, 'OTP:', otp);

//   try {
//     const storedOtp = await Otp.findOne({ mobile });

//     if (storedOtp) {
//       console.log('Stored OTP:', storedOtp.otp);

//       if (storedOtp.otp === otp) {
//         console.log('OTP verified successfully');
//         res.status(200).json({ success: true, message: 'OTP verified successfully' });
//       } else {
//         console.log('Invalid OTP');
//         res.status(400).json({ success: false, message: 'Invalid OTP' });
//       }
//     } else {
//       console.log('No OTP found for mobile:', mobile);
//       res.status(400).json({ success: false, message: 'Invalid OTP' });
//     }
//   } catch (error) {
//     console.error('Error verifying OTP:', error);
//     res.status(500).json({ success: false, message: 'Error verifying OTP' });
//   }
// };

import Otp from '../models/otpModel.js';
import otpGenerator from 'otp-generator';
import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER } = process.env;
const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const sendSmsOtp = async (req, res) => {
  const { mobile } = req.body;

  console.log('Received phone number:', mobile);

  if (!/^\+\d{10,15}$/.test(mobile)) {
    console.error('Phone number format is invalid:', mobile);
    return res.status(400).send({ success: false, message: 'Invalid phone number format' });
  }

  try {
    const otp = otpGenerator.generate(6, { upperCase: true, specialChars: false });
    console.log('Generated OTP:', otp);

    const message = await client.messages.create({
      body: `Your OTP code is: ${otp}`,
      from: TWILIO_PHONE_NUMBER,
      to: mobile,
    });

    console.log('OTP sent successfully:', message.sid);

    // Save the OTP to the database associated with the mobile number
    const otpEntry = new Otp({ mobile, otp });
    await otpEntry.save();  // Remove the callback, use await

    console.log('OTP saved to database:', otpEntry);
    return res.status(200).send({ success: true, message: 'OTP sent and saved successfully' });

  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).send({ success: false, message: 'Error sending OTP' });
  }
};


export const verifySmsOtp = async (req, res) => {
  const { mobile, otp } = req.body;

  console.log('Verifying OTP for mobile:', mobile, 'OTP:', otp);

  try {
    const storedOtp = await Otp.findOne({ mobile });

    if (storedOtp) {
      console.log('Stored OTP:', storedOtp.otp);

      if (storedOtp.otp === otp) {
        console.log('OTP verified successfully');
        res.status(200).json({ success: true, message: 'OTP verified successfully' });
      } else {
        console.log('Invalid OTP');
        res.status(400).json({ success: false, message: 'Invalid OTP' });
      }
    } else {
      console.log('No OTP found for mobile:', mobile);
      res.status(400).json({ success: false, message: 'Invalid OTP' });
    }
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ success: false, message: 'Error verifying OTP' });
  }
};

