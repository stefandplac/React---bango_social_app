import React, { Component } from 'react';

//@ import redux actions...
import {getUsers} from '../redux/actions/usersA';
import {listChats} from '../redux/actions/chats/listChats';
import { searchForChat } from '../redux/actions/chats/searchForChat';

import { connect } from 'react-redux';

class LeftSearchBarContainer extends Component {
  handleChange=async (event)=>{
      if(this.props.searchFor==='newUsers')  {
           
          this.props.getUsers(event.target.value);
          
      }
      else {
       
          await this.props.searchForChat(event.target.value);
          console.log('searchValue',event.target.value);
          console.log('state store search value', this.props.searchValue);
          await  this.props.listChats(localStorage.publicUserId, {searchValue:event.target.value});
      }
  }
  render() {
    return (
        <div className="mainLeftContainerSearchBar">
        <div className="mainLeftCSearchBarDiv">
            <svg xmlns="http://www.w3.org/2000/svg" className="searchIcon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input placeholder={this.props.placeHolderMsg} type="text" name="searchContact" id="searchContact" className="searchContact" onChange={this.handleChange}/>
        </div>
    </div>
    )
  }
}
const mapStateToProps=(state)=>{
  return {
      searchValue:state.chatsR.searchValue,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    getUsers:(searchValue)=>{dispatch(getUsers(searchValue))},
    listChats:(loggedUser,searchValue)=>{dispatch(listChats(loggedUser,searchValue))},
    searchForChat:(searchValue)=>{dispatch(searchForChat(searchValue))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LeftSearchBarContainer);
