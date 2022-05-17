import React, { Component } from "react";
import {Link, Navigate} from 'react-router-dom';
import { connect } from "react-redux";

//@ redux actions imports....
import {registerUser, deleteRegistrationErrors} from '../redux/actions/registerA';

//@ user defined components, styles,....
import "../css/SignInSignUp.css";
import SignInUpMenu from '../components/SignInUpMenu/SignInUpMenu';
import RegistrationOK from '../components/SignInUpMenu/RegistrationOK';

//@constants imports....
import {registMsg} from '../constants/constants';

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state={
      registerData:{
        name:'',
        email:'',
        password:''
       
      },
      errors:{},
      confirmedPassword:'',
    }
  }
  // validate=()=>{
  //   this.setState({errors:{}});
  //     if(this.state.registerData.name==='' || this.state.registerData.name.length<4){
        
  //     }
  // };
  handleChange=async(event)=>{
    //@ to create a more friendly user experience i will delete the registrationErrors kept in store state at every check 
    //@ of the input fields
    await this.props.deleteRegistrationErrors();
    this.setState({errors:{}});

    switch(event.target.name) {
      case 'nameRegister':
        this.setState({registerData:{...this.state.registerData, name:event.target.value}});
        break;
      case 'emailRegister':
        this.setState({registerData : {...this.state.registerData, email:event.target.value}});
        break;
      case 'passRegister':
        this.setState({registerData:{...this.state.registerData, password:event.target.value}});
        break;
      default:
        if (this.state.registerData.password!==event.target.value){
            this.setState({...this.state,
                          errors:{confirmedPassword : 'The passwords do not correspond'},
                          confirmedPassword:event.target.value,
                        });
           
        } else {
          this.setState({...this.state,errors:{}, confirmedPassword:event.target.value});
        }
        break;

    }
    
  
  }
  handleRegister= async(event)=>{
    event.preventDefault();
    //@ we check first to see if there is an error in local state about the match between the passwords
    //@ if there isn't a match we will not send data for verification to the server
    //@ we will display the error in UI and return without dispatching any action
    if(this.state.registerData.password!==this.state.confirmedPassword){
      this.setState({...this.state,
        errors:{confirmedPassword : 'The passwords do not correspond'}});
      return;
    }
    
    //@ if both passwords are the same we dispatch the action regissterUser
    await this.props.registerUser(this.state.registerData);
  }
  render() {
    return (
      <>
         {this.props.isAuthenticated ? (<Navigate to="/main"/>)
           : this.props.isUserRegistered ? (<RegistrationOK topMsg={registMsg.top} midT={registMsg.midT} midB={registMsg.midB}/>)
           : (
                <>
                  <header></header>
                  <main className="mainSignIn">
                    <div className="mainSignInBox mainBoxShadow">
                      <div className="signInLogo">BANG
                          <svg xmlns="http://www.w3.org/2000/svg" className="logoSvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                              </svg>
                      </div>
                      <SignInUpMenu loc={'signUp'}/>
                      <form action="" method="post">
                      <div className="signInForm">
                        <div className="inputSignIn">
                          <label className="labelSignIn" forhtml="name">Name:</label>
                          <input onChange={this.handleChange} autoComplete="off" placeholder="Name" className="inputStyle" type="text" name="nameRegister" id="nameRegister" />
                        </div>
                        <div className="inputSignIn">
                          <label className="labelSignIn" forhtml="Email">E-mail:</label>
                          <input onChange={this.handleChange} autoComplete="off" placeholder="Email" className="inputStyle" type="text" name="emailRegister" id="emailRegister" />
                        </div>
                        <div className="inputSignIn">
                            <label  className="labelSignIn" forhtml="pass">Password:</label>
                            <input onChange={this.handleChange} autoComplete="off" placeholder="Password" style={{justifySelf:"flex-end"}}className="inputStyle" type="password" name="passRegister" id="passRegister"/>
                        </div>
                        <div className="inputSignIn">
                            <label  className="labelSignIn" forhtml="pass" style={{visibility:"hidden"}}>Password:</label>
                            <input onChange={this.handleChange} autoComplete="off" placeholder="Confirm password" style={{justifySelf:"flex-end"}}className="inputStyle" type="password" name="passRegisterConfirm" id="passRegisterConfirm"/>
                        </div>
                        <div className="inputSignIn">
                            <button className="logInBtn" type="button" onClick={this.handleRegister}>Register</button>
                            <div className="errorContainer errorContainerRegistration">
                                       
                                                    <div>
                                                      {this.props.registrationErrors.email? (<div className="errorAlert errorAlertRegistration" style={{alignSelf:"flex-end"}}>{this.props.registrationErrors.email}
                                                                                        </div>
                                                        ) : this.props.registrationErrors.password ? (<div className="errorAlert errorAlertRegistration" style={{alignSelf:"flex-end"}}>{this.props.registrationErrors.password}
                                                                                                </div>
                                                        ): this.props.registrationErrors.name ? (<div className="errorAlert errorAlertRegistration" style={{alignSelf:"flex-end"}}>{this.props.registrationErrors.name}
                                                                                                </div>
                                                        ): this.state.errors.confirmedPassword ? (<div className="errorAlert errorAlertRegistration" style={{alignSelf:"flex-end"}}>{this.state.errors.confirmedPassword}</div>
                                                      ) :(<></>)}
                                                    </div>
                                                      
                                        
                            </div>
                          
                        </div>
                        <div className="inputSignIn">
                        <p className="signInP">Already have an account? 
                            < Link to="/sign-in" className="linkStyle" style={{color:"#2c2c2b"}}>  <span className="signInSpan"> Sign In</span></Link>
                          </p>
                          </div>
                      
                      </div>
                      </form>
                    </div>
                  </main>
                  <footer></footer>
                </>)
            }
        </>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    isUserRegistered:state.registrationR.isUserRegistered,
    registrationErrors:state.registrationR.registrationErrors,
  }
};
const mapDispatchToProps=(dispatch)=>{
  return{
    registerUser:(userData)=> { dispatch(registerUser(userData))},
    deleteRegistrationErrors: ()=>{ dispatch(deleteRegistrationErrors())},
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);