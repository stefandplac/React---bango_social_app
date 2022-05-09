import express from 'express';
import {check, validationResult} from 'express-validator';
import jsonwebtoken from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/User.js';

const router=express.Router();

router.post(
    '/',
    [
        check('email', 'Please use a valid email').isEmail(),
    ],
    async (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res
                    .status(400)
                    .json({errors:errors.array()});
        }
        else{
            const {email}=req.body;
            try{
                let user=await User.findOne({email:email});
                //@ we will check if a user has been found
                //@ if not then we return an error
                if(!user){
                    res.status(401).json({errors:[{param:'user', msg:`The email ${email} is not registered `}]});
                }
                //after we identified the user we generate
                //the jsonwebtoken and send email with link
                const payload={
                    user:{
                        id:user.id,
                    }
                };
                jsonwebtoken.sign(
                    payload,
                    process.env.jwtSecret,
                    {expiresIn:300000},
                    (err,token)=>{
                        if(err) throw err;
                        const transporter=nodemailer.createTransport({
                            port:465,
                            host:"smtp.gmail.com",
                            auth:{
                                user:`${process.env.BOXMail}`,
                                pass:`${process.env.BOXMailKey}`,
                            },
                            secure:true,
                        });

                        const mailData={
                            from:"bango.office@gmail.com",
                            to:`${user.email}`,
                            subject:'Bango Password Recovery',
                            html:`<h1>Click for resseting your password with bango</h1>
                                    <p>http://localhost:3000/resetpass/${token}</p>`,
                        };
                        transporter.sendMail(mailData, function(err,info){
                            if(err){
                                res.status(401).json({email:"Email address is not valid"});
                            }
                           
                            res.status(200).send({message:"Mail sent", info:info});
                        });
                        user.recoveryTK=token;
                        user.save();
                    },
                );
                
            }
            catch(err){
                console.log(err);
                // res.status(500).json({errors:{}});
            }
        }
    }
);
export default router;