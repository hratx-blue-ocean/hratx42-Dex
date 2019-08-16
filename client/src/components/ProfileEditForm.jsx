import React from 'react'
import {  Button , Form} from 'react-bootstrap';
import http from '../../services/http/http.js';
import global from '../../utils/global';

export default class ProfileEditForm extends React.Component {
  constructor(props){
    console.log('props', props);
    super(props)
    this.state = {
      id: props.userId,
      nameField: props.user.name,
      emailField: props.user.email,
      passwordField: null,
      confirmPasswordField: null
    }
    this.submitProfileChanges = this.submitProfileChanges.bind(this)
  }

  checkPasswords(){
    const newPasswordInput = document.getElementById('newPassword')
    if (this.state.passwordField === null ||
        this.state.passwordField.length < 3 ||
        this.state.passwordField !== this.state.confirmPasswordField){
      newPasswordInput.setCustomValidity('Passwords must match')
      newPasswordInput.reportValidity();
      return false;
    }
    return true
  }

  submitProfileChanges(e) {
    e.preventDefault();
    console.log('i made a change');
    if (this.checkPasswords()){
      http.users
      .put(
        this.state.id,
        this.state.nameField,
        this.state.emailField,
        this.state.passwordField
      )
      .then(user => {
        this.props.hideProfile();
        global.setState({user})
      })
      .catch(err => console.log('Error: ', err));
    }
  }

  render(){
    console.log(this.state);
    return (
      <div className="dashboardProfileForm" >
        <h2>edit profile</h2>
        <form onSubmit={this.submitProfileChanges}>
          <div className="dashboardNameInput">
            <h4>name</h4>
            <input
              required
              type="text"
              className="name"
              onChange={e => {
                this.setState({nameField: e.target.value})
              }}
              value={this.state.nameField} />
          </div>

          <div className="dashboardEmailInput">
            <h4>email</h4>
            <input
              required
              type="text"
              className="email"
              onChange={e => {
                this.setState({emailField: e.target.value})
              }}
              value={this.state.emailField} />
          </div>

          <div className="dashboardPasswordInput">
            <h4>change password</h4>
            <input
              id="newPassword"
              type="password"
              className="name"
              placeholder="new password"
              onChange={e => {
                this.setState({passwordField: e.target.value})
              }}
              value={this.state.passwordField ? this.state.passwordField : ''} />
            <br />
            <br />
            <input
              id="confirmNewPassword"
              type="password"
              className="name"
              placeholder="confirm password"
              onChange={e => {
                this.setState({confirmPasswordField: e.target.value})
              }}
              value={this.state.confirmPasswordField ? this.state.confirmPasswordField : ''} />
          </div>
          <button type="submit" className="dashboardFormBtn">
            Save Changes
          </button>
        </form>
      </div>
    )
  }
}

// 
// 
//      dashboard onChange event functions
//     this.changeProfileName = this.changeProfileName.bind(this);
//     this.changeProfileEmail = this.changeProfileEmail.bind(this);
//     this.changeProfilePassword = this.changeProfilePassword.bind(this);
//     this.submitProfileChanges = this.submitProfileChanges.bind(this);