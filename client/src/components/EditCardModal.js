import React, { useState } from "react";
import { Button, Modal, Container, Row, Col, Form} from 'react-bootstrap';

import table from '../../utils/table'



export default function CardModal({closeModal, showMe, card, deckTitle, deckNames, editCard, users, labels}) {


  const [show, setShow] = useState(false);
  const handleClose = () => closeModal()
  const [effort, setEffort] = useState(card.weight);
  const [impact, setImpact] = useState(card.impact);
  const [title, setTitle] = useState(card.title);
  const [players, setPlayers] = useState(card.cards_members);
  const [tags, setTags] = useState(card.card_labels);
  // add DUE DATE!
  const [dueDate, setDate] = useState(new Date());
  const [deck, setDeck] = useState(deckTitle);
  const [desc, setDesc] = useState(card.description);


  return (

  <>
  <Modal size="lg" show={showMe} onHide={handleClose}>
    <Container>

        {/* TITLES FOR Header Container for effort, impact, title, and exit */}
        <Row xs={12} style={styles.headerRow}>
          <Col xs={1} style={styles.effortImpactTitle}>
            <div style={{fontSize:11}}>Effort</div>
          </Col>
          <Col xs={1} style={styles.effortImpactTitle}>
            <div style={{fontSize:11}}>Impact</div>
          </Col>
          <Col xs={8} style={styles.titleStyle}>
            <div style={{width: '100%' , paddingTop:5}}></div>
          </Col>
          <Col xs={2} style={{justifyContent:'center'}}>
                <Modal.Header closeButton>  </Modal.Header>
          </Col>
        </Row>
        {/* CONTENT FOR Header Container for effort, impact, title, and exit */}
        <Row xs={12} style={styles.headerRow}>
          <Col xs={1} style={styles.effortImpactInput}>
          <input max={21} min={1} placeholder={card.weight} onBlur={(event)=> setEffort(event.target.value)}  type="number" style={styles.effImpInputBox}/>
          </Col>
          <Col xs={1} style={styles.effortImpactInput}>
          <input max={21} min={1} placeholder={card.impact} onBlur={(event)=> setImpact(event.target.value)} type="number" style={styles.effImpInputBox}/>
          </Col>
          {/* title input area */}
          <Col xs={10} style={styles.titleStyle}>
            <Form style={{width: '100%'}}>
              <Form.Group sm={8} controlId="exampleForm.ControltitleArea">
                <Form.Control as="textarea" placeholder={card.title} onBlur={(event)=> setTitle(event.target.value)} rows="1"/>
              </Form.Group>
            </Form>
          </Col>
        </Row>

        {/* Main Area*/}
            {/* Conent Page*/}
        <Row>
          <Col xs={8} style={styles.mainContent}>
            <Row>
              {/* titles of Players and Tags */}
                <Col xs={8} style={styles.playersTagsTitles}>
                  <div style={{fontWeight: 800}}>Players</div>
                </Col>
                <Col xs={4} style={styles.playersTagsTitles}>
                  <div style={{fontWeight: 800}}>Tags</div>
                </Col>
            </Row>
            {/* LIST OF ALL POSSIBLE players and tags */}
            <Row>
                  <Col xs={8} style={styles.playersStyle}>
                    <select onChange={(event)=> {
                        let playerHolder = players
                        let selectPlayer = event.target.value  
                        let targetPlayer ={member_id: null, member_name: selectPlayer}
                        playerHolder.push(targetPlayer)
                        setPlayers(playerHolder)
                    }}>
                      <option></option>
                      {users.map(user =>{
                            return (
                            <option>{user.name}</option>
                            )
                        })}
                    </select>
                  </Col>
                  {/* LABEL CHOOSE */}
                  <Col xs={4} style={styles.playersStyle}>
                  <select onChange={(event)=> {
                        let labelsHolder = tags
                        let selectLabel = event.target.value  
                        let targetLabel ={color: null, label_name: selectLabel}
                        labelsHolder.push(targetLabel)
                        setTags(labelsHolder)
                    }}>
                        <option></option>
                        {labels.map(label =>{
                            return (
                            <option >{label.label_name}</option>
                            )
                        })}
                    </select>
                  </Col>
            </Row>
            {/* Return list of names and labels */}
            <Row>
                  <Col xs={8} style={styles.playersStyle}>
                    {players.map(player =>{
                    return (
                        <div>{player.member_name}</div>
                    )
                     })}
                  </Col>
                  <Col xs={4} style={styles.tagsStyle}>
                    {tags.map(tag =>{
                      return (
                          <div onClick={()=>{
                              let curTags = tags
                          }}>{tag.label_name}</div>
                      )
                      })}
                  </Col>
            </Row>
            {/* Text Input Area */}
            <Row>
              <Form style={{width: '100%', paddingTop:10}}>
              <Form.Group sm={8} controlId="exampleForm.ControlTextarea1">
                {/* <Form.Label>Description</Form.Label> */}
                <Form.Control as="textarea" rows="8" placeholder={card.description} onBlur={(event)=> setDesc(event.target.value)}/>
              </Form.Group>
              </Form>
            </Row>
          </Col>

        {/* Header Container for effort, impact, title, and exit */}
          <Col xs={4} style={styles.addToCardCol}>
            <Row style={styles.addToCardTitle}>
              <div>Add To Card</div>
            </Row>
            <Row style={styles.addToCardTrait}>
              {/* <input placeholder="date due" placeholder='Due Date' onBlur={(event)=> setDate(event.target.value)} style={{width:'100%'}}/>  */}
              <input type="date" 
              id="start" 
              name="due dates"
              value = {dueDate}
              onChange={(event)=> setDate(event.target.value)}
              min={new Date()} />
            </Row>
            {/* <Row style={styles.addToCardTrait}>
                <input placeholder="gitLink"  value={card.gitLink}style={{width:'100%'}}/> 
            </Row> */}
            <Row style={styles.addToCardTrait}>
            <select style={{width:'100%'}} onChange={(event)=> setDeck(event.target.value)}>
              <option>{deckTitle}</option>
              {deckNames.map(name =>{
                if (name.title !== deckTitle) {
                  return (
                    <option>{name.title}</option>
                  )
                }
                })}
            </select>
            </Row>
            {/* <Row style={styles.addToCardTrait}>Completed</Row> */}
          </Col>
        </Row>

        {/* Button to Submit */}
        <Row xs={12} style={styles.submitButton}>
          <Col xs={10}>
            <Button onClick={(event)=> {
                let cardInfo={id: card.id, eff:effort, imp:impact, titl:title, description:desc, due: dueDate}
                editCard(players, tags, deck, cardInfo)
                handleClose()
            }} variant="primary">Submit</Button>
          </Col>
          <Col xs={2}>
            <Button variant="danger" onClick={() => { table.deleteCardById(card.id) }}>Delete</Button>
          </Col>
        </Row>
    </Container>
  </Modal>
  </>
  )
}


