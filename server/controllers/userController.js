const OtpModel=require('../models/User');

const otpGenerator=require('otp-generator');
const twilio=require('twilio');
const accountSid=process.env.TWILIO_ACCOUNT_SID;
const authToken=process.env.TWILIO_AUTH_TOKEN;
const twilioClient=new twilio(accountSid,authToken);


const sendOtp = async(req,res)=>{
    try{
        const otp =otpGenerator.generate(5);
        return res.status(200).json({
            success:true,
            msg: otp
        });


    }
    catch(error){
        return res.status(400).json({
            success:false,
            msg: error.message
        })
    }
}