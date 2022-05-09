import React, { Component } from 'react'
import DisplayEmoticon from './DisplayEmoticon'

export default class ShowEmoticons extends Component {
  
  render() {
    return (
        <>
         {this.props.showEmoticon===true?(
                    <div className="emoticonsDisplayX">
                    {this.props.emoticonList.map((emoticon,index)=>(
                                <DisplayEmoticon emoticon={emoticon} key={index} divTextArea={this.props.divTextArea}/>
                    
                    ))}
                    </div>
            ):(
                <></>
            )}
        </>
    )
  }
}
