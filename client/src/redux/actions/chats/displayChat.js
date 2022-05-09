import * as types from '../../constants/types';
import axios from 'axios';

//@ import constants...
import {displayChatURL} from '../../../constants/constants';

export const displayChat=(chatId)=>async(dispatch)=>{
    try{
        let userId =localStorage.publicUserId;
        const response = await axios.get(`${displayChatURL}/${chatId}/${userId}`);
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