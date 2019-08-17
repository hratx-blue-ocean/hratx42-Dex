import React, { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
export default function CardModal({ closeModal, card, deckTitle, showMe, deckNames, newCardData, users, labels }) {
  const [show, setShow] = useState(false);
  let holdDeckTitle
  if (!deckTitle) {
    holdDeckTitle = ''
  } else {
    holdDeckTitle = deckTitle
  }
  const [effort, setEffort] = useState(5);
  const [impact, setImpact] = useState(3);
  const [title, setTitle] = useState();
  const [players, setPlayers] = useState([]);
  const [tags, setTags] = useState([]);
  const [dueDate, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [deck, setDeck] = useState(holdDeckTitle);
  const [desc, setDesc] = useState();
  const handleClose = () => closeModal()
  //   const handleShow = () => setShow(true);
  return (
    <div>
      <Modal size="lg" show={showMe} onHide={handleClose}>
        <Modal.Header closeButton> <Modal.Title>Create Card</Modal.Title></Modal.Header>
        <Modal.Body >
          <Form>
            <div className="row">
              <div className="col-6">
                {/* Title */}
                <Form.Group className="row">
                  <Form.Control as="textarea" rows="1" onBlur={(event) => setTitle(event.target.value)} placeholder="Enter Title" />
                </Form.Group>
                {/* Description */}
                <Form.Group className="row">
                  <Form.Control as="textarea" rows="8" onBlur={(event) => setDesc(event.target.value)} placeholder="description" required />
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
            let cardInfo = { eff: effort, imp: impact, titl: title, description: desc, due: dueDate }
            newCardData(players, tags, deck, cardInfo)
            // newCardData(effort, impact, title, players, tags, dueDate, deck, desc)
            handleClose()
          }} disabled={!(desc && title)} variant="success">Create</Button></Modal.Footer>
      </Modal >
    </div >
  )
}