import React, { Component } from "react";
import {Navigate, Link} from 'react-router-dom';
import {connect} from 'react-redux';

//@ redux actions ...
import {loginA} from '../redux/actions/loginA';
import {deleteLoginErrors} from '../redux/actions/loginA';

//@ user defined imports --components, styles, 
import "../css/SignInSignUp.css";
import SignInUpMenu from "../components/SignInUpMenu/SignInUpMenu";


class SignIn extends Component {
  constructor(props){
      super(props);
      this.state={
           login:{
             email:'',
             password:'',
           },
      }
  }
  handleOnChange=async(event)=>{
     event.target.name==='emailSignIn' ? this.setState({login:{...this.state.login, email:event.target.value}})
                                  : this.setState({login:{...this.state.login, password:event.target.value}});
     await this.props.deleteLoginErrors();
              
  }
  handleSubmit=async (event)=>{
    event.preventDefault();
    await this.props.loginAction(this.state.login);
     
  }
  componentDidMount(){
    this.props.deleteLoginErrors();
  }
  
  render() {
    return (
      <>
      {this.props.isAuthenticated ? (<Navigate to="/main"/>):(
      <>
        <header></header>
        <main className="mainSignIn">
          <div className="mainSignInBox mainBoxShadow">
            <div className="signInLogo">BANG
                    <svg xmlns="http://www.w3.org/2000/svg" className="logoSvg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
            
            </div>
            <SignInUpMenu loc={'signIn'}/>
            <form action="" method="post">
            <div className="signInForm">
           
              <div className="inputSignIn">
                <label className="labelSignIn" forhtml="Email">E-mail:</label>
                <input onChange={this.handleOnChange} autoComplete="off" placeholder="Email" className="inputStyle" type="text" name="emailSignIn" id="emailSignIn" />
                       
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="signInCheck" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg> */}
              </div>
             
              <div className="inputSignIn">
                  <label  className="labelSignIn" forhtml="pass">Password:</label>
                  <input onChange={this.handleOnChange} autoComplete="off" placeholder="Password" style={{justifySelf:"flex-end"}}className="inputStyle" type="password" name="passSignIn" id="passSignIn"/>
              </div>
              <div className="inputSignIn">
                 <button className="logInBtn" type="submit" onClick={this.handleSubmit}>Log in</button>
                 <div className="errorContainer">
                    {this.props.loginErrorData ? (   
                                                <div>
                                                  {this.props.loginErrorData.email? (<div className="errorAlert" style={{alignSelf:"flex-end"}}>{this.props.loginErrorData.email}</div>
                                               ) : this.props.loginErrorData.password ? (<div className="errorAlert" style={{alignSelf:"flex-end"}}>{this.props.loginErrorData.password}</div>
                                               ) :(<></>)}
                                                 </div>
                                              
                    ):(<></>)}
                    </div>
              </div>
              {/* <div className="inputSignIn">
              <p className="signInP">Don't have an account yet? 
                   <span style={{color:"#2c2c2b"}} className="signInSpan">Sign Up</span>
                </p>
                </div> */}
                <div className="inputSignIn">
                    <p className="signInP">{`Forgot your password? `}
                       <Link to="/recover-password" className="linkStyle"> <span style={{color:"#2c2c2b"}} className="signInSpan">Recover it</span></Link>
                      </p>
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
          loginResponseData: state.loginR.loginResponseData,
          loginErrorData:state.loginR.errors,
  }
};
const mapDispatchToProps=(dispatch)=>{
  return {
          loginAction:(loginData)=>{dispatch(loginA(loginData))},
          deleteLoginErrors:()=>{dispatch(deleteLoginErrors())},

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
