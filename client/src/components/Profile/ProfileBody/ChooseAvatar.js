import React, { Component } from 'react';
import {connect} from 'react-redux';

//@ css imports
import './css/ChooseAvatar.css';

//@user defined components
import ShowAvatars from './ShowAvatars';

class ChooseAvatar extends Component {
    
  render() {
    return (
      <div className="chooseAvatar">
         
          {this.props.avatars.avatar?.map((avatar,index)=>(
              <ShowAvatars avatar={avatar} key={index}/>
          ))}
      </div>
    )
  }
}
const mapStateToProps=(state)=>{
    return{
        avatars:state.loginR.avatars,
    }
}
export default connect(mapStateToProps)(ChooseAvatar);