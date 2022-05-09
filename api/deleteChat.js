import express from 'express';

//@ functions imports....


//@import mongoose schema model
import Chats from '../models/Chats.js';

const router=express.Router();

router.delete('/:chatId/:user', async (req,res,next)=>{
    try{
        const {chatId,user} = req.params;
        console.log('chatId params:',chatId);
        let chat = await Chats.findById(String(chatId));
        if(!chat){
            res.status(401).json({error:"chat not found in database"});
        }
        await chat.remove();
        //@ after deletionn return as response the new list of conversations
        let chats=await Chats.find({$or:[
            {"user1.publicUserId":user},
            {"user2.publicUserId":user}
        ]},{'chats':{'$slice':-1}});
        console.log(chats);
        res.json(chats);

    }
    catch(err){
        res.status(500).json({error:"server error"});
    }
});

export default router;