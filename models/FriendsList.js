import mongoose from 'mongoose';

const friendsList=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
    },
    friendsList:[
        {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user',
        },
    },
    ]
});
export default mongoose.model('friendsList',friendsList);