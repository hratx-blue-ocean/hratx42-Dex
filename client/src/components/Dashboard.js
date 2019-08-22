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
      {/* tables */}
      <Col xl lg md sm xs={9} className="dashboardTables">
        <Card style = {{ border: "none" }}>
          <div style = {{ textAlign: "center", paddingBottom: "15px" }}><h1>Welcome back, {props.user.name}</h1></div>
          <h2>Your Tables</h2>
          <hr style = {{ marginTop: "8px" }}/>
            <div className="dashboardTablesContainer">
              {props.tables.map((table, index) => {
                const randCard = Math.floor(Math.random() * 4);
                return (
                  <ul key = {Math.random()}>
                      <li className = 'hoverCard' style = {{position: 'relative'}}>
                        <div className = 'front'>
                          <div style={{ position: "relative", top: "2em", overflow: "hidden", height: "250px", width: "170px", textAlign: "center"}} >
                            <h3>{table.name.length < 40 ? table.name : table.name.slice(0, 40) + "..."}</h3>
                          </div>
                          <div style = {{ backgroundImage: `url(/assets/card${randCard}.${randCard % 2 === 0 ? 'jpg' : 'png'})`, height: '250px', width: '175px', backgroundSize: 'cover', backgroundPosition: 'center center', opacity: '0.2', marginTop: "-250px" }} 
                            onClick={() => props.history.push(`/table/${table.id}`)} className="newTable">
                          </div>
                        </div>
                        <div className = 'back' style={{ position: "absolute", top: '0px', overflow: "hidden", height: "245px", width: "170px", textAlign: "center", backgroundSize: 'cover', backgroundPosition: 'center center', opacity: '0.2', backgroundImage: 'url(/assets/aceCard.png)'}}
                          onClick={() => props.history.push(`/table/${table.id}`)}></div>
                      {props.cardCount.length ? (<div className='back cardBackText' style={{ position: 'absolute', top: '80px', fontSize: '18px' }} onClick={() => props.history.push(`/table/${table.id}`)} >You have {props.cardCount[index].count} Cards in this deck</div>) : (<></>)}
                        
                      </li>
                  </ul>
                )}
              )}
            </div>
          {/* <Col xl lg md sm xs={3} >
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
      </Col> */}
        </Card>
        {/* <div style = {{height: '50px'}}></div> */}
        {/* <Card style={{ border: "none" }}> */}
          {/* <div>
            <h2>Your Cards</h2>
            <hr style={{ marginTop: "8px" }} />
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
          </div> */}
        {/* </Card> */}
      </Col>
    </Row>
  )
}