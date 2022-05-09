import React, { Component } from 'react';
import { connect } from 'react-redux';
import parser from 'html-react-parser';

//@ redux actions....
import {displayChat} from '../../redux/actions/chats/displayChat';

//@ css file
import './css/displayChat.css';
import DeleteChat from './DeleteChat';

const today=new Date();
class DisplayChat extends Component {
    constructor(props){
        super(props);
        this.state={
            chatDate:new Date(),
            // new Date(this.props.chat?.chats[this.props.chat.chats.length-1].date),
            showDelete:false,
            
        }
    }
  
  handleClick=()=>{
      this.props.displayChat(this.props.chat._id);
      
  }
  handleMouseOverChat=()=>{
       this.setState({showDelete:true});
  }
  handleMouseOutChat=()=>{
        this.setState({showDelete:false});
  }
  
  render() {
      
    return (
    <div className="chatContainer" onClick={this.handleClick} onMouseOver={this.handleMouseOverChat} onMouseOut={this.handleMouseOutChat}>
        <div className="avatarUser">
              <svg xmlns="http://www.w3.org/2000/svg" className="" fill="none" viewBox="0 0 22 22" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
        </div>
        <div className="chatBox">
            <div className="displayNameDate"> 
                <div className="displayName">
                        {Number(this.props.chat.user1.publicUserId)===Number(localStorage.publicUserId)? (
                            <>
                                {this.props.chat.user2.name}
                                </>
                        )
                        :(
                                <>
                                    {this.props.chat.user1.name}
                                </>
                        )
                        
                    }
                </div>
                <div className="displayTimeOnLeft">
                    {today.getDate===this.state.chatDate.getDate ? (
                        <>
                          {this.state.chatDate.toLocaleTimeString([],{hour:'2-digit', minute:'2-digit'})}
                        </>
                    ):(
                        <>
                         {this.state.chatDate.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}
                        </>
                    )
                    
                    }
               </div>
            </div>
            <div className="">
                <div className="displayStatus">
                    {/* //display only the first 25 characters from the last message */}
                    {this.props.chat.chats[0]? (
                        <>
                            {this.props.chat.chats[0].chatType==='jpg'?(
                               <div>photo</div>
                            ): this.props.chat.chats[0].chatType==='pdf'? (
                                <div>pdf doc</div>
                            ):(
                            //    <div>{`${this.props.chat.chats[0].chatContent.slice(0,15)}.....`}</div>
                            <div className="" style={{display:"flex",alignItems:"center",width:"100%",}}>
                                <div className="displayChatLeftSide" >
                                    {parser(this.props.chat.chats[0].chatContent)}
                                
                                </div>
                               

                            </div>
                            
                            )}
                             
                        </>
                    ):(<>no messages yet</>)}
                    <div className="showDeleteBox" >
                                    {this.state.showDelete===true?(
                                       
                                            <DeleteChat chatId={this.props.chat._id}/>
                                       
                                    ):(
                                        <></>
                                    )}
                                   
                    </div>
                </div>
            </div>
         
        </div>
   </div>
    )
  }
}
const mapStateToProps=(state)=>{
    return{
       
        chatToDisplay:state.chatsR.chatToDisplay,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        displayChat:(chatId)=>{dispatch(displayChat(chatId))},
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DisplayChat);
