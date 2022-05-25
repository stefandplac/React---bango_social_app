import React, { Component } from 'react';

// @ css imports....
import './css/displayChat.css';

const today=new Date();
export default class ChatTimeBox extends Component {
  render() {
    return (
    <div className='timeBox'>
        <div className="displayTime">
            {today.getDate===new Date(this.props.chat.date).getDate ? (
                <>
                  {new Date(this.props.chat.date).toLocaleTimeString('en-us',{hour:'2-digit', minute:'2-digit'})}
                </>
            ):(
                <>
                {new Date(this.props.chat.date).toLocaleDateString('en-us', { month:"short", day:"numeric"})}
                </>
            )                                              
            }                                                    
        </div>
        {/* we will display viewchecked iccon only for our messages */}
        <>
           {this.props.displaySeenIcon===true? (
               <>
                {this.props.chat.seen===false? (
                    <div className="viewChecked">
                            <svg xmlns="http://www.w3.org/2000/svg" className="notSeenStyle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                    </div>
                        
                    ):(
                    <div className="viewChecked">
                        <svg xmlns="http://www.w3.org/2000/svg" className="seenStyle" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    
                    )}
                </>
           ):(
               <div className="onlyForSpace"></div>

           )}
           
                
        </>
</div>
    )
  }
}
