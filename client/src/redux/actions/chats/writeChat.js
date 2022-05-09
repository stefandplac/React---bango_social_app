import axios from 'axios';
import * as types from '../../constants/types';

export const writeChat=(chatBody,chatToDisplay)=> async(dispatch)=>{
        
        console.log(`chatBody inside writeChat action`, chatBody);
       
        try{
            const configHeaders={
                headers:{
                    'Content-Type':'application/json',
                }
            };
            
            const response = await axios.post('http://localhost:5000/api/chats',
                                                chatBody,
                                                configHeaders,
            );
            console.log('response from server for posting chat',response.data);
            if(response.data._id===chatBody.id){
                console.log(`inside writechat chatid`,response.data._id);
                dispatch({
                    type:types.WRITE_CHAT,
                    chatToDisplay:response.data,
                    errors:{},
                })
            }
            else{
                    dispatch({
                        type:types.WRITE_CHAT,
                        serverResponse:response.data,
                        chatToDisplay:chatToDisplay,
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