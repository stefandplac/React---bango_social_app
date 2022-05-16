import {compose, combineReducers, createStore, applyMiddleware} from 'redux';
import  thunk from 'redux-thunk';

//@ here we import the reducers from reducers folder
import {loginR} from '../reducers/loginR';
import {registrationR} from '../reducers/registrationR';
import {usersR} from '../reducers/usersR';
import {chatsR} from '../reducers/chatsR';

//@here we create the preloadedState or initialState
const initialState = {
    loginR:{
        isAuthenticated:false,
        loginResponseData:{},
        recoveryPasswordData:{},
        errors:{},
        passwordChanged:false,
        auth:false,
        emailSent:false,
        publicUserId:'',
        userProfile:{},
        avatars:[],
       
    },
    registrationR:{
        isUserRegistered:false,
        registrationErrors:{},
    },
    usersR:{
        usersList:[],
        errors:{},
    },
    chatsR:{
        chatsList:[],
        errors:{},
        chatToDisplay:{},
        serverResponse:{},
        searchValue:'',
        emoticons:[],
        showProfile:false,
        
    }
};
const rootReduceres=combineReducers({
    loginR,
    registrationR,
    usersR,
    chatsR,
});
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSIONS_COMPOSE__ || compose;
const store=createStore(rootReduceres, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;
