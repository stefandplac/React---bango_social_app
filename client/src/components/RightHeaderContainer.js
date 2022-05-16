import React, { Component } from 'react';
import { connect } from 'react-redux';

//@ redux actions imports...
import {logOut} from '../redux/actions/loginA';

//@ import constants 
import {avatarURL} from '../constants/constants';

class RightHeaderContainer extends Component {
  constructor(props){
    super(props);
    this.state={
      friendAvatar:'',
    }
  }
  returnAvat=()=>{
    let x;
    if(this.props.chatToDisplay.user1?.publicUserId===localStorage.publicUserId){
       x= this.props.usersList.filter(user=>user.publicUserId===this.props.chatToDisplay.user1.publicUserId);
    }
    else{
       x= this.props.usersList.filter(user=>user.publicUserId===this.props.chatToDisplay.user2.publicUserId);
    }
   
    return x.avatar;
    
 }
//  componentDidMount(){
//      this.setState({friendAvatar:this.returnAvat()});
//  }
  logOut=()=>{
      this.props.logOut();
      console.log(localStorage.token);
  }
  render() {
    return (
    <div className="mainRightContainerHeader">
        
         {this.props.chatToDisplay.user1&&this.props.showProfile===false ? (
           <div className="rightHeaderTitle">
                    <div className="showAvatarHeader" onClick={this.handleClickProfile}>
                        <div className='leftHeaderAvatarBox'>
                              {/* <img className="avatarImgBox" src={`${avatarURL}${this.state.friendAvatar}`} alt=""/> */}
                        </div>
                    </div>
                    <div className="chatBox">
                        <div className="displayNameDate"> 
                            <div className="displayName">
                           
                                  <>                   
                                    {Number(this.props.chatToDisplay.user1.publicUserId)===Number(localStorage.publicUserId)? (
                                        <>
                                            {this.props.chatToDisplay.user2.name}
                                            </>
                                    )
                                    :(
                                            <>
                                                {this.props.chatToDisplay.user1.name}
                                            </>
                                    )}
                                 </>
                                
                            
                            </div>
                          
                        </div>
                    </div>
            </div>
        ):(
          <></>
        )}
         <div></div>
        <div className="rightHeaderContainerMenu" onClick={this.logOut}>
          {/* //@ all the menu buttons comes to the right */}
          <svg xmlns="http://www.w3.org/2000/svg" className="emoticonStyle emoticonStyleRed" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </div>
    </div>
    )
  }
}
const mapStateToProps=(state)=>{
  return {
      chatToDisplay:state.chatsR.chatToDisplay,
      usersList:state.usersR.usersList,
      showProfile:state.chatsR.showProfile,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    logOut:()=>{ dispatch(logOut())},
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(RightHeaderContainer);
