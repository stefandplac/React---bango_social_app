import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class SignInUpMenu extends Component {
  render() {
    return (
        <>
          {this.props.loc==='signIn'?(
                 <div className="signInMenu">
                 <div className="signInMenuActive">Sign In </div>
                 <Link to='/sign-up' className="linkStyle"><div className="">Register an account</div></Link>
             </div>
          ):(
            <div className="signInMenu">
            <Link to='/sign-in' className="linkStyle"><div className="signInMenuInactive">Sign In </div></Link>
              <div className="signInMenuRegister">Register an account</div>
            </div>
          )}
        
        </>
   
    )
  }
}
