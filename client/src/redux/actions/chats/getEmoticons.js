import * as types from '../../constants/types';
import axios from 'axios';

export const getEmoticons=()=>async(dispatch)=>{
    try{
        const response =await axios.get('http://localhost:5000/api/emoticons');
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