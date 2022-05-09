import axios from 'axios';
import * as types from '../../constants/types';

//@ import constants...
import {listChatsURL} from '../../../constants/constants';

export const listChats=(userX,...otherInfo)=>async (dispatch)=>{
    console.log('userX',userX);
    try{
        if(otherInfo.length>0){
            //@ in case we use the search bar, the searched value will be passed in otherInfo array
            //@ and we need to pass that value as parameter into the link
            const response=await axios.get(`${listChatsURL}/${Number(userX)}/${otherInfo[0]}`);
                console.log(response.data);
                dispatch({
                    type:types.LIST_CHATS,
                    chatsList:response.data,
                    errors:{},
                });
        }
        else {

                const response=await axios.get(`${listChatsURL}/${Number(userX)}`);
                console.log(response.data);
                dispatch({
                    type:types.LIST_CHATS,
                    chatsList:response.data,
                    errors:{},
                });
            }

    }
    catch(err){
        dispatch({
            type:types.LIST_CHATS,
            errors:err,
            chatList:[],
        });
    }
    
}