import React, { Component } from 'react'

export default class MsgBox extends Component {
    handleChange=(event)=>{
        this.props.handleChange(event.target.value);
        
    }
  render() {
    return (
        <textarea placeholder="... your message ..." className='footerArea' onChange={this.handleChange}></textarea>
    )
  }
}
