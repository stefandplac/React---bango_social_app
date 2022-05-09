router.get('/usersList',async (req,res,next)=>{
		const {token}=req.body;
		try{
			// const decoded=await jsonwebtoken.verify(token,process.env.jwtSecret);
			// // if(!decoded.user.id){
			// 	res
			// 	.status(401)
			// 	.json({erros:{param:'user',msg:'user does not exist'}});
			// };
			//@ after chekcing the token and the validity of token
			//@ we will extract data from database and return it back to UI
			const users=await User.find({},'name publicUserId');
			res.json(users);

		}
		catch(err){
			console.log(err);
		}
});