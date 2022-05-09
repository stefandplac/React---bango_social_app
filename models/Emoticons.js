import mongoose from 'mongoose';

const emoticonSchema = mongoose.Schema({
    emoticon:[]
});
export default mongoose.model('Emoticons',emoticonSchema);