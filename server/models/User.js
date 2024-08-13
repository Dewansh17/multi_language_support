import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add other fields as necessary
});

const User = mongoose.model('User', userSchema);

export default User;




// const mongoose=require('mongoose');
// const UserSchema =new mongoose.Schema({
//     phoneNumber:{
//         type:String,
//         required:true
//     },
//     otp:{
//         type:String,
//         required:true
//     },
//     otpExpiration:{
//         type:Date,
//         default:Date.now,
//         get:(otpExpiration)=>otpExpiration.getTime(),
//         set:(otpExpiration)=>new Date(otpExpiration)
//     }
// });
// module.exports = mongoose.model('Otp',UserSchema);