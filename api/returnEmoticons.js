import express from 'express';
import Emoticons from '../models/Emoticons.js';

const router=express.Router();

router.get('/',async (req,res,next)=>{
        try{
            const emoticon= await Emoticons.find({});
            if(!emoticon){
                res.json({error:'emoticon doesnt exist'});
            }
            else{
                res.send(emoticon);
            }
        }
        catch(err){
            res.status(500).json({error:'server error'});
        }
});

export default router;
