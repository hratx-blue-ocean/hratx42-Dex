import React from 'react'
import { Button, Form } from 'react-bootstrap';
import global from '../../utils/global';
import http from '../../services/http'

export default class ProfileEditForm extends React.Component {
  constructor(props) {
    console.log('props', props);
    super(props)
    this.state = {
      id: props.user.id,
      nameField: props.user.name,
      emailField: props.user.email,
      passwordField: null
    }
    this.submitProfileChanges = this.submitProfileChanges.bind(this)
  }

  submitProfileChanges(e) {
    e.preventDefault();
    http.users
      .put(
        this.state.id,
        this.state.nameField,
        this.state.emailField,
        this.state.passwordField
      )
      .then(user => {
        global.setState({ user })
      })
      .catch(err => console.log('Error: ', err));
  }

  render() {
    console.log(this.state);
    return (
      <div className="dashboardProfileForm" >
        <h2>edit profile</h2>
        <form onSubmit={this.submitProfileChanges}>
          <div className="dashboardNameInput">
            <h4>name</h4>
            <input
              type="text"
              className="name"
              onChange={e => {
                this.setState({ nameField: e.target.value })
              }}
              value={this.state.nameField} />
          </div>

          <div className="dashboardEmailInput">
            <h4>email</h4>
            <input
              type="text"
              className="email"
              onChange={e => {
                this.setState({ emailField: e.target.value })
              }}
              value={this.state.emailField} />
          </div>

          <div className="dashboardPasswordInput">
            <h4>password</h4>
            <input
              type="password"
              className="name"
              placeholder="password"
              onChange={e => {
                this.setState({ passwordField: e.target.value })
              }}
              value={this.state.passwordField} />
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