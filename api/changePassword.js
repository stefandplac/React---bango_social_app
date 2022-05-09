import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/User.js';
import {check, validationResult} from 'express-validator';
import 'dotenv/config';
import bcryptjs from 'bcryptjs';

const router=express.Router();
router.post(
        '/',
        [
            check('password', 'The password must be at least 4 characters').isLength({min:4}),
        ],
       async (req,res,next)=>{
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()});
            }
            const {password, token} =req.body;
          
            try{
                const decoded=await  jsonwebtoken.verify(token,process.env.jwtSecret);
                const user = await User.findById(decoded.user.id);
                // if(user.recoveryTK!==token){
                //     res
                //     .status(401)
                //     .json({errors:{param:"token", msg:'Invalid token. You are not authorized'}});
                // }
                const salt= await bcryptjs.genSalt(10);
                user.password=await bcryptjs.hash(password,salt);
                user.recoveryTK='';
                await user.save();
                res.json({msg:'password has been changed'});
                
            }
            catch(err){
                console.log(err);
                res.status(401).json({errors:[{param:'token',msg:'you are not authorized to access this resource'}]});
            }
        }

);
export default router;