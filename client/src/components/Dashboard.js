import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import ProfileEditForm from './ProfileEditForm.jsx';
import {Row,Col, Button, Card } from "react-bootstrap";
import DashboardCards from './DashboardCards.js';
import Deck from './Deck';
import CardThumbnails from './CardThumbnails';
import TableThumbnail from './TableThumbnail';

export default function Dashboard(props) {
  const images = ['http://bizcardtemplates.com/wp-content/uploads/2017/09/Landscape-Business-Card-Background-27.jpg', 'https://cdn.pixabay.com/photo/2015/12/19/18/47/decoration-1100137_960_720.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZEZJc-78-rYSHrZqh_T_M7qkEzHIHBsVSLKHpAU6UbWNnzUUa', 'https://png.pngtree.com/thumb_back/fh260/back_pic/04/32/47/035843e833dd111.jpg']
  const [showProfile, setShowProfile] = useState(false);
  const hideProfile = () => {
    setShowProfile(false);
  }
  console.log(props.cards)
  {/* <div>Tables you are a member of: {props.tables.length}</div>
              <div>Total Cards owned: {props.cards.length}</div>
              <div>Cards per Table Average: {props.tables.length/5}</div>
                <DashboardCards deckIndex={props.deckIndex}
                  cardIndex={cardIndex}
                  singleCard={singleCard}
                  user = {props.user.name}
                  labels={props.labels} /> */}
  return (
    <div className = 'dashboardMain'>
      <div id="deckWrapper">
        <div id="dashboardContent" style={{ width: '75%' }} >
          <div id="deckHeader" style={{ width: '100%' }}><span className="deckTitle">{props.user.name}'s Tables</span>
            <div style={{ float: 'right' }}>
              <Button
                className="deckEditBtn"
                variant='link'
                onClick={() => setShowEditDeck(true)}
              >
              ...
              </Button>
            </div>
          </div>
          <div id="deckScrollbar">
            <Card.Body className='dashboardrow row'>
              {props.tables.map((table, index) =>
                <div key={Math.random()}>
                  <div style={{ paddingLeft: '160px' }}></div>
                  <TableThumbnail 
                              index = {index}
                              tableName = {table.name} 
                              />
                </div>
              )}
              <div style={{ paddingLeft: '20px' }} />
            </Card.Body>
          </div>
        </div>
        <div>
      </div>
      </div>

      <div id="deckWrapper">
        <div id="dashboardContent" style={{ width: '75%' }} >
          <div id="deckHeader" style={{ width: '100%' }}><span className="deckTitle">{props.user.name}'s Cards due today</span>
            <div style={{ float: 'right' }}>
              <Button
                className="deckEditBtn"
                variant='link'
                onClick={() => setShowEditDeck(true)}
              >
              ...
              </Button>
            </div>
          </div>
          <div id="deckScrollbar">
            <Card.Body className='dashboardrow row'>
              {props.cards.map((singleCard, cardIndex) =>
                <div key={Math.random()}>
                  <div style={{ paddingLeft: '160px' }}></div>
                  <DashboardCards 
                      deckIndex={props.deckIndex}
                      cardIndex={cardIndex}
                      singleCard={singleCard}
                      user = {props.user.name}
                      labels={props.labels} />
                </div>
              )}
              <div style={{ paddingLeft: '20px' }} />
            </Card.Body>
          </div>
        </div>
        <div>
      </div>
      </div>
    </div>
    
              
  )
}