const styles = {
  //Header Row effort, impact, title, exit
  headerRow: {
    // "border": "1px solid black",
    height:'auto'
  },
  effortImpact: {
    // "border": "1px solid black"
    // paddingTop: 20
  },
  effortImpactTitle: {
    // border: "1px solid black",
    justifyContent: 'center',
    paddingTop:35,
  },
  effortImpactInput: {
    // border: "1px solid black",
  },
  effImpInputBox: {
    width:40,
    height: 20,
    // oninput:"this.value=this.value.replace(/[^0-9]/g,'');"

  },
  exitButton: {
    fontWeight:1000,
    fontSize: 20,
    paddingLeft:15,
  },

  titleStyle: {
    // "border": "1px solid black"
  },


  //Content Column Row
  mainContent: {
    // "border": "1px solid black"
  },
  playersTagsTitles: {
    // "border": "1px solid black"
  },
  playersStyle: {
    // "border": "1px solid black"
  },
  tagsStyle: {
    // "border": "1px solid black"
  },
  textBoxStyle: {
    align: "top",
    height:'100px',
    placeholder: "description..."
  },



//add specific content column for card 
  addToCardCol: {
    // border: "1px solid black",
  },
  addToCardTitle: {
    justifyContent: 'center'
  },
  addToCardTrait: {
    // border: "1px solid black",
    paddingLeft: 5,
    paddingTop: 5
  },

//buttonRow
  submitButton: {
    paddingLeft: 10,
    paddingBottom: 10,
  }
}
    