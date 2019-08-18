import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import ProfileEditForm from './ProfileEditForm.jsx';
import {Row,Col, Button, Card } from "react-bootstrap";
import DashboardCards from './DashboardCards.js';
import Deck from './Deck';
import CardThumbnails from './CardThumbnails';
import TableThumbnail from './TableThumbnail';

export default function Dashboard(props) {
  const [showProfile, setShowProfile] = useState(false);
  const hideProfile = () => {
    setShowProfile(false);
  }
  let pastDueCards = [];
  let dueSoonCards = [];
  let currentDate = new Date().toISOString().split('T')[0];
  if (props.cards.length){
    for (let i = 0; i < props.cards.length; i++){
      if ((new Date(props.cards[i].due_date)) - new Date(currentDate) < 0){
        pastDueCards.push(props.cards[i])
      } else if ((new Date(props.cards[i].due_date)) - new Date(currentDate) < 86400000){
        dueSoonCards.push(props.cards[i])
      }
    }
  }
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
          <div id="deckHeader" style={{ width: '100%' }}><span className="deckTitle">{props.user.name}'s Past due cards</span>
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
              {pastDueCards.map((singleCard, cardIndex) =>
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