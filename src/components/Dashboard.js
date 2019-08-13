import React from 'react';
import '../dashboardStyles/dashboardStyle.css';

export default function Dashboard(props) {
  return (
    // test
    <div className="dashboardContainer">
      {/* edit profile area */}
      <div className="dashboardProfileForm" >
        <h2>edit profile</h2>
        <form>
          <div className="dashboardNameInput">
            <h2>name</h2>
            <input type="text" className="name" placeholder="name" />
          </div>

          <div className="dashboardEmailInput">
            <h2>email</h2>
            <input type="email" className="email" placeholder="email" />
          </div>

          <div className="dashboardPasswordInput">
            <h2>password</h2>
            <input type="text" className="name" placeholder="password" />
          </div>
          <button type="submit" className="dashboardFormBtn">save changes</button>
        </form>
      </div>

      {/* tables */}
      <div className="dashboardTables">
        <h2>your tables</h2>
        <div className="dashboardTablesContainer">
          {props.boards.map(board =>
            <ul>
                <li>
                  <div className="newTable">
                    {board}
                  </div>
                </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
