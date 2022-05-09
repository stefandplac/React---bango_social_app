import * as types from '../constants/types';
import axios from 'axios';


export const loginA=(loginData)=>async (dispatch)=>{
    //@ we will take the login credentials and  post them with axios.post to the endpoint on the our server
    //@ the credential will be passed as an object to this function
    const configHeaders={
        headers:{
                 'Content-type':'application/json', 
        }
    };
    const requestBody=JSON.stringify(loginData);
    
    let data={};

    try{
            await axios.post('http://localhost:5000/api/auth',
                                requestBody, 
                                configHeaders
            )
            .then( (response)=> {
                data= response.data;
                console.log(data);
                                
            });
            localStorage.setItem('token',data.token);
            localStorage.setItem('publicUserId',data.publicUserId);
            localStorage.setItem('name',data.name);
            //@ now if everything credential are good we will put them in state in store
            dispatch({
                        type:types.LOGIN,
                        loginResponseData:data,
                        isAuthenticated:true,
                        errorData:{},
                        publicUserId:data.publicUserId,
                        
                       
            });
            
          
    } catch(err){
            const errors = err.response.data.errors;
            let xError={};
         
            if(errors[0].param){
                        xError={[errors[0].param]:errors[0].msg};
            } else {
                        if(errors[0].email){ xError={email:errors[0].email};}
                        else{ xError={password:errors[0].password};};
            
            }
            //@ if credentials aren't ok we will put the returned errors from the server in state to be display in UI
            dispatch({
                        type:types.LOGIN,
                        isAuthenticated:false,
                        errorData: xError,
                        loginResponseData:{},
                        // publicUserId:'',
            });
         
           
    }

};

//@ we define this action to delete the errors object from store state 
//@ and allow this way the errors message displayed to user in login form to dissapear
//@ when user modifies the login credentials
export const deleteLoginErrors=()=>(dispatch)=>{
    dispatch({
        type:types.DELETE_LOGIN_ERRORS,
        errorData:{},
    });
};

//@ This action will be called in App.js and will check in localStorage for jsonwebtoken if it is stored there
//@ in case jwtoken exists in localstore we will dispatch this action and take the token and copy into store state
//@ and also we set the isAuthenticated from store state to true
//@ we avoid this way displaying anymore login/register form to an existing logged in user
export const loadUser=()=>(dispatch)=>{
    
    if(localStorage.token){
        dispatch({
            type:types.LOAD_USER,
            isAuthenticated:true,
            loginResponseData: {token:localStorage.token,
                                publicUserId:localStorage.publicUserId},
            publicUserId: localStorage.publicUserId,
        
        });
    }
};

//@ this logOut action will remove the token from the localStorage and also from store state
//@ and will set isAuthenticated back to false -- this will change the routes in the APP.JS
//@ will force the user to have access only to logIn Register UI
//@ and the access to unauthorized resources like seeing posts and so on will be restricted
export const logOut=()=>(dispatch)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('publicUserId');
    localStorage.removeItem('name');
    console.log(`localstorage.publicUserId`,localStorage.publicUserId);
        dispatch({
            type:types.LOG_OUT,
            isAuthenticated:false,
            publicUserId:"", 
            chatToDisplay:{},  
        });
};

//@ the recoverPassword action will send the email on the server and the server will send a link with the token 
//@ to that email address. When user will access the link received in the email he will put the new password that
//@ will be modifiec on the database
export const recoverPassword=(dataRecovery,urlServer)=>async (dispatch)=>{
    //@ this action will be used for 2 purposes
    //@ 1. to send the email to the server for recovering the passsword and retrieve the response : success or error | RecoverP component
    //@ 2. to set the new password for the account and retrieve the response from the server:success or error | ResetP component
    const configHeaders={
        headers:{
                 'Content-type':'application/json', 
        }
    };
    const requestBody=JSON.stringify(dataRecovery);
    console.log(requestBody);
    
    let data={};
    let xAuth=false;
    
    try{
            await axios.post(urlServer,
                            requestBody, 
                            configHeaders
            )
            .then( (response)=> {
                data= response.data;
                console.log(data);
                                
            });
            //@ now if everything credential are good we will put them in state in store
            dispatch({
                        type:types.RECOVERY_PASSWORD,
                        recoveryPasswordData:data,
                        errorData:{},
                        actionFinished:true,
                        
            });
          
    } catch(err){
        console.log(err.response.data);
            const errors = err.response.data.errors;
            let xError={};
            let xAction=false;
            if(errors[0].param){
                        xError={[errors[0].param]:errors[0].msg};
                        //@ this error can appear in ResetP -component
                        //@ if the error is related to token we will set auth=true
                        //@ to render a screen for unauthorized users and redirect
                        if(xError.token){
                            console.log('error ',xError.token);
                            xAuth=true;
                        };
                        //@ the bellow error can appear in RecoverP -component
                        //@ if the error is returned because the user doesn't exist
                        //@ we will not display this information to Ui for security reason
                        //@ and we will redirect the client to sign-in screen
                        if(xError.user){
                            xAction=true;
                        }
            } 
            //@ if the email is not in email format we will put the returned errors from the server in state to be display in UI
            dispatch({
                        type:types.RECOVERY_PASSWORD,
                        errorData: xError,
                        recoveryPasswordData:{},
                        actionFinished:xAction,
                        auth:xAuth,
            });
         
           
    }

};


//@ reset store state values when redirecting to signin
//@ the store state values like auth, actionFinished needs to be reinitialized 
//@ otherqise the RegistrationOk component will load each time we try to access
//@ recover-password section or other section
export const resetStoreState=()=>(dispatch)=>{
    dispatch({type:types.RESET_STORE_STATE,
             
    });
}