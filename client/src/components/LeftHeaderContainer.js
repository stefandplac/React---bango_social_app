import React, { Component } from 'react';
import { connect } from 'react-redux';

//@ import constants 
import {avatarURL} from '../constants/constants';

//@redux actions imports...
import { updateScreen } from '../redux/actions/chats/updateScreen';

class LeftHeaderContainer extends Component {

  handleClickUsers=()=>{
    // console.log('event.target.id:',event.target.name);
    this.props.returnDisplayUser('showChats');
  }
  handleClickChats=()=>{
    // console.log('event.target.id:',event.target.name);
    this.props.returnDisplayUser('showUsers');
  }
  handleClickProfile=async()=>{
    this.props.returnDisplayUser('showProfile');
    await this.props.updateScreen(true);
    

  }
  render() {
    return (
      <>
       

     
      <div className="mainLeftContainerHeader" >
          <div className="showAvatarHeader" onClick={this.handleClickProfile}>
              <div className='leftHeaderAvatarBox'>
                    <img className="avatarImgBox" src={`${avatarURL}${this.props.userProfile.avatar}`} alt=""/>
              </div>
          </div>
          <div className="leftHeaderMenuBox">
                  {this.props.newChat==='showUsers'? (
                      <div className="leftHeaderMenu" onClick={this.handleClickUsers} name="showUsers">
                            <svg xmlns="http://www.w3.org/2000/svg" className="emoticonStyle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                            </svg>
                      </div>
                  ):(<></>)}
                  
                    <div className="leftHeaderMenu" onClick={this.handleClickChats} name="showChats">
                        <svg xmlns="http://www.w3.org/2000/svg" className="emoticonStyle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
            </div>
            
        </div>

      </>
    )
  }
}
const mapStateToProps=(state)=>{
  return{
     userProfile:state.loginR.userProfile,
     showProfile:state.chatsR.showProfile,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
    updateScreen:(showProfile)=>{dispatch(updateScreen(showProfile))},
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(LeftHeaderContainer);
