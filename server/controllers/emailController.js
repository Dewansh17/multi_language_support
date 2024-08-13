import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export const sendEmailOtp = async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);
    const token = jwt.sign({ email, otp }, process.env.JWT_SECRET, { expiresIn: '10m' });

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ success: true, token });
    } catch (error) {
        res.status(500).send({ success: false, message: error.toString() });
    }
};

export const verifyOtp = async (req, res) => {
    const { email, otp, token } = req.body;
  
    console.log('Verifying OTP for email:', email, 'OTP:', otp, 'Token:', token);
  
    if (!token) {
      return res.status(400).json({ success: false, message: 'JWT token is required' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      console.log('Decoded token:', decoded);
  
      if (decoded.email === email && decoded.otp == otp) {
        console.log('OTP verified successfully');
        res.status(200).json({ success: true, message: 'OTP verified successfully' });
      } else {
        console.log('Invalid OTP or email does not match');
        res.status(400).json({ success: false, message: 'Invalid OTP' });
      }
    } catch (error) {
      console.error('Error verifying OTP:', {
        message: error.message,
        stack: error.stack,
        // Avoid logging entire req or res objects
        // Log only useful details
        url: req.originalUrl,
        payload: {
          email: req.body.email,
          otp: req.body.otp
        }
      });
      res.status(400).json({ success: false, message: 'Token expired or invalid' });
    }
  };
  