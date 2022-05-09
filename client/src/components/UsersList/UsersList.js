import React, { Component } from 'react';
import { connect } from 'react-redux';

//@ import user defined components
import DisplayUser from './DisplayUser';
//@css file
import './css/UsersList.css';

class UsersList extends Component {
   
   returnDisplayUser=()=>{
       this.props.returnDisplayUser();
   }
  render() {
    return (
      <div className="usersListContainer">
          {this.props.usersList.map((user,index)=>(
            <div key={index}>
              {Number(user.publicUserId)===Number(localStorage.publicUserId) ? (
                  
                <></>
                ):(
                        <DisplayUser  user={user} returnDisplayUser={this.returnDisplayUser} />
              )}
             </div>
          ))}
      </div>
    )
  }
}
const mapStateToProps=(state)=>{
    return {
        usersList:state.usersR.usersList,
        getUsersErrors:state.usersR.errors,
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(UsersList);