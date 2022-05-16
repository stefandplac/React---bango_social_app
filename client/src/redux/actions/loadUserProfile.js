import * as types from '../constants/types';
import axios from 'axios';

//@ import constants URL
import {loadUserProfileURL} from '../../constants/constants';

//## this action will be dispatched to loginR reducer
export const loadUserProfile=(userId)=>async (dispatch)=>{
    try{
       let response=await axios.get(`${loadUserProfileURL}${userId}`);
       dispatch({
           type:types.LOAD_USER_PROFILE,
           userProfile:response.data,
           errors:{},
       })
       console.log('inside loadUserProfile action:',response.data);
    }
    catch(err){
        dispatch({
            type:types.LOAD_USER_PROFILE,
            userProfile:{},
            errors:err,
        })
    }
}