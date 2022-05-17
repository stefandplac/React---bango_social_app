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
import {loadUserProfile} from '../redux/actions/loadUserProfile';
import {getAvatars} from '../redux/actions/getAvatars';

class Main extends Component {
  q=()=>{
    let x = this.props.chatsList.length;    
    let interval = setInterval(async() => {
                          
                          if(localStorage.publicUserId){
                              if(this.props.searchValue===''){
                                     await this.props.displayChat(this.props.chatToDisplay._id, this.props.chatToDisplay.chats.length);
                                     console.log('#### RightChatContainer inn MAIN ### timeInterval ### chatToDisplay:',this.props.chatToDisplay);
                                            
                                     console.log('this.props.chatsList.length: >>main>>:',x);
                                      // console.log('this.props.searchValue >>main>> :',this.props.searchValue);
                                      if(x>0){
                                            
                                            await this.props.listChats(localStorage.publicUserId, {x:x} );
                                      }
                                      else{
                                           await   this.props.listChats(localStorage.publicUserId);
                                      }
                                      console.log('#### MAIN ### timeInterval ### chatToDisplay:',this.props.chatToDisplay);
                              }
                                   
                              clearInterval(interval);
                                this.q();
                          }
                          else{
                            clearInterval(interval);
                            return;
                          }
                        }, 7000);
    
};

  initialLoad=async ()=>{
    await this.props.getUsers();
    await this.props.listChats(localStorage.publicUserId);
    
    await this.props.getEmoticons();
    await this.props.getAvatars();
    
    await this.props.loadUserProfile(localStorage.publicUserId);
    
    
    
  }

  componentDidMount(){
       this.initialLoad();
       //@ for automatically update chatList
      this.q();
     
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
    searchValue:state.chatsR.searchValue,
    avatars:state.loginR.avatars,
  
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
   
    getUsers:()=>{dispatch(getUsers())},
    listChats:(userX)=>{dispatch(listChats(userX))},
    displayChat:(chatId)=>{dispatch(displayChat(chatId))},
    getEmoticons:()=>{dispatch(getEmoticons())},
    loadUserProfile:(publicUserId)=>{dispatch(loadUserProfile(publicUserId))},
    getAvatars:()=>{dispatch(getAvatars())},
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);
