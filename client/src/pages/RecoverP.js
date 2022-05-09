import React, { Component } from 'react';
import {Navigate} from 'react-router-dom';
import {connect} from 'react-redux';

//@ redux actions imports...
import {recoverPassword} from '../redux/actions/loginA.js';
import {deleteLoginErrors} from '../redux/actions/loginA';

//@user defined components.....
import RegistrationOK from '../components/SignInUpMenu/RegistrationOK';
 
//@ constants imports...
import {passRecovEmailUrl,recoverP} from '../constants/constants';

class RecoverP extends Component {

 constructor(props){
     super(props);
     this.state={
         recovery:{
             email:'',
         },
     }
 }
 componentDidMount(){
    this.props.deleteLoginErrors();  
 }
 handleChange=(event)=>{
     this.setState({recovery:{email:event.target.value}});
    this.props.deleteLoginErrors();   
 }
 checkForErrors=()=>{
    if(this.props.recoveryErrorData.email){
        console.log('errors with email ', this.props.recoveryErrorData);
        this.props.deleteLoginErrors();
        return;
    }
    console.log('print outside the if statement');
    
    this.props.deleteLoginErrors(); 
 }
 
 handleSubmit=async (event)=>{
    event.preventDefault();
    await this.props.recoverPassword(this.state.recovery,passRecovEmailUrl);
    await this.checkForErrors();
    
    
 }
  render() {
    return (
        <>
        {this.props.isAuthenticated ? (<Navigate to="/main"/>)
        : this.props.actionFinished ? (<RegistrationOK topMsg={recoverP.top} midT={recoverP.midT} midB={recoverP.midB} />)
        
        :(
        <>
          <header></header>
          <main className="mainSignIn">
            <div className="mainSignInBox mainBoxShadow" style={{paddingRight:"45px"}}>
              
               <div className="registrationFully">
                    
                    <span className="registrationFullyLogo">  BANG
                        <svg xmlns="http://www.w3.org/2000/svg" className="logoSvgOK" fill="none" viewBox="0 0 22 22" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    </span>
                    <p>Resetting the password </p>
            
            </div>
             
              <form action="" method="post">
              <div className="signInForm">
                  
                <div className="recoverPDivP">
                   Insert the e-mail you used when you registered the account 
                </div>
                <div className="recoverPDivP">
                 
                  <input onChange={this.handleChange} autoComplete="off" placeholder="write the e-mail here" className="recoverPInput" type="text" name="revocerPass" id="recoverPass" />
                  
                </div>
               
               
                <div className="recoverPDivP">
                   <button className="logInBtn" type="submit" onClick={this.handleSubmit}>Send</button>
                  
                </div>
                <div className="recoverPDivP">
                  
                   <div className="errorContainer">
                      {this.props.recoveryErrorData ? (   
                                                  <div>
                                                    {this.props.recoveryErrorData.email? (<div className="errorAlert" style={{alignSelf:"flex-end"}}>{this.props.recoveryErrorData.email}</div>
                                                 ) :(<></>)}
                                                   </div>
                                                
                      ):(<></>)}
                      </div>
                </div>
               
                 
              
              </div>
              </form>
            </div>
          </main>
          <footer></footer>
        </>
        )};
        </>
      );
    }
  }
  const mapStateToProps=(state)=>{
    return {
            isAuthenticated:state.loginR.isAuthenticated,
            recoveryErrorData:state.loginR.errors,
            recoveryPasswordData:state.loginR.errors,
            actionFinished:state.loginR.actionFinished,
           
    }
  };
  const mapDispatchToProps=(dispatch)=>{
    return {
           recoverPassword:(emailData,urlS)=>{dispatch(recoverPassword(emailData,urlS))},
           deleteLoginErrors:()=>{dispatch(deleteLoginErrors())},
  
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(RecoverP);
  