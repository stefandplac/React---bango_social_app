import mongoose from 'mongoose';
const ProfileSchema = new mongoose.Schema({
    publicUserId:{
        type:Number,
    },
    phoneNumber:{
        type:String,
    },
    city:{
        type:String,
    },
    status:{
        type:String,
    },
    creationDate:{
        type:Date,
        default:Date.now,
    },
});
module.exports = Profile = mongoose.model('Profile',ProfileSchema);