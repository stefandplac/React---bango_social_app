//@ action types imports....
import * as types from '../../constants/types';

//# deleteChat URl constant...
import {deleteChatURL} from '../../../constants/constants';


import axios from 'axios';

export const deleteChat=(chatId,chatsList)=>async (dispatch)=>{
    try{
        
        let user=localStorage.publicUserId;
        console.log('user loggeg in :', localStorage.publicUserId);
        const response=await axios.delete(`${deleteChatURL}${chatId}/${user}`);
        console.log('server response for delete chat:',response.data);
        dispatch({type:types.DELETE_CHAT,   
            errors:{},  
            chatsList:response.data,       
        });
    }
    
    catch(err){
        dispatch({type:types.DELETE_CHAT,
                errors:err,
                chatsList:chatsList,
        });
        console.log('server response for delete chat :',err);
    }
}
   