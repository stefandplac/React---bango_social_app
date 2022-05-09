import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

//@ user defined components.....
import RightHeaderContainer from './RightHeaderContainer';
import RightChatContainer from './RightChatContainer';
import RightFooterContainer from './RightFooterContainer';
import ShowEmoticons from './Chats/ShowEmoticons';

 class MainRightContainer extends Component {
  constructor(props){
    super(props);
    this.divTextArea=React.createRef();
    this.state={
      // emoticonList:[],
      showEmoticon:true,
      
    }
  } 
  toggleEmoticons=()=>{
    this.setState({showEmoticon:!this.state.showEmoticon});
  }

  
  render() {
    return (
        <div className="mainRightContainer">
            <RightHeaderContainer />
            <RightChatContainer/>
            {this.props.chatToDisplay._id?(
              <>
                <ShowEmoticons emoticonList={this.props.emoticonList[0].emoticon}  showEmoticon={this.state.showEmoticon} divTextArea={this.divTextArea}/>
           
                <RightFooterContainer toggleEmoticons={this.toggleEmoticons} textAreaRef={this.divTextArea}/>
              </>
            ):(
              <></>
            )}
            
        </div>
    )
  }
}
const mapStateToProps=(state)=>{
  return{
    chatToDisplay:state.chatsR.chatToDisplay,
    emoticonList:state.chatsR.emoticons,
  }
}
export default connect(mapStateToProps)(MainRightContainer);
