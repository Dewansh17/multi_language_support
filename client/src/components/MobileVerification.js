import React, { useState } from 'react';

const MobileVerification = () => {
  const [mobile, setMobile] = useState('');

  const cleanPhoneNumber = (number) => {
    return number.replace(/\D/g, ''); // Remove non-digit characters
  };

  const handleSendOtp = async () => {
    const phoneNumber = `+${cleanPhoneNumber(mobile)}`; // Ensure `mobile` contains only numeric part

    if (!/^\+\d{10,15}$/.test(phoneNumber)) {
      console.error('Invalid phone number format');
      return;
    }

    try {
      const response = await fetch('/api/send-sms-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile: phoneNumber }),
      });

      const result = await response.json();
      if (result.success) {
        console.log('OTP sent successfully');
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Enter your mobile number"
      />
      <button onClick={handleSendOtp}>Send OTP</button>
    </div>
  );
};

export default MobileVerification;
