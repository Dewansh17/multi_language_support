import React, { useState } from 'react';

const EmailVerification = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');

    const handleSendOtp = async () => {
        // Send OTP via email using fetch
        await fetch('/api/send-email-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
    };

    const handleVerifyOtp = async () => {
        // Verify OTP using fetch
        const response = await fetch('/api/verify-email-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, otp })
        });
        const result = await response.json();
        console.log(result);
    };

    return (
        <div>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="Enter your email"
            />
            <button onClick={handleSendOtp}>Send OTP</button>
            <input 
                type="text" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                placeholder="Enter OTP"
            />
            <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
    );
};

export default EmailVerification;
