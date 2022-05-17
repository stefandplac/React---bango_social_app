import React, { Component } from 'react';

//@ css file
import './css/ShowAvatars.css';

//@ import constants URL
import {avatarURL} from '../../../constants/constants';
import { connect } from 'react-redux';

//@ import redux actions...
import { updateProfile } from '../../../redux/actions/updateProfile';

class ShowAvatars  extends Component {

    handleClick=async ()=>{
        let profileBody={
                        publicUserId:localStorage.publicUserId,
                        avatar:this.props.avatar,
        };
       await this.props.updateProfile(profileBody);
    }
  render() {
    return (
      <div className="showAvatarBox" onClick={this.handleClick}>
            <img className="showAvatarImgBox" src={`${avatarURL}${this.props.avatar}`} alt=""/>
      </div>
    )
  }
}
const mapStateToProps=(state)=>{

    return{

    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        updateProfile:(profileBody)=>{dispatch(updateProfile(profileBody))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowAvatars);
