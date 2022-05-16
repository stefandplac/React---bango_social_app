import mongoose from 'mongoose';

const avatarSchema = mongoose.Schema({
    avatar:[]
});

export default mongoose.model('Avatars',avatarSchema);