import React, { Component } from 'react'

export default class LeftHeaderContainer extends Component {
  handleClick=()=>{
    this.props.returnDisplayUser();
  }
  render() {
    return (
        <div className="mainLeftContainerHeader" >
          {this.props.newChat===true? (
               <div className="leftHeaderMenu" onClick={this.handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="emoticonStyle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
              </div>
          ):(<></>)}
          
            <div className="leftHeaderMenu" onClick={this.handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" className="emoticonStyle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
            </div>

        </div>
    )
  }
}
