import express from 'express';
import { check, validationResult } from 'express-validator';
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/User.js';
import nodemailer from 'nodemailer';


const router = express.Router();

router.get('/',  (req, res) => res.send('Test users route'));

export const tokenX={};
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please use a valid email').isEmail(),
		check(
			'password',
			'The password must contain at least 4 character'
		).isLength({ min: 4 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		} else {
			// res.send('Successful registration!');
			const { name, email, password } = req.body;

			try {
				// check if user exists
				let user = await User.findOne({ email: email });
				console.log('User exist', user);

				if (user) {
					return res
						.status(400)
						.json({ errors: [{ email: 'User already exists' }] });
				}

				//get gravatar
				const avatar = gravatar.url(email, {
					s: '200',
					r: 'pg',
					d: 'mm',
				});
				const userId=Math.floor(Math.random()*1000000);
				user =await  new User({
					name: name,
					email: email,
					password: password,
					avatar: avatar,
					publicUserId:userId,
				});
                console.log('user :',user.email);
				// encrypt/hash the password
				const salt = await bcryptjs.genSalt(10);
				user.password = await bcryptjs.hash(password, salt);

				await user.save();
				// res.json({msg:'User successfully registered'});

				
				//json web token
				
				//when user is registering I will not return the jsonwebtoken
				//I will redirect it in react app to the login UI

				const payload = {
					user: {
						id: user.id,
					},
				};

				 jsonwebtoken.sign(
					payload,
					process.env.jwtSecret,
					{ expiresIn: 360000 },
					(err, token) => {
						console.log(err);
						if (err) throw err;
						// console.log('token = ', token);
						tokenX.token=token;
						console.log('tokenX ',tokenX.token);
						// return res.json({ token: token });
						console.log('user inside :',user.email);
                        //@ second configuration object to configure email details
						// res.json({token:token});
						const transporter = nodemailer.createTransport({
                            port:465,
                            host:"smtp.gmail.com",
                            auth:{
                                user:`${process.env.BOXMail}`,
                                pass:`${process.env.BOXMailKey}`,
                            },
                            secure:true,
                        });
                        const mailData =  {
                            from:'bango.office@gmail.com',
                            to:`${user.email}`,
                            subject: 'Sending confirmation email . You have registered an account with BANGO',
                            text:'To finish the registration process please access the link bellow for confirmation',
                            html:`<h1>Click and confirm your email address registered with bango</h1><p>http://localhost:5000/api/confirmEmail/${token}</p>`,
        
                        }
                        //@ sending the mail using sendMail method
                         transporter.sendMail(mailData, function(err, info){
                            if(err) {
								console.log(err);
								res.status(401).json({email:"Email address is not real"});
							}
                            else{ console.log(info)};
                            res.status(200).send({message:"Mail Send", info:info});
                        });
					},
				);
				

			} catch (error) {
				console.log(error);
				res.status(500).send('Server error!!');
			}

		}
	}
);
router.get(['/usersList', '/usersList/:searchValue'],async (req,res,next)=>{
	const {token}=req.body;
	const {searchValue} = req.params;
	console.log('searchValue',searchValue);
	try{
		// const decoded=await jsonwebtoken.verify(token,process.env.jwtSecret);
		// // if(!decoded.user.id){
		// 	res
		// 	.status(401)
		// 	.json({erros:{param:'user',msg:'user does not exist'}});
		// };
		//@ after chekcing the token and the validity of token
		//@ we will extract data from database and return it back to UI
		//@ i cannot return the user logged
		
		let users=await User.find({},'name publicUserId activated');
		//@ return only activated users 
		if(searchValue){
			users=users.filter(
								user=> String(user.name).toLowerCase().indexOf(String(searchValue).toLowerCase(),0) === 0
								&& user.activated===true
							);
			res.json(users);
		}
		else{
			users= users.filter(user=> user.activated===true);
			res.json(users);
		}

	}
	catch(err){
		console.log(err);
	}
});
export default router;