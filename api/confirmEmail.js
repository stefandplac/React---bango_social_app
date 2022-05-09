import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import User from '../models/User.js';

const router=express.Router();

router.get('/:id',async (req,res,next)=>{
            //  console.log(req.params.id);
            //  res.json({msg:"any message get method"});
             const token=req.params.id;
             console.log('token',token);
           
             try {
                const decoded = await jsonwebtoken.verify(token, process.env.jwtSecret);
                // console.log('decoded.user',decoded.user);
                const user=await User.findById(decoded.user.id);
                // console.log('user.email:',user.email);
                user.activated=true;
                await user.save();
               
                res.send(`
                    <body style="display:flex; align-items:center; justify-content:center; box-shadow:0 0 50px lightblue;">
                        <div style="width:350px; height:200px;  text-align:center; border:1px solid lightgrey; padding:40px;">
                            <h3>Your email address 
                                 <span style="color:lightsalmon"> ${user.email} </span> 
                                  has been confirmed.</h3>
                                  <h3 style="color:lightseagreen;"> Your BANGO account is now activated. 
                            </h3>
                        </div>
                    </body>
                        `);
                console.log('email was confirmed. userId ',user.email );
               
            } catch (error) {
                console.log(error);
                res.status(401).send(`<h1>the token is invalid or has expired</h1>`);
            }
            
           
});
export default router;