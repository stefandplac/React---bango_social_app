import React, { Component } from 'react';
import { connect } from 'react-redux';
import parser from 'html-react-parser';

//@ redux actions....
import {displayChat} from '../../redux/actions/chats/displayChat';

//@ import constants 
import {avatarURL} from '../../constants/constants';

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
            friendAvatar:'',
            
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
  returnAvatar=()=>{
     let x;
     if(Number(this.props.chat.user1.publicUserId)===Number(localStorage.publicUserId)){
        x= this.props.usersList.filter(user=>Number(user.publicUserId)===Number(this.props.chat.user2.publicUserId));
     }
     else{
        x= this.props.usersList.filter(user=>Number(user.publicUserId)===Number(this.props.chat.user1.publicUserId));
     }
     return x[0].avatar;
     
  }
  componentDidMount(){
      this.setState({friendAvatar:this.returnAvatar()});
  }

  
  render() {
      
    return (
    <div className="chatContainer" onClick={this.handleClick} onMouseOver={this.handleMouseOverChat} onMouseOut={this.handleMouseOutChat}>
        <div className="avatarUser">
                <img className="avatarImgBox" src={`${avatarURL}${this.state.friendAvatar}`} alt=""/>
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
                    ):(<div className="displayNoStatus">no messages yet</div>)}
                    <div className="showDeleteBox" >
                                    {this.state.showDelete===true?(
                                       <>
                                            {/* <DeleteChat chatId={this.props.chat._id}/> */}
                                            </>
                                       
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
        userProfile:state.loginR.userProfile,
        usersList:state.usersR.usersList,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        displayChat:(chatId)=>{dispatch(displayChat(chatId))},
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(DisplayChat);
