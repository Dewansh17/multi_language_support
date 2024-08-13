import express from 'express';
import { sendSmsOtp, verifySmsOtp } from '../controllers/smsController.js';

const router = express.Router();

// Define routes
router.post('/send', sendSmsOtp);
router.post('/verify', verifySmsOtp);

export default router; // Ensure this line is present
