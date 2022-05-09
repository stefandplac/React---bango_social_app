import React, { Component } from 'react';
import MainRightContainer from '../components/MainRightContainer';
import MainLeftSideContainer from '../components/MainLeftSideContainer';
import '../css/Main.css';
import { connect } from 'react-redux';

//@redux actions.....
import {listChats} from '../redux/actions/chats/listChats';
import {getUsers} from '../redux/actions/usersA';
import {displayChat} from '../redux/actions/chats/displayChat';
import {getEmoticons} from '../redux/actions/chats/getEmoticons';

class Main extends Component {
  initialLoad=async ()=>{
    await this.props.getUsers();
    await this.props.listChats(localStorage.publicUserId);
    await this.props.getEmoticons();
    
    
  }
  componentDidMount(){
       this.initialLoad();
      // this.props.getUsers();
      // this.props.listChats(localStorage.publicUserId);
      
   
  }
  render() {
    return (
      <div className="mainContainer mainContainerShadow">
        {/* <div className="mainContainerBox mainContainerShadow"> */}
            <MainLeftSideContainer />
            <MainRightContainer />
         {/* </div> */}
      </div>
    )
  }
}
const mapStateToProps=(state)=>{
  return{
    chatsList:state.chatsR.chatsList,
    chatToDisplay:state.chatsR.chatToDisplay,
    firstChatId:state.chatsR.firstChatId,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
   
    getUsers:()=>{dispatch(getUsers())},
    listChats:(userX)=>{dispatch(listChats(userX))},
    displayChat:(chatId)=>{dispatch(displayChat(chatId))},
    getEmoticons:()=>{dispatch(getEmoticons())},
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);
