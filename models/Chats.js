import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
    user1:{
               name:{
                   type:String
                },
               publicUserId:{
                   type:Number,
               },
    },
     user2:{
                name:{
                    type:String
                },
                publicUserId:{
                    type:Number,
                },
    },
    
    chats:[
        {
            user:{
                type:Number,
                ref:'user',
            },
            chatContent:{
                type:String,
                // required:true,
            },
            seen:{
                type:Boolean,
                default:false,
            },
            chatType:{
                type:String,
                default:'',
            },
            date:{
                type:Date,
                default:Date.now,
            }
        },
    ],
    date:{
        type:Date,
        default:Date.now,
    }

});
export default mongoose.model('Chats',chatSchema);