import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	activated: {
		type:Boolean,
		required:true,
		default:false,
	},
	recoveryTK:{
		type:String,
		// required:true,
		// default:'',
	},
	publicUserId:{
		type:Number,
		required:true,
		
	},
	status:{
		type:String,
		default:'',
	},
	profile:{
		phoneNumber:{
			type:String,
			default:'',
		},
		city:{
			type:String,
			default:'',
		},
		country:{
			type:String,
			default:'',
		}
	}
	
});

export default mongoose.model('User', userSchema);