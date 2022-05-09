import React, { Component } from 'react';
import { connect } from 'react-redux';

//@ redux actions imports...
import {logOut} from '../redux/actions/loginA';

class RightHeaderContainer extends Component {
  logOut=()=>{
      this.props.logOut();
      console.log(localStorage.token);
  }
  render() {
    return (
    <div className="mainRightContainerHeader">
        
         {this.props.chatToDisplay.user1 ? (
           <div className="rightHeaderTitle">
                  <div className="avatarUser">
                          <svg xmlns="http://www.w3.org/2000/svg" className="" fill="none" viewBox="0 0 22 22" stroke="currentColor" strokeWidth={1}>
                             <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
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
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    logOut:()=>{ dispatch(logOut())},
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(RightHeaderContainer);
