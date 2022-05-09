import React, { Component } from 'react';
import './css/DisplayEmoticon.css';

//@ constants imports...
import {emoticonURL} from '../../constants/constants';

export default class DisplayEmoticon extends Component {
    setCursor=()=>{
        //@ set cursor at the end of the content inside divTextArea
        const selection = window.getSelection();  
        const range = document.createRange();  
        selection.removeAllRanges();  
        range.selectNodeContents(this.props.divTextArea.current);  
        range.collapse(false);  
        selection.addRange(range);  
        this.props.divTextArea.current.focus();
    }
    handleClick=()=>{
        let photoURL = `<img src="${emoticonURL}${this.props.emoticon}" alt=""/>`;
        let xContent= `${this.props.divTextArea.current.innerHTML} <span></span>`;
        console.log(xContent);
        this.props.divTextArea.current.innerHTML = `${xContent}${photoURL}`;
        this.setCursor();
        
    }
  render() {
    return (
      <div className="displayEmoticon" onClick={this.handleClick}>
          <img src={`${emoticonURL}${this.props.emoticon}`} alt="" className="imgEmoticon"/>
      </div>
    )
  }
}
