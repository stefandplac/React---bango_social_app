import React, { Component } from 'react'
import { connect } from 'react-redux';
import parser from 'html-react-parser';

//@ redux actions....
import {displayChat} from '../redux/actions/chats/displayChat';

//@ import constants 
import {backgroundURL} from '../constants/constants';


//@ user defined components


//@ constants imports....
import {attachURL} from '../constants/constants';
import ChatTimeBox from './Chats/ChatTimeBox';

const today=new Date();


class RightChatContainer extends Component {
 
 
  //  a=()=>{
         
  //                 let interval = setInterval(async() => {
  //                                       // this.setState({ time: Date.now() });
  //                                       if(localStorage.publicUserId){
                                          
  //                                         //  await this.props.displayChat(this.props.chatToDisplay._id, this.props.chatToDisplay.chats.length);
  //                                           //  console.log('this.props.chatToDisplay.chats.length:',this.props.chatToDisplay.chatLength);                                        
  //                                           // console.log('RightchatContainer called once more');
  //                                           // this.chatContainerBox.current.scrollTop=this.chatContainerBox.current.scrollHeight;
  //                                           clearInterval(interval);
  //                                           console.log('#### RightChatContainer ### timeInterval ### chatToDisplay:',this.props.chatToDisplay);
                                            
  //                                           this.a();
  //                                       }
  //                                       else{
  //                                         clearInterval(interval);
  //                                         return;
  //                                       }
  //                                     }, 7000);
                  
  //   };

  b=async()=>{
    // console.log('rightChatContainer this.props.chatToDisplay._id:',this.props.chatToDisplay._id);
    // console.log('this.props.chats[0]:',this.props.chatsList[0]);
    if(this.props.chatToDisplay._id){
      return;
    } else {
        if(this.props.chatsList[0]){ 
              await this.props.displayChat(this.props.chatsList[0]._id);
        }
      }
      
  
  }
  // componentDidMount() {
  //   this.a();
  
   
  // }
  componentDidUpdate(prevProps){
     if(prevProps.chatsList[0]?._id!==this.props.chatsList[0]?._id){
         this.b();
     }
      
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
    displayChat:(chatId,chatLength)=>{dispatch(displayChat(chatId,chatLength))},
  
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