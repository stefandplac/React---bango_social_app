import * as types from '../constants/types';
import axios from 'axios';

export const getUsers=(...otherInfo)=>async(dispatch)=>{
    let response=[];
    console.log(otherInfo[0]);
    try{
        if(otherInfo.length>0){
            //@ in case we use the search bar, the searched value will be passed in otherInfo array
            //@ and we need to pass that value as parameter into the link
            response = await axios.get(`http://localhost:5000/api/users/usersList/${otherInfo[0]}`);
            console.log(response.data);
            dispatch({
                type:types.GET_USERS,
                usersList:response.data,
            })
        }
        else {
                 response = await axios.get('http://localhost:5000/api/users/usersList');
                console.log(response.data);
                dispatch({
                    type:types.GET_USERS,
                    usersList:response.data,
                });
            }
    }
    catch(err){
        dispatch({
            type:types.GET_USERS,
            errors:err.message,
        })
    }
}