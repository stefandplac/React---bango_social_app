import React, { Component } from 'react'
import { connect } from 'react-redux';
import parser from 'html-react-parser';

//@ redux actions....
import {displayChat} from '../redux/actions/chats/displayChat';
import {listChats} from '../redux/actions/chats/listChats';

//@ user defined components


//@ constants imports....
import {attachURL} from '../constants/constants';
import ChatTimeBox from './Chats/ChatTimeBox';

const today=new Date();
class RightChatContainer extends Component {
 
 
   a=()=>{
         
                  let interval = setInterval(() => {
                                        // this.setState({ time: Date.now() });
                                        if(this.props.chatToDisplay._id&&localStorage.publicUserId){
                                            this.props.displayChat(this.props.chatToDisplay._id);
                                            //@ to avoid creating 2 interval objects we will use this one also for update the chats list
                                            //@ if there is a searchValue in the search box then we will not update the chatList to keep the search results
                                            if(this.props.searchvalue==='' ){ 
                                              this.props.listChats(localStorage.publicUserId, this.props.searchValue)
                                            };
                                            console.log('RightchatContainer called once more');
                                            // this.chatContainerBox.current.scrollTop=this.chatContainerBox.current.scrollHeight;
                                            clearInterval(interval);
                                            this.a();
                                        }
                                        else{
                                          clearInterval(interval);
                                          return;
                                        }
                                      }, 3000);
                  
    };
  componentDidMount() {
   
    this.a();
   
    
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
 
  render() {
   
    return (
     <div className="mainRightContainerChatContent" id="chatContainerBox" name="chatContainerBox" >
       {this.props.chatToDisplay.chats ? (
                  this.props.chatToDisplay.chats.slice(0).reverse().map((chat,index)=>(
                      <div key={index}>
                          {Number(chat.user)===Number(this.props.publicUserId) ? (
                              <div className="displayChatLine">
                                  <div className="displayFriendMsg">
                                    
                                    </div>
                                  <div className="displayUserMsg">
                                    {chat.chatType==='jpg'||chat.chatType==='jpeg'?(
                                      <>
                                        <div className="displayPhotoBox">
                                           <a href={`${attachURL}${chat.chatContent}`} target="_blank" download={chat.chatContent}>
                                                <img className="displayPhotoChat" src={`${attachURL}${chat.chatContent}`} alt=""/>
                                            </a>
                                            <div className="imageBand">
                                              <ChatTimeBox chat={chat} displaySeenIcon={true}/>
                                            </div>
                                        </div>
                                       
                                      </>
                                    ) : chat.chatType==='pdf' ? (
                                          <a href={`${attachURL}${chat.chatContent}`} target="_blank" download={chat.chatContent}>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" width="40px" alt=""/>
                                            <div className="displayPdfTitle">
                                                   {`${chat.chatContent.slice(0,5)}...pdf`}
                                                  <div className="alignChatTimeBox"> <ChatTimeBox chat={chat} displaySeenIcon={true}/></div>
                                            </div>
                                          </a>                               
                                    ):chat.chatType==='docx'||chat.chatType==='odt'? (
                                            <a href={`${attachURL}${chat.chatContent}`} target="_blank" download={chat.chatContent}>
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fb/.docx_icon.svg" width="40px" alt=""/>
                                                <div className="displayPdfTitle">{`${chat.chatContent.slice(0,5)}...${chat.chatContent.split('.')[1]}`}</div>
                                                <div className="alignChatTimeBox"> <ChatTimeBox chat={chat} displaySeenIcon={true}/></div>
                                           
                                          </a>
                                    ): chat.chatType==='txt'?(
                                              <div className="friendMsg">
                                                  <div> {parser(chat.chatContent)}</div>
                                                  <ChatTimeBox chat={chat} displaySeenIcon={true}/>
                                              </div>
                                    ):(<></>)}
                                     
                                     
                                  </div>
                                 
                              </div>
                          ):(
                            <div className="displayChatLine">
                                  <div className="displayUserMsg">                      
                                  </div>
                                  <div className="displayFriendMsg"> 
                                      {chat.chatType==='jpg'||chat.chatType==='jpeg'?(
                                            <div className="displayPhotoBox">
                                              <a href={`${attachURL}${chat.chatContent}`} target="_blank" download={chat.chatContent}>
                                                  <img className="displayPhotoChat" src={`${attachURL}${chat.chatContent}`} alt=""/>
                                              </a>
                                              <div className="imageBand">
                                                  <ChatTimeBox chat={chat} displaySeenIcon={false}/>
                                              </div>
                                            </div>
                                        ) : chat.chatType==='pdf' ? (
                                              <a href={`${attachURL}${chat.chatContent}`} target="_blank" download={chat.chatContent}>
                                                <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" width="40px" alt=""/>
                                                <div className="displayPdfTitle">{`${chat.chatContent.slice(0,5)}...pdf`}</div>
                                                <div className="alignChatTimeBox2"> <ChatTimeBox chat={chat} displaySeenIcon={false}/></div>
                                           
                                              </a>                               
                                        ): chat.chatType==='docx'||chat.chatType==='odt'? (
                                                <a href={`${attachURL}${chat.chatContent}`} target="_blank" download={chat.chatContent}>
                                                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fb/.docx_icon.svg" width="40px" alt=""/>
                                                    <div className="displayPdfTitle">{`${chat.chatContent.slice(0,5)}...${chat.chatContent.split('.')[1]}`}</div>
                                                    <div className="alignChatTimeBox2"> <ChatTimeBox chat={chat} displaySeenIcon={false}/></div>
                                           
                                              </a>
                                        ):chat.chatType==='txt'?(
                                            <div className="userMsg"> 
                                                <div>{parser(chat.chatContent)}</div>
                                                <ChatTimeBox chat={chat} displaySeenIcon={false}/>
                                            </div>
                                        ):(<></>)}
                                     
                                  </div>
                              </div>
                          )}
                      </div>
                  ))
       ):(
         <></>
       )       
       }
        
    </div>
    )
  }
}
const mapStateToProps=(state)=>{
  return {
    chatToDisplay:state.chatsR.chatToDisplay,
    publicUserId:state.loginR.publicUserId,
    searchValue:state.chatsR.searchValue,
    chatsList:state.chatsR.chatsList,
    searchValue:state.chatsR.searchValue,
   
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    displayChat:(chatId)=>{dispatch(displayChat(chatId))},
    listChats:(userLogged)=>{dispatch(listChats(userLogged))},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RightChatContainer);

// //@ to INSERT an icon inside the divTextArea for the purposes that the content of the div.innerHTML to be passed to server
//@ we have 3 components :  DisplayEmoticon   -- RightFooterContainer -- MainRightContainer
//@ the selected emoticon URL addresss will be communicated by the DisplayEmoticon component to -> MainRightContainer - parent component
//@ calling a function defined in the parent component and passed as props inside the DisplayEmoticon component we weill return photoURL to parent
//@ photoURL being in parent -- MainRightContainer in state we can now passed it as props to RightFooterContainer
//@ inside the RightFooterContainer we will use React.createElement to create an image element and insert that in divTextArea innerHTML


//@ or the second option is to return from DisplayEmoticon the entire <img > element with all props to parent
//@ from parent we pass it to RightFooterContainer where using innerHTML we will insert it to divTextArea