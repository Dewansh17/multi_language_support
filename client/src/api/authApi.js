// // api/authApi.js
// export const sendOtp = async (mobile) => {
//     try {
//         const response = await fetch('http://localhost:2000/api/send-sms-otp', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ mobile }),
//         });
//         const data = await response.json();

//         if (data.success) {
//             alert('OTP sent successfully');
//         } else {
//             alert('Failed to send OTP: ' + data.message);
//         }
//     } catch (error) {
//         alert('Error sending OTP: ' + error.message);
//     }
// };

// export const verifyOtp = async (mobile, otp, token) => {
//     try {
//         const response = await fetch('http://localhost:2000/api/verify-sms-otp', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ mobile, otp, token }),
//         });
//         const data = await response.json();

//         if (data.success) {
//             alert('OTP verified successfully');
//         } else {
//             alert('Failed to verify OTP: ' + data.message);
//         }
//     } catch (error) {
//         alert('Error verifying OTP: ' + error.message);
//     }
// };


// authApi.js
export const sendOtp = async (url, payload) => {
  const baseUrl = 'http://localhost:2000';
  const fullUrl = `${baseUrl}${url}`;

  try {
    // Logging request details
    console.log('Sending request to:', fullUrl);
    console.log('Request payload:', payload);
    // payload?.token = jwt.sign(otp,process.env.JWT_TOKEN)

    const response = await fetch(fullUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    // Check if the response is not ok
    if (!response.ok) {
      const errorData = await response.json();
      // Enhanced error logging
      console.error('Server responded with error:', {
        status: response.status,
        statusText: response.statusText,
        ...errorData
      });
      throw new Error(errorData.message || 'Unknown error occurred while sending OTP');
    }

    // Parse and return the successful result
    const result = await response.json();
    return result;

  } catch (error) {
    // Improved error handling with additional context
    console.error('Error in sendOtp function:', {
      message: error.message,
      stack: error.stack,
      url: fullUrl,
      payload,
    });
    throw error; // Ensure the error is propagated
  }
};



  
export const verifyOtp = async (url, payload) => {
  const baseUrl = 'http://localhost:2000';
  const fullUrl = `${baseUrl}${url}`;

  try {
      console.log('Sending request to:', fullUrl);
      console.log('Request payload:', payload);

      const response = await fetch(fullUrl, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
      });

      if (!response.ok) {
          const errorData = await response.json();
          console.error('Server responded with error:', {
              status: response.status,
              statusText: response.statusText,
              ...errorData
          });
          throw new Error(errorData.message || 'Unknown error occurred while verifying OTP');
      }

      const result = await response.json();
      return result;

  } catch (error) {
      console.error('Error in verifyOtp function:', {
          message: error.message,
          stack: error.stack,
          url: fullUrl,
          payload,
      });
      throw error;
  }
};



  