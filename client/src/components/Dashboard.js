import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import ProfileEditForm from './ProfileEditForm.jsx';
import {Row,Col, Button, Card } from "react-bootstrap";
import DashboardCards from './DashboardCards.js'

export default function Dashboard(props) {
  const [showProfile, setShowProfile] = useState(false);
  const hideProfile = () => {
    setShowProfile(false);
  }
  return (
    <Row className="dashboardContainer">
      <Col xl lg md sm xs={3} >
        {showProfile ? (
          <ProfileEditForm hideProfile={hideProfile.bind(this)} userId={props.userId} user={props.user} />
        ) : (
          <div style = {{width: '350px', height: '450px'}}>
            <Card>
              <div style = {{fontSize: '30px'}}>Welcome back to your dashboard, {props.user.name}</div>
              <hr/>
              <div>Please refer to our <span style = {{textDecoration: 'underline'}}>TOS</span> for any questions</div>
              <hr/>
              <div>Tables you are a member of: {props.tables.length}</div>
              <div>Total Cards owned: {props.cards.length}</div>
              <div>Cards per Table Average: {props.tables.length/5}</div>
              <Button onClick = {() => setShowProfile(true)}>Edit Profile</Button>
            </Card>
          </div>
        )}
      </Col>
      {/* tables */}
      <Col xl lg md sm xs={9} className="dashboardTables">
        <Card>
          <h2>{props.user.name}'s Tables</h2>
            <div className="dashboardTablesContainer">
              {props.tables.map((table, index) =>
                <ul key = {Math.random()}>
                    <li>
                      <div style = {{
                        backgroundImage: `url(/assets/card${index%4}.${index % 2 === 0 ? 'jpg' : 'png'})`,
                        height: '250px',
                        width: '175px',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center center',
                        opacity: '0.6'
                        }} 
                        onClick={() => props.history.push(`/table/${table.id}`)} className="newTable">
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
              <div>
              {props.cards.map((singleCard, cardIndex) =>
              <div key={Math.random()}>
                <div style={{ paddingLeft: '160px' }}></div>

                <DashboardCards deckIndex={props.deckIndex}
                  cardIndex={cardIndex}
                  singleCard={singleCard}
                  user = {props.user.name}
                  labels={props.labels} />
              </div>
            )}
              </div>
          </div>
        </Card>
      </Col>
    </Row>
  )
}