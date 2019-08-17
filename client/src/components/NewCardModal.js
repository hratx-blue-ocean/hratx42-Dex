import React, { useState } from "react";
import { Button, Modal, Container, Row, Col, Form} from 'react-bootstrap';


export default function CardModal({closeModal, card, deckTitle, showMe, deckNames, newCardData, users, labels}) {
  const [show, setShow] = useState(false);

  const [effort, setEffort] = useState(5);
  const [impact, setImpact] = useState(3);
  const [title, setTitle] = useState();
  const [players, setPlayers] = useState([]);
  const [tags, setTags] = useState([]);
  const [dueDate, setDate] = useState('mm-dd-yyyy');
  const [deck, setDeck] = useState(deckTitle);
  const [desc, setDesc] = useState();

  const handleClose = () => closeModal()
//   const handleShow = () => setShow(true);

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
          <input  max={21} min={1} placeholder={5} type="number" onBlur={(event)=> setEffort(event.target.value)} style={styles.effImpInputBox}/>
          </Col>
          <Col xs={1} style={styles.effortImpactInput}>
          <input max={21} min={1} placeholder={3} type="number" onBlur={(event)=> setImpact(event.target.value)} style={styles.effImpInputBox}/>
          </Col>
          {/* title input area */}
          <Col xs={10} style={styles.titleStyle}>
                        <Form style={{width: '100%'}}>
              <Form.Group sm={8} controlId="exampleForm.ControltitleArea">
                {/* <Form.Label>Description</Form.Label> */}
                <Form.Control as="textarea" rows="1" onBlur={(event)=> setTitle(event.target.value)} placeholder="title" />
              </Form.Group>
              </Form>
          </Col>
        </Row>

        {/* Main Area*/}
            {/* Conent Page*/}
        <Row>
          <Col style={styles.mainContent}>
            <Row xs={8}>
              {/* titles of Players and Tags */}
                <Col xs={8}style={styles.playersTagsTitles}>
                  <div style={{fontWeight: 800}}>Players</div>
                </Col>

                <Col xs={4} style={styles.playersTagsTitles}>
                  <div style={{fontWeight: 800}}>Tags</div>
                </Col>

        </Row>
            {/* content of players and tags */}
        <Row>
                {/* ADD PLAYERS */}
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

            {/* ADD TAGS/LABELS */}
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
            {/* Return ALL PLAYERS and LABELS/TAGS */}
        <Row>
                  <Col xs={8} style={styles.playersStyle}>
                    {players.map((player,i) =>{
                    return (
                        <div onClick={()=>{
                          console.log(players)
                         let hold = players
                         delete hold[i]
                         setPlayers(hold) 
                        }}>{player.member_name}</div>
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
                <Form.Control as="textarea" rows="8" onBlur={(event)=> setDesc(event.target.value)} placeholder="description" required/>
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
              name="due date"
              value = {dueDate}
              onChange={(event)=> setDate(event.target.value)}
              min={new Date()} />
            </Row>
            {/* <Row style={styles.addToCardTrait}>
                <input placeholder="gitLink" style={{width:'100%'}}/> 
            </Row> */}
            <Row style={styles.addToCardTrait}>
            <select style={{width:'100%'}}  onChange={(event)=> setDeck(event.target.value)}>
              <option>{deckTitle}</option>
            {deckNames.map(name =>{
                return (
                    <option>{name.title}</option>
                )
            })}
            </select>
            </Row>
            {/* <Row style={styles.addToCardTrait}>Completed</Row> */}
          </Col>
        </Row>

        {/* Button to Submit */}
        <Row style={styles.submitButton}>
            <Button onClick={(event)=> {
                let cardInfo={eff:effort, imp:impact, titl:title, description:desc, due: dueDate}

                newCardData(players, tags, deck, cardInfo)
                // newCardData(effort, impact, title, players, tags, dueDate, deck, desc)
                handleClose()
            }} disabled={!(desc && title)} variant="primary">Submit</Button>
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
    // "border": "1px solid black",
    width:'100%'
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