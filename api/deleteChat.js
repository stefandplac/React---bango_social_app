import express from 'express';


//@import mongoose schema model
import Chats from '../models/Chats.js';

const router=express.Router();

router.delete('/:chatId/:user', async (req,res,next)=>{
    let {chatId,user} = req.params;
    // user=Number(user);
    // chatId=String(chatId);
    console.log('chatId params:',chatId);
    console.log('user param:',user);

    try{
        
        
        let chat = await Chats.findById({_id:chatId});
        if(!chat){
            console.log('chat was not found');
            res.status(401).json({error:"chat not found in database"});
        }
        await chat.remove();
        console.log('chat was found and removed');
        //@ after deletionn return as response the new list of conversations
        let chats=await Chats.find({$or:[
            {"user1.publicUserId":user},
            {"user2.publicUserId":user}
        ]},{'chats':{'$slice':-1}});
        if(!chats){
            res.json({chatsList:[],chatToDisplay:{}});
        }
        if(chats){
            //@ after deleting one chat is there are more of them then we return the updated list of chats
            // console.log('we return the updated list of chats if there are more after deletion');
            // console.log(chats);
            // console.log('chats[0]',chats[0]);
            if(chats[0]){
                res.status(200).json({chatsList:chats, chatToDisplay:chats[0]});
            }
            else{
                res.status(200).json({chatsList:[],chatToDisplay:{}});
            }
            
        }
        // else{
        //     //@when no chats are found after deleting the last chat the server should return an empty array as response
        //     console.log('we return an empty array of chats cause after deletion no chats exist anymore');
        //     res.status(200).json({chats:[],chatToDisplay:{}});
        // }
        // res.json({msg:'successfully deleted'});
        

    }
    catch(err){
        res.status(500).json({error:"server error"});
    }
});

export default router;