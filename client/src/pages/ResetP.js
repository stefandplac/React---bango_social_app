
import React, { Component} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {connect} from 'react-redux';

//@user defined components.....
import RegistrationOK from '../components/SignInUpMenu/RegistrationOK';

//@ redux actions imports...
import {deleteLoginErrors,recoverPassword} from '../redux/actions/loginA';

//@ constants imports...
import {setNewPassRecovUrl, chgPass,unAuth } from '../constants/constants';


function withParamsWrapper(Component){
  return (props)=><Component {...props} tk={useParams()}/>
}

class ResetP extends Component {

 constructor(props){
     super(props);
     this.state={
         recovery:{
             password:'',
         },
        error:'',
        confirmedPass:'',      
     }
 }
 componentDidMount(){
    this.props.deleteLoginErrors();  
    console.log(this.props.tk);
       
    
 }

 handleChange=(event)=>{
      this.props.deleteLoginErrors();  
      this.setState({error:''});
      if(event.target.name==='recoverPassConfirm'){
          this.setState({confirmedPass:event.target.value});
          
          return;
      }
     this.setState({recovery:{password:event.target.value}});
     
 }
 checkForErrors=()=>{
    if(this.props.recoveryErrorData.password){
        console.log('errors with password', this.props.recoveryErrorData);
        this.props.deleteLoginErrors();
        return;
    }
   
    
    this.props.deleteLoginErrors(); 
 }

 handleSubmit=async (event)=>{
    event.preventDefault();
    if(this.state.confirmedPass!==this.state.recovery.password){
      this.setState({error:'Passwords do not match'});
      return;
    };
     await this.props.recoverPassword({token:this.props.tk.tk,password:this.state.recovery.password},setNewPassRecovUrl);
     await this.checkForErrors();
     //@ if an error related to token was return by the server we will redirect the user case doesn't have access 
    //@ to that resource --the token is invalid 
    
  
    
    
    
 }
  render() {
    
    return (
        <>
        {this.props.isAuthenticated ? (<Navigate to="/main"/>)
        : this.props.actionFinished ? (<RegistrationOK topMsg={chgPass.top} midT={chgPass.midT} midB={chgPass.midB} />)
        : this.props.auth ? (<RegistrationOK topMsg={unAuth.top} midT={unAuth.midT} midB={unAuth.midB} />)
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
                    <p>Setting a new password </p>
            
            </div>
             
              <form action="" method="post">
              <div className="signInForm">
                  
                <div className="recoverPDivP">
                   Set a new password for your account 
                </div>
                <div className="recoverPDivP">
                    <input onChange={this.handleChange} autoComplete="off" placeholder="write the new password " className="recoverPInput" type="password" name="recoverPass" id="recoverPass" />
                </div>
                <div className="recoverPDivP">
                    <input onChange={this.handleChange} autoComplete="off" placeholder="repeat the password " className="recoverPInput" type="password" name="recoverPassConfirm" id="recoverPassConfirm" />
                 </div>
               
               
                <div className="recoverPDivP">
                   <button className="logInBtn" type="submit" onClick={this.handleSubmit}>Send</button>
                  
                </div>
                <div className="recoverPDivP">
                  
                   <div className="errorContainer">
                      {this.props.recoveryErrorData ? (   
                                                  <div>
                                                    {this.props.recoveryErrorData.password? (<div className="errorAlert" style={{alignSelf:"flex-end"}}>{this.props.recoveryErrorData.password}
                                                    </div>
                                                 ) : this.state.error ? (
                                                    <div className="errorAlert" style={{alignSelf:"flex-end"}}>
                                                      {this.state.error}
                                                    </div>
                                                 ) :   (<></>)}
                                                   </div>
                                                
                      ):(<></>)}
                      </div>
                </div>
               
                 
              
              </div>
              </form>
            </div>
          </main>
          
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
            recoveryPasswordData:state.loginR.recoveryPasswordData,
           actionFinished:state.loginR.actionFinished,
            auth:state.loginR.auth,
           
    }
  };
  const mapDispatchToProps=(dispatch)=>{
    return {
           recoverPassword:(newPass,urlPassServer)=>{dispatch(recoverPassword(newPass,urlPassServer))},
           deleteLoginErrors:()=>{dispatch(deleteLoginErrors())},
  
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(withParamsWrapper(ResetP));
