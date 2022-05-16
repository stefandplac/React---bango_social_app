//@ action types imports....
import * as types from '../../constants/types';

//# deleteChat URl constant...
import {deleteChatURL} from '../../../constants/constants';


import axios from 'axios';

export const deleteChat=(chatId,chatToDisplay,chatsList)=>async (dispatch)=>{
    try{
        
        let user=Number(localStorage.publicUserId);
        let id=String(chatId);
        // console.log('user loggeg in :', localStorage.publicUserId);

        const response=await axios.delete(`${deleteChatURL}${id}/${user}`);
        // console.log('server response for delete chat:',response.data);
        
      
        dispatch({type:types.DELETE_CHAT,
                    chatsList:response.data.chatsList,
                    chatToDisplay:response.data.chatToDisplay,
        });
        // console.log('inside deleteChat action reesponse.data.chatsList: ',response.data.chatsList);
        // console.log('inside deleteChat action reesponse.data.chatToDisplay: ',response.data.chatToDisplay);
    }
    
    catch(err){
        dispatch({type:types.DELETE_CHAT,
                errors:err,
                chatsList:chatsList,
                chatToDisplay:chatToDisplay,
        });
        // console.log('inside DELETE CHAT action>>chatToDisplay:',chatToDisplay);
        // console.log('server response for delete chat :',err);
    }
}
   