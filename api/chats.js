import express from 'express';
import {check, validationResult} from 'express-validator';
import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config';
import Chats from '../models/Chats.js';

const router=express.Router();

router.post(
    '/',
    
    async (req,res,next)=>{
       
            let {author, friend, chatContent,chatType} = req.body;
            author.publicUserId=Number(author.publicUserId);
            friend.publicUserId=Number(friend.publicUserId);
            console.log('attachment: ',chatContent,' type chatContent:',chatType);
            
            let chatBody = {
                user:author.publicUserId, 
                chatContent:chatContent,
                chatType:chatType,
            };

            if(author.publicUserId===friend.publicUserId){
                res.status(401).json({errors:{param:"user", msg:"the sender and recipient cannot be the same"}});
            }

            try{
                let chat = await Chats.findOne({$or:[
                                                    {"user1.publicUserId":author.publicUserId, "user2.publicUserId":friend.publicUserId},
                                                    {"user1.publicUserId":friend.publicUserId, "user2.publicUserId":author.publicUserId}
                                                    ]
                                                });  


                //@ first we check if it is an atttachment
                
                if(!chat) {
                        //@ there is no open conversation between user1 and user 2
                        console.log('chatContent',chatContent);
                        if(chatContent===''){
                                    chat= await new Chats({
                                        user1:{name:author.name, publicUserId:author.publicUserId},
                                        user2:{name:friend.name, publicUserId:friend.publicUserId},
                                       
                                    });
                                    await chat.save();
                                }
                                else{
                                    chat= await new Chats({
                                        user1:{name:author.name, publicUserId:author.publicUserId},
                                        user2:{name:friend.name, publicUserId:friend.publicUserId},
                                        chats:chatBody,
                                    });
                                    await chat.save();    
                                }
                        
                    
                }
                else{
                    //@ there is already an open chat with the structure user1:user1 user2:user2
                   
                    if(chatContent!==''){
                        chat.chats.push(chatBody);
                        await chat.save();
                    }
                   
                  
                   
                }
                //@ i passed one more property from frnt end only in those cases where there is a new chat
                //@ case in which we need the server to return us the updated chat conversaton including new chats
                let {id}=req.body;
                if(id){
                    try{
                        const chat = await  Chats.findById({_id:id});
                        const chats= await Chats.find({$or:[
                                                            {"user1.publicUserId":user},
                                                            {"user2.publicUserId":user}
                                                        ]},{'chats':{'$slice':-1}});
                        res.json({chat:chat, chats:chats});
                    }
                    catch(err){
                        console.log(err);
                        res.status(500).json({error:'server error'});
                
                    }  
                }
                else {  res.json({msg:'successfully inserted into database'});
                };
            }
            catch(err){
                    console.log(err);
                    res.status(500).json({errors:{param:"database", msg:"there was a database errros "}});
            }
        // }
    }
);
router.get(['/getChatsList/:user','/getChatsList/:user/:searchValue'],async (req,res,next)=>{
	// const {token}=req.body;
    let {user,searchValue}=req.params;
    console.log(user);
    console.log('searchValue',searchValue);
	try{
		// @ return also the last chat message for every conversation open
        
            let chats=await Chats.find({$or:[
                                                {"user1.publicUserId":user},
                                                {"user2.publicUserId":user}
                                            ]},{'chats':{'$slice':-1}});
            if(searchValue){
                //@ if a searchValue is present we will return filtered data considering the searchValue
                chats= chats.filter(
                                    chat=> (String(chat.user1.name).toLowerCase().indexOf(String(searchValue).toLowerCase(),0)===0
                                            && Number(chat.user1.publicUserId)!==Number(user) )
                                            || (String(chat.user2.name).toLowerCase().indexOf(String(searchValue).toLowerCase(),0)===0
                                                && Number(chat.user2.publicUserId!==Number(user)) )
                                    
                                 );
                res.json(chats);
            }   
            else{
                res.json(chats);
            }                             
           

	}
	catch(err){
		console.log(err);
	}
});

router.get(['/getChat/:id','/getChat/:id/:userId'], async(req,res,next)=>{
    let {id,userId}=req.params;
    
    try{
        //@ when we return all the chats from a specific conversation
        //@ we should change the value of seen for every chat that is not written by 
        //@ the user who made the request
        const chat = await  Chats.findById({_id:id});
        // let currentLength=  chat.chats.length;
        if(!chat){
            res.json({error:'there is no existing chat yet'});
        }
        else{
                chat.chats.map(chat=> {
                    if(Number(chat.user)!==Number(userId)){
                        chat.seen=true;
                    }
                });
                chat.save();
            
                    res.json(chat);
            }
       
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:'server error'});

    }
});
export default router;