import axios from 'axios';

import * as types from '../constants/types';


export const registerUser=(userData)=>async (dispatch)=>{
    const configHeaders = {
        headers:{
            'Content-type':'application/json',
        }
    };
    const requestBody=JSON.stringify(userData);
    let data={};
    try{
                await axios.post('http://localhost:5000/api/users',
                requestBody,
                configHeaders,
                )
                .then(response=> {
                    console.log(response.data);
                    data=response.data;
                });
                //@ if email ,password, name are passing the checks from the server side the registration is successfull
                //
                dispatch({
                    type:types.REGISTRATION_SUCCESSFULL,
                    isUserRegistered:true,

                });
                await axios.post('http://localhost:5000/api/confirmationEmail',
                             {email:userData.email},
                             configHeaders,   
                ).then(response=>{
                    console.log(response.data);
                });
    }
    catch(err){
            const errors=err.response.data.errors;
            let xError={};
         
            if(errors[0].param){
                        xError={[errors[0].param]:errors[0].msg};
            } else {
                        if(errors[0].email){ xError={email:errors[0].email};}
                        else{ xError={password:errors[0].password};};
            
            }
            //@ if registration credentials aren't ok we will put the returned errors from the server in state to be display in UI
            dispatch({
                type: types.FAILED_REGISTRATION,
                isUserRegistered:false,
                registrationErrors:xError,
            });

    }
};

//@ we define this action to delete the errors object from store state 
//@ and allow this way the errors message displayed to user in login form to dissapear
//@ when user modifies the login credentials
export const deleteRegistrationErrors=()=>(dispatch)=>{
    dispatch({
        type:types.DELETE_REGISTRATION_ERRORS,
        errorData:{},
    });
};

//@ the bellow action will delete all the state store data for registerA reducer
//@ this action will be used in RegistrationOK component after successfully registration is displayed to user
//@ this action is needed because we use conditional rendering depending on the value isUserRegistered stored in 
//@ store state for registrationR reducer, and we use that for displaying 5-7 seconds a component for successfully registration
export const deleteRegistrationState=()=>(dispatch)=>{
    dispatch({
        type:types.DELETE_REGISTRATION_STATE_DATA,
        isUserRegistered:false,
    });
}