import * as types from '../constants/types';

export const loginR = (state={
                                isAuthenticated:false, 
                                loginResponseData:{}, 
                                auth:false, 
                                recoveryPasswordData:{}, 
                                errors:{}, 
                                actionFinished:false,
                                publicUserId:'',
                                
                            }
                        , action)=>{
    switch(action.type){
        case types.LOGIN :
            
            return {...state, 
                    isAuthenticated : action.isAuthenticated,
                    loginResponseData:action.loginResponseData,
                    errors:action.errorData,
                    publicUserId:action.publicUserId,
                };
        case types.DELETE_LOGIN_ERRORS:
            return {...state, errors:action.errorData};
        case types.LOAD_USER:
            return {...state, 
                    isAuthenticated:action.isAuthenticated,
                    loginResponseData:action.loginResponseData,
                    publicUserId:action.publicUserId,
                    errors:{},
            };
        case types.LOG_OUT:
            
            return {...state,
                    isAuthenticated:action.isAuthenticated,
                    loginResponseData:{},
                    errors:{},
                    publicUserId:action.publicUserId,
            };
        case types.RECOVERY_PASSWORD:
            return {...state,
                    errors:action.errorData,
                    recoveryPasswordData:action.recoveryPasswordData,
                    actionFinished:action.actionFinished,
                    auth:action.auth,
            }
        case types.RESET_STORE_STATE:
            return{...state,
                    auth:false,
                    actionFinished:false,
            };
        default:
            return state;
    }
};