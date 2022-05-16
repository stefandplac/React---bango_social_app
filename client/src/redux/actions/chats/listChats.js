import axios from 'axios';
import * as types from '../../constants/types';

//@ import constants urls
import { listChatsURL } from '../../../constants/constants';
import { listChatsURL2 } from '../../../constants/constants';

export const listChats=(userX, ...otherInfo)=>async (dispatch)=>{
    console.log('userX',userX);
    console.log('lisrtChats>> chatsListLength : ', otherInfo);
    console.log('listChats>> searchValue:',otherInfo[0]?.searchValue);
    try{
        if(otherInfo.length>0&&otherInfo[0].searchValue){
            //@ in case we use the search bar, the searched value will be passed in otherInfo array
            //@ and we need to pass that value as parameter into the link
            const response=await axios.get(`${listChatsURL}${Number(userX)}/${otherInfo[0].searchValue}`);
                console.log('inside listChats action searchValue :',response.data);
                dispatch({
                    type:types.LIST_CHATS,
                    chatsList:response.data,
                    errors:{},
                });
        }
        else if (otherInfo.length>0&&otherInfo[0].x){
                const response=await axios.get(`${listChatsURL2}${Number(userX)}/${otherInfo[0].x}`);
                console.log('inside listChats action with otherInfo :',response.data);
               
               if(response.data.ok===true){
                   console.log('@@@ we do not update anymore the chatsList @@@');
               }
               else{
                   console.log('we update the chatsList ### we dispatch the listChats action ### ');
                    dispatch({
                        type:types.LIST_CHATS,
                        chatsList:response.data,
                        errors:{},
                    });
               }
                
        }
        else {

                const response=await axios.get(`${listChatsURL}${Number(userX)}`);
                console.log('inside listChats action without otherInfo :',response.data);
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