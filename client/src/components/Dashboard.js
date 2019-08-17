import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import ProfileEditForm from './ProfileEditForm.jsx';
import {Container, Row,Col, Button, Card } from "react-bootstrap";
import DashboardCards from './DashboardCards.js'

export default function Dashboard(props) {
  const images = ['http://bizcardtemplates.com/wp-content/uploads/2017/09/Landscape-Business-Card-Background-27.jpg', 'https://cdn.pixabay.com/photo/2015/12/19/18/47/decoration-1100137_960_720.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZEZJc-78-rYSHrZqh_T_M7qkEzHIHBsVSLKHpAU6UbWNnzUUa', 'https://png.pngtree.com/thumb_back/fh260/back_pic/04/32/47/035843e833dd111.jpg']
  const [showProfile, setShowProfile] = useState(false);
  const hideProfile = () => {
    setShowProfile(false);
  }
  return (
   
    <Row style={{minHeight: '750px' ,maxHeight: '750px'}}>
      <Col xl={9} lg={9} md={9} sm={9} xs={9} style={{paddingTop:'30',backgroundColor:'#F1F0F0',border:'none'}}>
        {showProfile ? (
          <ProfileEditForm hideProfile={hideProfile.bind(this)} userId={props.userId} user={props.user} />
        ) : (
          <div style={{backgroundColor:'#F1F0F0'}}>
            <Card style={{backgroundColor:'#F1F0F0',border:'none'}}>
              <div style = {{marginTop:'40px',fontSize:'30px',textAlign:'center' }}><strong>Welcome back to your dashboard {props.user.name}</strong></div>
               </Card>
              <Card style={{backgroundColor:'#F1F0F0',border:'none',marginLeft:'auto',marginRight:'auto'}} className="dashboardTables">
            <div style={{marginLeft:'auto',marginRight:'auto'}} className="dashboardTablesContainer">
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
              {/* <div style = {{textAlign:'center' }}>Please refer to our <span style = {{textDecoration: 'underline'}}>TOS</span> for any questions</div>
              
              <div style = {{textAlign:'center' }}>Tables you are a member of: {props.tables.length}</div>
              <div style = {{textAlign:'center' }}>Total Cards owned: {props.cards.length}</div>
              <div style = {{textAlign:'center' }}>Cards per Table Average: {props.tables.length/5}</div> */}
              {/* <div style = {{textAlign:'center', borderRadius:'50%' }}><img style = {{width:'70%'}} alt=''src='/assets/circle-cropped.png' ></img></div> */}
              
           
          </div>
        )}
      </Col>
      {/* tables */} 
      <Col id='tableAndCards' xl={3} lg={3} md={3} sm={3} xs={3} className="dashboardTables" style={{paddingTop:'30',backgroundColor:'#F1F0F0'}}>
      <Button style = {{width:'30%',marginLeft:'30px',marginTop:'50px', backgroundColor:'#60BE4E'}} onClick = {() => setShowProfile(true)}>Edit Profile</Button>
      {/*
        <Card style={{backgroundColor:'#F1F0F0',border:'none'}}>
          <h2  style={{marginTop:'40px'}}>{props.user.name}'s Tables</h2>
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
        <div style={{paddingTop:'30px'}}>

        </div>
         <Card style={{minHeight: '250px' ,maxHeight: '250px',backgroundColor:'#F1F0F0'}}>
          <div style={{backgroundColor:'#F1F0F0'}}>
            <h2 style={{marginTop:'40px'}}>{props.user.name}'s Cards</h2>
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
        */}
      </Col>
    </Row>
   
  )
}