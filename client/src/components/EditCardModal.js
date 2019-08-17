import React, { useState } from "react";
import { Button, Modal, Container, Row, Col, Form} from 'react-bootstrap';

import table from '../../utils/table'



export default function CardModal({closeModal, showMe, card, deckTitle, deckNames, editCard, users, labels, deckIndex, cardIndex}) {

  let holdDate
  if (!card.due_date) {
    holdDate= new Date().toISOString().slice(0,10)
  } else {
    holdDate = card.due_date.slice(0,10)
  }


  const [show, setShow] = useState(false);
  const handleClose = () => closeModal()
  const [effort, setEffort] = useState(card.weight);
  const [impact, setImpact] = useState(card.impact);
  const [title, setTitle] = useState(card.title);
  const [players, setPlayers] = useState([...card.cards_members]);
  const [tags, setTags] = useState([...card.card_labels]);
  // add DUE DATE!
  const [dueDate, setDate] = useState(holdDate);
  const [deck, setDeck] = useState(deckTitle);
  const [desc, setDesc] = useState(card.description);


  return (

    <div>
      <Modal size="lg" show={showMe} onHide={handleClose}>
        <Modal.Header closeButton> <Modal.Title>Edit Card</Modal.Title></Modal.Header>
        <Modal.Body >
          <Form>
            <div className="row">
              <div className="col-6">
                {/* Title */}
                <Form.Group className="row">
                  <Form.Control as="textarea" rows="1" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Enter Title" />
                </Form.Group>
                {/* Description */}
                <Form.Group className="row">
                  <Form.Control as="textarea" rows="8" value={desc} onChange={(event) => setDesc(event.target.value)} placeholder="description" required />
                </Form.Group>
                {/* Due Date */}
                <Form.Group className="row">
                  <Form.Control type="date"
                    name="due date"
                    value={dueDate}
                    onChange={(event) => setDate(event.target.value)}
                    min={new Date()} ></Form.Control>
                </Form.Group>
              </div>
              {/* Priority */}
              <div className="col-6">
                <div className="row">
                  <Form.Group className="col-6">
                    <Form.Label>Priority</Form.Label>
                    <Form.Control as="select">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Form.Control>
                  </Form.Group>
                  {/* Effort */}
                  <Form.Group className="col-6">
                    <Form.Label>Effort</Form.Label>
                    <Form.Control as="select">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Form.Control>
                  </Form.Group>
                </div>
                <Form.Group>
                  <Form.Label className="row" style={{ marginLeft: '70px' }}>Deck</Form.Label>
                  <Form.Control as="select" onChange={(event) => setDeck(event.target.value)}>
                    <option>{deckTitle}</option>
                    {deckNames.map(name => {
                      return (
                        <option>{name.title}</option>
                      )
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="row">Tags</Form.Label>
                  <Form.Control as="select" onChange={(event) => {
                    let labelsHolder = tags
                    let selectLabel = event.target.value
                    let targetLabel = { color: null, label_name: selectLabel }
                    labelsHolder.push(targetLabel)
                    setTags(labelsHolder)
                  }}>
                    {labels.map(label => {
                      return (
                        <option >{label.label_name}</option>
                      )
                    })}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="row">
                  <Form.Label>Players</Form.Label>
                  <Form.Control as="select"
                    onChange={(event) => {
                      let playerHolder = players
                      let selectPlayer = event.target.value
                      let targetPlayer = { member_id: null, member_name: selectPlayer }
                      playerHolder.push(targetPlayer)
                      setPlayers(playerHolder)
                    }}>
                    <option></option>
                    {users.map(user => {
                      return (
                        <option>{user.name}</option>
                      )
                    })}
                  </Form.Control>
                </Form.Group>
              </div>
            </div>
          </Form>
        </Modal.Body >
        <Modal.Footer>
          {/* Button to Submit */}
          <Button onClick={(event) => {
            let cardInfo={id: card.id, eff:effort, imp:impact, titl:title, description:desc, due: dueDate}
            editCard(players, tags, deck, cardInfo, deckIndex, cardIndex)
            // newCardData(effort, impact, title, players, tags, dueDate, deck, desc)
            handleClose()
          }} disabled={!(desc && title)} variant="success">Save Changes</Button>
        </Modal.Footer>
      </Modal >
    </div >
  )
}
  ////////////////////////////////////////////////////////////////////
  
    