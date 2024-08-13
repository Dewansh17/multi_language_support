// src/components/Auth.js

import React, { useContext, useState } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { sendOtp, verifyOtp } from '../api/authApi';
// import jwt from 'jsonwebtoken';


const Auth = () => {
    const { translation, language } = useContext(LanguageContext);
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [token, setToken] = useState(''); 

    const handleSendOtp = async () => {
      const url = language === 'fr' ? '/api/send-email-otp' : '/api/send-sms-otp';
      const payload = language === 'fr' ? { email } : { mobile };
      
      console.log('Preparing to send OTP:', url, payload);
      
      try {
        const result = await sendOtp(url, payload);
        console.log('API response:', result);
    
        if (result.success) {
          setOtpSent(true);
          setToken(result.token); // Store the token from the API response
          alert('OTP sent successfully!');
        } else {
          alert('Failed to send OTP: ' + result.message);
        }
      } catch (error) {
        console.error('Error during OTP handling:', {
          message: error.message,
          stack: error.stack,
        });
        alert('Error sending OTP: ' + (error.message || 'An unexpected error occurred'));
      }
    };
    
      const handleVerifyOtp = async () => {
        const url = language === 'fr' ? '/api/verify-email-otp' : '/api/verify-sms-otp';
        const payload = language === 'fr' ? { email, otp, token } : { mobile, otp, token }; // Include the token
      
        try {
          const result = await verifyOtp(url, payload);
      
          if (result.success) {
            alert('OTP verified successfully!');
          } else {
            alert('Failed to verify OTP: ' + result.message);
          }
        } catch (error) {
          console.error('Error during OTP verification:', error);
          alert('Error verifying OTP: ' + (error.message || 'An unexpected error occurred'));
        }
      };
      

    return (
        <div>
            {language === 'fr' ? (
                <input
                    type="email"
                    placeholder={translation.enterEmail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            ) : (
                <input
                    type="text"
                    placeholder={translation.enterMobile}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                />
            )}
            <button onClick={handleSendOtp}>{translation.sendOtp}</button>

            {otpSent && (
                <>
                    <input
                        type="text"
                        placeholder={translation.enterOtp}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button onClick={handleVerifyOtp}>{translation.verifyOtp}</button>
                </>
            )}
        </div>
    );
};

export default Auth;