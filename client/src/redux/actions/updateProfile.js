import * as types from '../constants/types';
import axios from 'axios';
//@ import constants URL
import {updateProfileURL} from '../../constants/constants';

//## this action will be dispatch to loginR reducer
export const updateProfile=(profileBody,userProfile)=>async(dispatch)=>{
    try{
        const configHeaders={
            headers:{
                "Content-type":"application/json",
            }
       }
       const requestBody=JSON.stringify(profileBody);
        let response = await axios.put(updateProfileURL,
                                        requestBody,
                                        configHeaders,
                        );
        dispatch({
            type:types.UPDATE_PROFILE,
            userProfile:response.data,
            errors:{},
        });
    }
    catch(err){
        dispatch({
            type:types.UPDATE_PROFILE,
            userProfile:userProfile,
            errors:err,
        })

    }
}