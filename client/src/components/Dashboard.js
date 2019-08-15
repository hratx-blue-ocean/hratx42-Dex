import React from 'react';
import { NavLink } from "react-router-dom";
import { userInfo } from 'os';
import ProfileEditForm from './ProfileEditForm.jsx';

export default function Dashboard(props) {
  return (
    <div className="dashboardContainer">
      <ProfileEditForm user={props.user} />
      {/* tables */}
      <div className="dashboardTables">
        <h2>your tables</h2>
        <div className="dashboardTablesContainer">
          {props.tables.map(table =>
            <ul>
                <li >
                  <div onClick={() => props.history.push(`/table/${table.id}`)} className="newTable">
                    <h5>{table.name}</h5>
                  </div>
                </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}