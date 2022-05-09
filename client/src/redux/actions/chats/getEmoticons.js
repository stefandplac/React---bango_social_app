import * as types from '../../constants/types';
import axios from 'axios';

//@ import constants...
import {getEmoticonsURL} from '../../../constants/constants';

export const getEmoticons=()=>async(dispatch)=>{
    try{
        const response =await axios.get(getEmoticonsURL);
        console.log('axios emoticons:', response.data);
        dispatch({
            type:types.GET_EMOTICONS,
            emoticons:response.data,
            errors:{},
        });
    }
    catch(err){
        dispatch({
            type:types.GET_EMOTICONS,
            errors:err,
            emoticons:[],
        });
    }
   
}