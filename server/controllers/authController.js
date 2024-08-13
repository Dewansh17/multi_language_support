const express = require('express');
const router = express.Router();
const { sendEmailOtp, verifyEmailOtp } = require('../controllers/emailController');
const { sendSmsOtp, verifySmsOtp } = require('../controllers/smsController');

router.post('/send-email-otp', sendEmailOtp);
router.post('/verify-email-otp', verifyEmailOtp);
router.post('/send-sms-otp', sendSmsOtp);
router.post('/verify-sms-otp', verifySmsOtp);

module.exports = router;
