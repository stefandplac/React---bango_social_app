import React, { Component } from 'react';
import {connect} from 'react-redux';

//@ css file
import './css/chats.css';

//@ user defined components
import DisplayChat from './DisplayChat';

class Chats extends Component {

  render() {
    return (
      <div className='chatsListContainer'>
            {this.props.chatsList.map((chat, index)=>(
                <DisplayChat key={index} chat={chat}/>
            ))}
            

      </div>
    )
  }
}
const mapStateToProps=(state)=>{
    return{
        chatsList:state.chatsR.chatsList,
    }
}
export default connect(mapStateToProps)(Chats);
