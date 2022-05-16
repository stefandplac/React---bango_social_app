import express from 'express';
import User from '../models/User.js';

const router=express.Router();

router.get('/:userId', async (req,res,next)=>{
    let {userId} = req.params;
    try{    
        let user = await User.findOne({publicUserId:userId}, 'name publicUserId activated avatar profile status');
        if(!user){
            res.status(401).json({errors:'user not found'});
        }
        console.log(user);
        res.json(user);
    }
    catch(err){
        res.status(500).json({error:'server errror'});
    }

});

export default router;