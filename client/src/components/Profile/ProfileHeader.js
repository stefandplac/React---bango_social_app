import React, { Component } from 'react';

//@ import css
import './css/ProfileHeader.css';

//@ redux action imports...
import { updateScreen } from '../../redux/actions/chats/updateScreen';
import { connect } from 'react-redux';

class ProfileHeader extends Component {
    handleClick=()=>{
        let x='showChats';
        this.props.returnDisplayUser(x);
        this.props.updateScreen(false);
    }
  render() {
    return (
      <div className="profileHeader">
          <div className="profileHeaderBox">
            <div onClick={this.handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="emoticonProfileHeader" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </div>
            <div className="profileHeaderTitle">
                Profile
            </div>

          </div>
     </div>
    )
  }
}
const mapStateToProps=(state)=>{
    return{
        showProfile:state.chatsR.showProfile,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        updateScreen:(showProfile)=>{dispatch(updateScreen(showProfile))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeader);
