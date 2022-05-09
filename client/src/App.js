import {Routes, Route, Navigate} from 'react-router-dom';
import React, {Component} from 'react';
import { connect } from 'react-redux';

//@ redux actions imports....
import { loadUser } from './redux/actions/loginA';
import {getUsers} from './redux/actions/usersA';
import {listChats} from './redux/actions/chats/listChats';

//@ components imports -user defined
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UserPage from './pages/UserPage';
import Main from './pages/Main';
import RecoverP from './pages/RecoverP';
import ResetP from './pages/ResetP';



class App extends Component{

  // @ if authenticated SignIn and SignUp routes will be dezactivated and will redirect to Main
  // @ if not authenticated Main , Profile routes will be dezactivated and will redirect to LoginSignUp  

  componentDidMount(){
     this.props.loadUser();
     
     
  }
  componentContruct=(x)=>{
    return <ResetP {...x}/>
  }
  render(){
    
  return (
   <>
    {!this.props.isAuthenticated ? (
     <Routes>
       <Route path='/*' element={<Navigate to="/sign-in"/>} />
        <Route path='/sign-up' element={<SignUp />}/>
        <Route path="/sign-in" element={<SignIn />}/>
        <Route path="/recover-password" element={<RecoverP />}/>
        <Route path="/resetpass/:tk"   element={<ResetP   />} />
     </Routes>
    ):(
      <Routes>
        <Route path='/*' element={<Navigate to="/main"/>} />
        <Route path="/user" element={<UserPage />}/>
        <Route path='/main' element={<Main />} />
      </Routes>
    )}
    </>
  );
}
}
const mapStateToProps=(state)=>{
  return {
    isAuthenticated:state.loginR.isAuthenticated,
    chatsList:state.chatsR.chatsList,
    usersList:state.usersR.usersList,
    loginResponseData:state.loginR.loginResponseData,
    publicUserId:state.loginR.publicUserId,
    
    
  }
};
const mapDispatchToProps=(dispatch)=>{
  return {
    loadUser:()=>{dispatch(loadUser())},
    getUsers:()=>{dispatch(getUsers())},
    listChats:(userX)=>{dispatch(listChats(userX))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

