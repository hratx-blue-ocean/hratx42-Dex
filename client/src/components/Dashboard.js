import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import { userInfo } from 'os';
import ProfileEditForm from './ProfileEditForm.jsx';
import { Button, Card } from "react-bootstrap";

export default function Dashboard(props) {
  const images = ['http://bizcardtemplates.com/wp-content/uploads/2017/09/Landscape-Business-Card-Background-27.jpg', 'https://cdn.pixabay.com/photo/2015/12/19/18/47/decoration-1100137_960_720.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZEZJc-78-rYSHrZqh_T_M7qkEzHIHBsVSLKHpAU6UbWNnzUUa', 'https://png.pngtree.com/thumb_back/fh260/back_pic/04/32/47/035843e833dd111.jpg']
  const [showProfile, setShowProfile] = useState(false);
  console.log(props.state)
  return (
    <div className="dashboardContainer">
      <div>
        {showProfile ? (
          <ProfileEditForm userId={props.userId} user={props.user} />
        ) : (
          <div style = {{width: '350px', height: '450px'}}>
            <Card>
              <div style = {{fontSize: '30px'}}>Welcome back to your dashboard, {props.user.name}</div>
              <hr/>
              <div>Please refer to our <span style = {{textDecoration: 'underline'}}>TOS</span> for any questions</div>
              <hr/>
              <div>Tables you are a member of: {props.tables.length}</div>
              <div>Total Cards owned: 5</div>
              <div>Cards per Table Average: {props.tables.length/5}</div>
              <Button onClick = {() => setShowProfile(true)}>Edit Profile</Button>
            </Card>
          </div>
        )}
      </div>
      {/* tables */}
      <div className="dashboardTables">
        <Card>
          <h2>{props.user.name}'s Tables</h2>
            <div className="dashboardTablesContainer">
              {props.tables.map((table, index) =>
                <ul key = {Math.random()}>
                    <li>
                      <div style = {{backgroundImage: `url(${images[index % 4]})`}} onClick={() => props.history.push(`/table/${table.id}`)} className="newTable">
                        <h5>{table.name}</h5>
                      </div>
                    </li>
                </ul>
              )}
            </div>
        </Card>
        <div style = {{height: '50px'}}></div>
        <Card>
          <div>
            <h2>{props.user.name}'s Cards</h2>

          </div>
        </Card>
      </div>
    </div>
  )
}