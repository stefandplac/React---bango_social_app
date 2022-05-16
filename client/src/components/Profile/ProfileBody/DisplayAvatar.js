import React, { Component } from 'react';

//@ css import 
import './css/DisplayAvatar.css';

//@ import constants 
import {avatarURL} from '../../../constants/constants';
import ChooseAvatar from './ChooseAvatar';


export default class DisplayAvatar extends Component {
  render() {
    return (
      <div className='displayAvatar'>
          <div className='avatarBox'>
              <img className="avatarImgBox" src={`${avatarURL}${this.props.avatar}`} alt=""/>
          </div>
          <div className="selectAvatars">
                <ChooseAvatar/>
          </div>
         
      </div>
    )
  }
}

