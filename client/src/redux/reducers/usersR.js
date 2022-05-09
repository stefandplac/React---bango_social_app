import * as types from '../constants/types';

export const usersR=(state={usersList:[],errors:{}},action)=>{
    switch(action.type){
        case types.GET_USERS:
            return  {...state,
                    usersList:action.usersList,
            };
        default:
            return state;
    }

}