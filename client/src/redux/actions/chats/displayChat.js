import * as types from '../../constants/types';
import axios from 'axios';

export const displayChat=(chatId)=>async(dispatch)=>{
    try{
        let userId =localStorage.publicUserId;
        const response = await axios.get(`http://localhost:5000/api/chats/getChat/${chatId}/${userId}`);
        console.log(response.data);
        dispatch({
            type:types.DISPLAY_CHAT,
            chatToDisplay:response.data,
            errors:{},
        });

    }
    catch(err){
        dispatch({
            type:types.DISPLAY_CHAT,
            errors:err,
            chatToDisplay:{},
        })
    }
};