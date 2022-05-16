import * as types from '../../constants/types';

export const updateScreen=(showProfile)=>(dispatch)=>{

    dispatch({type:types.UPDATE_SCREEN,
             showProfile:showProfile,
    });
}