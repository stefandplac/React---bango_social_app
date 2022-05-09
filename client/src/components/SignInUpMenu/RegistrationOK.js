import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

//@ redux actions ...
import { deleteRegistrationState } from '../../redux/actions/registerA';
import {resetStoreState} from '../../redux/actions/loginA';

class RegistrationOK extends Component {
    //@ we will use a function that will create a timer. the function will be called inside the componentDidMount()
    //@ when the timer will expire we will redirect the user to /sign-in path and
    //@ dispatch an action that will reset the state values for registration process
    constructor(props){
        super(props);
        this.state={
            isLoaded:false,
            progressBarWidth:0,
        }
    }
    timerFinished= ()=>{
           
            let barWidth = 0;
            const animate = () => {
                    barWidth++;
                    this.setState({progressBarWidth:barWidth});
                    
            };
            
            let intervalID = setInterval(() => {
              if (barWidth === 100) {
                clearInterval(intervalID);
              } else {
                animate();
              }
            }, 30); //this sets the speed of the animation

                setTimeout(()=>{
                    this.setState({isLoaded:true});
                    this.props.deleteRegistrationState();
                    this.props.resetStoreState();        
            },3000);
     
       
       
    }
   componentDidMount(){
       setTimeout(this.timerFinished,10);
   }

  
  render() {
    return (
        <>
          {this.state.isLoaded ===false ?(
                <main className="mainSignIn">
                <div className="mainSignInBox mainBoxShadow" style={{display:"flex"}}>
                <div className="registrationFully">
                                                                          
                        <span className="registrationFullyLogo">  BANG
                            <svg xmlns="http://www.w3.org/2000/svg" className="logoSvgOK" fill="none" viewBox="0 0 22 22" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </span>
                        <p>{this.props.topMsg} </p>
                 
                </div>
                <div className="redirectMsg">{this.props.midT}</div>
                <div className="Bar">
                    <div className="progressBar" id="progressBar" style={{width:`${this.state.progressBarWidth}%`}}></div>
                </div>
                <div className="redirectMsg redirectMsgRed">{this.props.midB}</div>
                </div>
                </main>
             ):(
                <Navigate to="/sign-in"/>
            )}
        </>
    )
  }
};
export const mapStateToProps=(state)=>{
    return {

    }
};
export const mapDispatchToProps=(dispatch)=>{
    return{
         deleteRegistrationState:()=>{dispatch(deleteRegistrationState())},
         resetStoreState:()=>{dispatch(resetStoreState())},
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationOK);
