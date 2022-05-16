import React, { Component } from 'react';
import { connect } from 'react-redux';
import './css/users.css';

//@ redxu actions...
import {writeChat} from '../../redux/actions/chats/writeChat';
import {listChats} from '../../redux/actions/chats/listChats';

//@ import constants 
import {avatarURL} from '../../constants/constants';

 class DisplayUser extends Component {
   
    handleClick=async ()=>{
        this.props.returnDisplayUser();
        let author={publicUserId:localStorage.publicUserId, name:localStorage.name};
        let friend={publicUserId:this.props.user.publicUserId, name:this.props.user.name};
        let chatBody={author:author, friend:friend, chatContent:'', user:localStorage.publicUserId};
        await this.props.writeChat(chatBody,{},this.props.chatsList);
        await this.props.listChats(localStorage.publicUserId);
        await console.log(`new user chat list ${this.props.chatsList}`);
    }
  render() {
    return (
      <div className="userContainer" onClick={this.handleClick}>
          <div className="avatarUser">
                <img className="avatarImgBox" src={`${avatarURL}${this.props.user.avatar}`} alt=""/>
          </div>
          <div className="displayUser">
              <div className="displayUserName" style={{}}> 
                {`${this.props.user.name}`}
              </div>
              {this.props.user.status!==''?(
                  <div className="displayUserStatus">
                      {this.props.user.status}
                  </div>
              ):(
                  <div className="displayUserStatus displayUserNoStatus">
                      no status yet...
                  </div>
              )}
              
           
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
