import * as types from '../constants/types';

export const registrationR=(state={isUserRegistered:false, registrationErrors:{}}, action)=>{
    switch(action.type){
        case types.REGISTRATION_SUCCESSFULL:
            return {...state, 
                    isUserRegistered: action.isUserRegistered,
                    registrationErrors:{},
            };
        case types.FAILED_REGISTRATION:
            return {...state,
                   isUserRegistered: action.isUserRegistered,
                   registrationErrors:action.registrationErrors, 
            };

        case types.DELETE_REGISTRATION_ERRORS:
            return {...state,
                    registrationErrors:action.errorData,
            }
        case types.DELETE_REGISTRATION_STATE_DATA:
            return {...state,
                    isUserRegistered:action.isUserRegistered,
            }
        default:
            return state;
    }
};