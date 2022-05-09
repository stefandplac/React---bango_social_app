import * as types from '../../constants/types';

export const searchForChat=(searchValue)=>(dispatch)=>{
    dispatch({
        type:types.SEARCH_FOR_CHAT,
        searchValue:searchValue,
    });
}