// const express = require('express');
// const router = express.Router();
// const { sendEmailOtp, verifyEmailOtp } = require('../controllers/emailController');
// const { sendSmsOtp, verifySmsOtp } = require('../controllers/smsController');

// router.post('/send-email-otp', sendEmailOtp);
// router.post('/verify-email-otp', verifyEmailOtp);
// router.post('/send-sms-otp', sendSmsOtp);
// router.post('/verify-sms-otp', verifySmsOtp);

// module.exports = router;

// require('dotenv').config();

// const express =require('express');
// const router=express();

// router.use(express.json());
// const userController = require('../controllers/userController')

// router.post('/send-sms-opt',userController.sendOtp);


// module.exports=router;


import express from 'express';
import { sendEmailOtp, verifyOtp } from '../controllers/emailController.js';
import { sendSmsOtp, verifySmsOtp } from '../controllers/smsController.js';

const router = express.Router();

router.post('/send-email-otp', sendEmailOtp);
router.post('/verify-email-otp', verifyOtp);
router.post('/send-sms-otp', sendSmsOtp);
router.post('/verify-sms-otp', verifySmsOtp);

export default router;
