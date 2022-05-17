import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import authRouter from './api/auth.js';
import postsRouter from './api/posts.js';
import usersRouter from './api/users.js';
import passwordReset from './api/passwordReset.js';
import changePassword from './api/changePassword.js';
import chats from './api/chats.js';
import fileInput from './api/fileUpload.js';
import returnEmoticons from './api/returnEmoticons.js';
import deleteChat from './api/deleteChat.js';
import loadUserProfile from './api/loadUserProfile.js';
import getAvatars from './api/getAvatars.js';
import updateProfile from './api/updateProfile.js';

import confirmEmail from './api/confirmEmail.js';

import 'dotenv/config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';


const app = express();
app.use(cors());
// app.use(function(req, res, next) {
// 	res.header("Access-Control-Allow-Origin", "*");
// 	res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	next();
//   });

app.use(fileUpload({
	createParentPath:true,
	safeFileNames:true,
	preserveExtension:true,
	limits: {
        fileSize: 1024*20480 // 
    },
    abortOnLimit: true,

}))
// app.use(cors());
app.use(bodyParser.json());
//avoid cors error 
// app.use((req, res, next) => {
//     res.append('Access-Control-Allow-Origin', ['*']);
//     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.append('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });

// routes
// app.get('/', (req, res) => res.send('Hello Social3 Server!'));
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);

//@ email confirmation routes post

app.use('/api/confirmEmail',confirmEmail);

//@ password reseting
app.use('/api/reset-password',passwordReset);
app.use('/api/change-password', changePassword);

//@ delete chat by chatId
app.use('/api/deleteChat', deleteChat);

//@ chats routes
app.use('/api/chats', chats);

//@ fileUpload
app.use('/api/fileUpload',fileInput);

app.use('/photo/',express.static('uploads'));
app.use('/emoticons',express.static('public/emoticons'))
app.use('/avatar',express.static('public/avatar'));

//@ emoticons return
app.use('/api/emoticons',returnEmoticons);

//@load user profile
app.use('/api/loadUserProfile',loadUserProfile);

//@ avatars return
app.use('/api/getAvatars',getAvatars);

//@ update profile
app.use('/api/updateProfile',updateProfile);




//@ app.js configuration for production environment
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
	// npm run build for react app
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		req.sendFile(path.resolve(__dirname, 'build', 'index.html'));
	});
}
// Connect to DataBase
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('MongoDB connected!!');
	} catch (err) {
		console.log('Failed to connect to MongoDB', err);
	}
};
connectDB();


// start the server - listen on port 3000
app.listen(process.env.PORT || 5000);