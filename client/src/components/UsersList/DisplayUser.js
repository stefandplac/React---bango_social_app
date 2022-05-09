import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/users.css';

//@ redxu actions...
import {writeChat} from '../../redux/actions/chats/writeChat';
import {listChats} from '../../redux/actions/chats/listChats';

 class DisplayUser extends Component {
    handleClick=async ()=>{
        this.props.returnDisplayUser();
        let author={publicUserId:localStorage.publicUserId, name:localStorage.name};
        let friend={publicUserId:this.props.user.publicUserId, name:this.props.user.name};
        let chatBody={author:author, friend:friend, chatContent:''};
        await this.props.writeChat(chatBody,{});
        await this.props.listChats(localStorage.publicUserId);
        await console.log(`new user chat list ${this.props.chatsList}`);
    }
  render() {
    return (
      <div className="userContainer" onClick={this.handleClick}>
          <div className="avatarUser">
                <svg xmlns="http://www.w3.org/2000/svg" className="" fill="none" viewBox="0 0 22 22" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
          </div>
          <div className="displayUser">
              <div> 
                {`${this.props.user.publicUserId} ${this.props.user.name}`}
              </div>
              <div>Status user</div>
           
          </div>
     </div>
    )
  }
}
const mapStateToProps=(state)=>{
  return{
      chatsList:state.chatsR.chatsList,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
        writeChat:(chatBody,c)=>{dispatch(writeChat(chatBody,c))},
        listChats:(loggedUser)=>{dispatch(listChats(loggedUser))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DisplayUser);
