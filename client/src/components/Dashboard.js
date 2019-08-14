import React from 'react';
import { userInfo } from 'os';

export default function Dashboard(props) {
  return (
    <div className="dashboardContainer">
      {/* edit profile area */}
      <div className="dashboardProfileForm" >
        <h2>edit profile</h2>
        <form>
          <div className="dashboardNameInput">
            <h4>name</h4>
            <input type="text" className="name" placeholder={props.user.name} onChange={e => {props.changeProfileName(e)}} value={props.editProfileName} />
          </div>

          <div className="dashboardEmailInput">
            <h4>email</h4>
            <input type="email" className="email" placeholder={props.user.email} onChange={e => {props.changeProfileEmail(e)}} value={props.editProfileEmail} />
          </div>

          <div className="dashboardPasswordInput">
            <h4>password</h4>
            <input type="password" className="name" placeholder="password" onChange={e => {props.changeProfilePassword(e)}} value={props.editProfilePassword} />
          </div>
          <button type="submit" className="dashboardFormBtn" onClick={() => {props.submitProfileChanges()}}>save changes</button>
        </form>
      </div>

      {/* tables */}
      <div className="dashboardTables">
        <h2>your tables</h2>
        <div className="dashboardTablesContainer">
          {props.tables.map(table =>
            <ul>
                <li>
                  <a href={`http://localhost:8000/table`}>
                  <div className="newTable">
                    <h5>{table.name}</h5>
                  </div>
                  </a>
                </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}