import * as types from '../../constants/types';
import axios from 'axios';

//@import constants urls
import { displayChatURL } from '../../../constants/constants';

export const displayChat=(chatId,chatLength)=>async(dispatch)=>{
    try{
        let userId =localStorage.publicUserId;
        console.log('chatLenght:',chatLength);
        let response;
        if(chatLength){
             response = await axios.get(`${displayChatURL}${chatId}/${userId}/${chatLength}`);
        }
        else{
             response = await axios.get(`${displayChatURL}${chatId}/${userId}`);
        }
        if(response.data.ok===true){
            // console.log('we will not dispatch the action display chat. the content is updated');
        }
        else{
            // console.log('#### we will dispatch the action displayChat. the content needs to be updated ####');
                    dispatch({
                        type:types.DISPLAY_CHAT,
                        chatToDisplay:response.data,
                        errors:{},
                    });

        }
        
        // console.log(response.data);
       

    }
    catch(err){
        dispatch({
            type:types.DISPLAY_CHAT,
            errors:err,
            chatToDisplay:{},
        })
    }
};