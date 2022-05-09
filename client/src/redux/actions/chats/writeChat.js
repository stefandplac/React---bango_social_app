import axios from 'axios';
import * as types from '../../constants/types';

//@ import constants...
import {writeChatURL} from '../../../constants/constants';

export const writeChat=(chatBody,chatToDisplay,chatsList)=> async(dispatch)=>{
        
        console.log(`chatBody inside writeChat action`, chatBody);
       
        try{
            const configHeaders={
                headers:{
                    'Content-Type':'application/json',
                }
            };
            
            const response = await axios.post(writeChatURL,
                                                chatBody,
                                                configHeaders,
            );
            console.log('response from server for posting chat',response.data);
            if(response.data._id===chatBody.id){
                console.log(`inside writechat chatid`,response.data._id);
                console.lof('inside writechat response.data.chat',response.data);
                dispatch({
                    type:types.WRITE_CHAT,
                    chatToDisplay:response.data,
                    chatsList:response.data,
                    errors:{},
                })
            }
            else{
                    dispatch({
                        type:types.WRITE_CHAT,
                        serverResponse:response.data,
                        chatToDisplay:chatToDisplay,
                        chatsList:chatsList,
                        errors:{},
                    });
                }

        }
        catch(err){
            dispatch({
                type:types.WRITE_CHAT,
                serverResponse:{},
                errors:err,
            });

        }
};