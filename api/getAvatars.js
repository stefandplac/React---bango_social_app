import express from 'express';
import Avatars from '../models/Avatars.js';

const router=express.Router();

router.get('/',async (req,res,next)=>{
        try{
            let avatars = await Avatars.findOne({});
            if(!avatars){
                res.status(401).json({error:'avatars do not exists'});
            }
            console.log(avatars);
            res.json(avatars);
        }
        catch(err){
            res.status(500).json({error:err});
        }
});

export default router;