import React, { Component } from 'react';

//@ css file imports
import './css/DisplayStatus.css';

//@redux actions imports
import { updateProfile } from '../../../redux/actions/updateProfile';
import { connect } from 'react-redux';

class DisplayStatus extends Component {
    constructor(props){
        super(props);
        this.editStatus=new React.createRef();
        this.editPhoneNumber=new React.createRef();
        this.editCity=new React.createRef();
        this.editCountry=new React.createRef();
        this.state={
            toggle:true,
            
        }
    }
    componentDidMount(){
        if(this.props.status!==''){this.editState.current.textContent=this.props.status}
            else{  this.editStatus.current.textContent="no status yet"; };
        if(this.props.phoneNumber!==''){ this.editPhoneNumber.current.textContent=this.props.phoneNumber}
            else{this.editPhoneNumber.current.textContent="no phone"};
        if(this.props.city!==''){ this.editCity.current.textContent=this.props.city}
            else{ this.editCity.current.textContent="no city"};
        if(this.props.country!==''){ this.editCountry.current.textContent=this.props.country}
            else{ this.editCountry.current.textContent="no country"};
    }
  
    handleEditStatus=()=>{
        this.setState({toggle:!this.state.toggle});
        this.editStatus.current.contentEditable=true;
        this.editStatus.current.className="editProfileStatusBox editProfileStatusBoxActivated contactDataActivated";
        this.editStatus.current.textContent=this.props.status;

        this.editPhoneNumber.current.contentEditable=true;
        this.editPhoneNumber.current.className="contactData  contactDataActivated";
        this.editPhoneNumber.current.textContent=this.props.phoneNumber;

        this.editCity.current.contentEditable=true;
        this.editCity.current.className="contactData contactDataActivated";
        this.editCity.current.textContent=this.props.city;

        this.editCountry.current.contentEditable=true;
        this.editCountry.current.className="contactData  contactDataActivated";
        this.editCountry.current.textContent=this.props.country;
    }
    handleSaveStatus=async()=>{
        this.setState({toggle:!this.state.toggle});

        let profileBody={
            status:String(this.editStatus.current.textContent),
            publicUserId:localStorage.publicUserId,
            phoneNumber:String(this.editPhoneNumber.current.textContent),
            city:String(this.editCity.current.textContent),
            country:String(this.editCountry.current.textContent),
        };
        await this.props.updateProfile(profileBody);

        this.editStatus.current.contentEditable=false;
        this.editStatus.current.className=this.editStatus.current.textContent!==''?"editProfileStatusBox ":"editProfileStatusBox noContactData";

        this.editPhoneNumber.current.contentEditable=false;
        this.editPhoneNumber.current.className=this.editPhoneNumber.current.textContent!==''?"contactData":"contactData noContactData";
        
        this.editCity.current.contentEditable=false;
        this.editCity.current.className=this.editCity.current.textContent!==''?"contactData":"contactData noContactData";
     
        this.editCountry.current.contentEditable=false;
        this.editCountry.current.className=this.editCountry.current.textContent!==''?"contactData":"contactData noContactData";
       
        console.log('#### DisplayStatus>> event.target.textContent:',this.editStatus.current.textContent);
        
        if(this.editStatus.current.textContent===''){ this.editStatus.current.textContent='no status yet'};
        if(this.editPhoneNumber.current.textContent===''){this.editPhoneNumber.current.textContent="no phone"};
        if(this.editCity.current.textContent===''){this.editCity.current.textContent="no city"};
        if(this.editCountry.current.textContent===''){this.editCountry.current.textContent="no country"};
    }
    
    handleEnter=(event)=>{
        if(event.keyCode === 13){
            this.handleSaveStatus();
        }
        else {
            return;
        }
        }
    
  render() {
    return (
    <div className="displayProfileStatusBox">
      <div className="displayStatusTitle">
          Profile Status
      </div>
      <div className="displayProfileStatus">
          <div className={this.props.status!==''?"editProfileStatusBox":"editProfileStatusBox noContactData"} ref={this.editStatus}>
              {/* {this.props.status? (<div>{this.props.status}</div>):(
                  <>{`no status yet`}</>
              )} */}
          </div>
          {this.state.toggle===true?(
                <div className="editStatusBtn" onClick={this.handleEditStatus}>
                    Edit
                </div>
            ):(
                <div className="editStatusBtn saveStatusBtn" onClick={this.handleSaveStatus} onKeyDown={this.handleEnter}>
                    Save
                </div>
            )}
            
      </div>
      <div className="displayContact">
          <div className="contactDetailsTitle">Contact Details</div>
          <div className="contactDetailsContainer">
              <div className="contactDetailsBox">
                  <div className="contactDataBox">
                        <div className="contactIcons">
                              <svg xmlns="http://www.w3.org/2000/svg" className="" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                              </svg>
                        </div>
                        <div className={this.props.phoneNumber!==''?"contactData":"contactData noContactData"} ref={this.editPhoneNumber}>
                             
                        </div>
                  </div>
                  <div className="contactDataBox">
                        <div className="contactIcons">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                        </div>
                        
                        <div className={this.props.city!==''?"contactData":"contactData noContactData"} ref={this.editCity}>
                             
                        </div>
                  </div>
                  <div className="contactDataBox">
                        <div className="contactIcons">
                                 
                        </div>
                        <div className={this.props.country!==''?"contactData":"contactData noContactData"} ref={this.editCountry}>
                             
                        </div>
                  </div>
              </div>
              <div className="contactDetailsMap">
                  
              </div>
          </div>
      </div>
    </div>
    )
  }
}
const mapStateToProps=(state)=>{
    return{

    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        updateProfile:(profileBody)=>{dispatch(updateProfile(profileBody))},
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DisplayStatus);