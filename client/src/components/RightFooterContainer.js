import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import FormData from 'form-data';

//@ redux actions....
import {writeChat} from '../redux/actions/chats/writeChat';
import {displayChat} from '../redux/actions/chats/displayChat';

//@ user defined components.....
import MsgBox from './Chats/MsgBox';

class RightFooterContainer extends Component {
  constructor(props){
    super(props);
    // this.textAreaRef=React.createRef();
   
  }
 
  
  buildChat=()=>{
       
        let friend = {};
        let author= {};
        // console.log('this.props.chatToDisplay.user1.publicUserId',this.props.chatToDisplay.user1.publicUserId);
        // console.log('this.props.publicUserId',localStorage.publicUserId);
        if(Number(this.props.chatToDisplay.user1.publicUserId)===Number(localStorage.publicUserId) )
                {
                    friend={publicUserId:this.props.chatToDisplay.user2.publicUserId , name:this.props.chatToDisplay.user2.name};
                    author= {publicUserId:this.props.chatToDisplay.user1.publicUserId , name:this.props.chatToDisplay.user1.name};
                    // console.log('if statemten ',author, friend);
                } 
                else{
                    friend= {publicUserId:this.props.chatToDisplay.user1.publicUserId , name:this.props.chatToDisplay.user1.name};
                    author={publicUserId:this.props.chatToDisplay.user2.publicUserId , name:this.props.chatToDisplay.user2.name};
                    // console.log('else state ',author, friend);
                };
            
        console.log('this.textAreaRef.ccurrent.innerHtml :',this.props.textAreaRef.current.innerHTML);
        //@ I pass one more property id in this case cause I want theserver to return me the updated chat to display
        let chatBody = {author:author, friend:friend, chatContent:String(this.props.textAreaRef.current.innerHTML),id:this.props.chatToDisplay._id};
        // console.log('####  inside buildChat  chatBody  @@@ ',chatBody);
        return chatBody;
  }
  handleClick= async()=>{
    if(String(this.props.textAreaRef.current.innerHTML)===''){
      return;
    }
    let chatBody=this.buildChat();
    chatBody.chatType="txt";
    console.log('cahtbody inside handleClick',chatBody);
    await this.props.writeChat(chatBody,this.props.chatToDisplay);
    this.props.textAreaRef.current.innerHTML='';
   
  }
  handleEnter=(event)=>{
    if(event.keyCode === 13){
        this.handleClick();
    }
    else {
      return;
    }
  }
  uploadFile=async(event)=>{
    if(event.target.files[0]){

                       
            //@ we will use a different route for uploading the file to the server
            const formData= new FormData();
            formData.append("fileInput",event.target.files[0]);
            console.log('formData fileInput',event.target.files[0]);
            const configHeaders={
              headers:{
                'Content-Type':'multipart/form-data',
              }
            };
            
            const response= await axios.post('http://localhost:5000/api/fileUpload',
                                              formData,
                                              configHeaders,
            ); 
            console.log('response.data',response.data);
            //@ we uploaded the file using one route and now we need to send the photo
            //@ to insert the photo name into chat attach
            let xString = response.data.fileName.split('.');
            
            let chatBody=await this.buildChat();
            chatBody.chatContent = response.data.fileName;
            //@ now we will extract the extention and store it in chatType property
            let chatExtension = xString[1];
            console.log('chatExtension ',chatExtension);
            chatBody.chatType=chatExtension;
            console.log('chatBody inside uploadFile',chatBody);
          
             await this.props.writeChat(chatBody,this.props.chatToDisplay);
            

    }
    else{
      return;
    }
  }

  toggleEmoticons=()=>{
    this.props.toggleEmoticons();
  }
  render() {
    return (
        <div className="mainRightContainerFooter">
            <div onClick={this.toggleEmoticons}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="emoticonStyle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
            </div>
            <div >
              <label >
                  <input type="file" style={{display:"none"}} onChange={this.uploadFile}/>
                  <svg xmlns="http://www.w3.org/2000/svg" className="emoticonStyle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                </label>
               
            </div>
            {/* <MsgBox handleChange={this.handleChange}/> */}
            <div contentEditable="true"  placeholder="... your message ..." ref={this.props.textAreaRef} className='divTextArea'  onKeyDown={this.handleEnter}>

            </div>
            <div onClick={this.handleClick}>
                <svg  xmlns="http://www.w3.org/2000/svg" className="emoticonStyle rotate90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
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
      writeChat:(chatBody,chatToDisplay,xString)=>{dispatch(writeChat(chatBody, chatToDisplay,xString))},
      
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(RightFooterContainer);
