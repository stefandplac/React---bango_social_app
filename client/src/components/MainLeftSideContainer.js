import React, { Component } from 'react';
import { connect } from 'react-redux';

//@ used defined components
import Chats from './Chats/Chats';
import LeftHeaderContainer from './LeftHeaderContainer';
import LeftSearchBarContainer from './LeftSearchBarContainer';
import ProfileHeader from './Profile/ProfileHeader';
import ProfileBody from './Profile/ProfileBody';


import UsersList from './UsersList/UsersList';

//@ redux actions...
// import {displayChat} from '../redux/actions/chats/displayChat';
import {listChats} from '../redux/actions/chats/listChats';

 class MainLeftSideContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      newChat:'showChats',

    }
  }
  componentDidUpdate(){
    // console.log('MainLeftSideContainer ####### componentDiDUpdate Call #######');
    //   this.props.listChats(localStorage.publicUserId);
  }
  returnDisplayUser=(x)=>{
    this.setState({newChat:x});
  }
  //@ the search will be made on the server api
  render() {
    return (
      <>
      {this.state.newChat==='showUsers' ? (
        <div className="mainLeftContainer">
            <LeftHeaderContainer  title={"Start a private conversation"} returnDisplayUser={this.returnDisplayUser} newChat={this.state.newChat}/>
            <LeftSearchBarContainer searchFor={'newUsers'} placeHolderMsg={'Search for a user to start a new conversation'}/>
            <UsersList returnDisplayUser={this.returnDisplayUser}/>
        </div>
      )
      : this.state.newChat==='showProfile'?(
            <div className="mainLeftContainer">
               <ProfileHeader returnDisplayUser={this.returnDisplayUser}/> 
               <ProfileBody />  
            </div>
      ):(
        <div className="mainLeftContainer">
            <LeftHeaderContainer returnDisplayUser={this.returnDisplayUser}/>
            <LeftSearchBarContainer searchFor={'chats'} placeHolderMsg={'Search for a conversation or start a new one'}/>
            <Chats/>
        </div>
      )
      }</>
    )
  }
}

const mapStateToProps=(state)=>{
  return{
    chatsList:state.chatsR.chatsList,
    chatToDisplay:state.chatsR.chatToDisplay,
   
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
      // displayChat:(chatId)=>{dispatch(displayChat(chatId))},
      listChats:(userLogged)=>{dispatch(listChats(userLogged))},
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MainLeftSideContainer);