import React, { Component } from 'react';
import {connect} from 'react-redux';

//@ import css file
import './css/ProfileBody.css';

//@ import user defined components
import DisplayAvatar from './ProfileBody/DisplayAvatar';
import ChooseAvatar from './ProfileBody/ChooseAvatar';
import DisplayStatus from './ProfileBody/DisplayStatus';



class ProfileBody extends Component {
  render() {
    return (
      <div className="profileBody">
          
          <DisplayAvatar avatar={this.props.userProfile.avatar}/>
          {/* <ChooseAvatar /> */}
          <DisplayStatus status={this.props.userProfile.status} city={this.props.userProfile.profile.city} country={this.props.userProfile.profile.country} phoneNumber={this.props.userProfile.profile.phoneNumber}/>
          
          
    </div>
    )
  }
}
const mapStateToProps=(state)=>{
    return{
       userProfile:state.loginR.userProfile,
    }
}
export default connect(mapStateToProps)(ProfileBody);
