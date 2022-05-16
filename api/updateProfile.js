import express from 'express';
import User from '../models/User.js';

const router=express.Router();

router.put('/',async (req,res,next)=>{
    let {publicUserId,avatar, status, phoneNumber, city,country} = req.body;
    try{
        const user = await User.findOne({publicUserId:publicUserId});
        console.log(user);
        if(!user){
            res.status(401).json({error:'user does not exist'});
        }
        else{
            if(avatar){ user.avatar=String(avatar); console.log('####')};
            if(status||status==='') { user.status=status; };
            if(phoneNumber||phoneNumber==='')  { user.profile.phoneNumber=phoneNumber; };
            if(city||city==='') { user.profile.city=city; };
            if(country||country===''){user.profile.country=country};
            console.log(user);
        }
        // console.log(avatar,status, phoneNumber, city);
        await user.save();
        res.json(user);

    }
    catch(err){
        res.status(500).json({erros:'server error'});
    }

});

export default router;
