import React, { Component } from 'react';
import { connect } from 'react-redux';

//@ used defined components
import Chats from './Chats/Chats';
import LeftHeaderContainer from './LeftHeaderContainer';
import LeftSearchBarContainer from './LeftSearchBarContainer';

import UsersList from './UsersList/UsersList';

//@ redux actions...
import {displayChat} from '../redux/actions/chats/displayChat';


 class MainLeftSideContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      newChat:false,

    }
  }
  // componentDidMount(){
  //   let x = this.props.firstChatId;
  //   console.log('component did mount chatsList mainLeft: ',x);
  //   this.props.displayChat(x); 
  // }
  returnDisplayUser=()=>{
    this.setState({newChat:!this.state.newChat});
  }
  //@ the search will be made on the server api
  render() {
    return (
      <>
      {this.state.newChat===true ? (
        <div className="mainLeftContainer">
            <LeftHeaderContainer  title={"Start a private conversation"} returnDisplayUser={this.returnDisplayUser} newChat={this.state.newChat}/>
            <LeftSearchBarContainer searchFor={'newUsers'} placeHolderMsg={'Search for a user to start a new conversation'}/>
            <UsersList returnDisplayUser={this.returnDisplayUser}/>
        </div>
      )
      :(
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
    firstChatId:state.chatsR.firstChatId,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
      displayChat:(chatId)=>{dispatch(displayChat(chatId))},
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MainLeftSideContainer);