import * as types from '../constants/types';
import {getAvatarsURL} from '../../constants/constants';
import axios from 'axios';


//## this action will be dispatched to loginR reducer
export const getAvatars=()=>async (dispatch)=>{
    try{

        let response = await axios.get(getAvatarsURL);
        console.log('inside getAvatars action >>:', response.data);
        dispatch({
            type:types.GET_AVATARS,
            avatars:response.data,
            errors:{},
        })
    }
    catch(err){
        dispatch({
            type:types.GET_AVATARS,
            avatars:{},
            errors:err,
        })

    }
}