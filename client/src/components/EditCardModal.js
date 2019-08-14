import React, { useState } from "react";
import { Button, Modal, Container, Row, Col, Form} from 'react-bootstrap';


export default function CardModal({closeModal, showMe, card, deckTitle, deckNames, editCard}) {
  const [show, setShow] = useState(false);
  const handleClose = () => closeModal()

  const [effort, setEffort] = useState(card.card_weight);
  const [impact, setImpact] = useState(card.card_impact);
  const [title, setTitle] = useState(card.card_title);
  const [player, setPlayer] = useState();
  const [tags, setTags] = useState();
  const [dueDate, setDate] = useState(card.card_created);
  const [deck, setDeck] = useState(deckTitle);
  const [desc, setDesc] = useState(card.card_description);


  console.log(deckTitle)
  return (
  <>
  <Modal size="lg" show={showMe} onHide={handleClose}>
    <Container>
    {/* {console.log(card)} */}

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
          <input max={21} min={1} placeholder={card.card_weight} onBlur={(event)=> setEffort(event.target.value)}  type="number" style={styles.effImpInputBox}/>
          </Col>
          <Col xs={1} style={styles.effortImpactInput}>
          <input max={21} min={1} placeholder={card.card_impact} onBlur={(event)=> setImpact(event.target.value)} type="number" style={styles.effImpInputBox}/>
          </Col>
          {/* title input area */}
          <Col xs={10} style={styles.titleStyle}>
            <Form style={{width: '100%'}}>
              <Form.Group sm={8} controlId="exampleForm.ControltitleArea">
                <Form.Control as="textarea" placeholder={card.card_title} onBlur={(event)=> setTitle(event.target.value)} rows="1"/>
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
                <Col style={styles.playersTagsTitles}>
                  <div style={{fontWeight: 800}}>Players</div>
                </Col>
                <Col style={styles.playersTagsTitles}>
                  <div style={{fontWeight: 800}}>Tags</div>
                </Col>
            </Row>
            {/* LIST OF ALL POSSIBLE players and tags */}
            <Row>
                  <Col style={styles.playersStyle}>
                    <select onChange={()=> setPlayer(event.target.value) }>
                      <option></option>
                      <option value="Miles">Miles</option>
                      <option value="Michael">Michael</option>
                      <option value="DJ">DJ</option>
                    </select>
                  </Col>
                  <Col style={styles.tagsStyle}>
                  <select onChange={(event)=> setTags(event.target.value) }>
                      <option></option>
                      <option value="Git">Git</option>
                      <option value="FrontEnd">FrontEnd</option>
                      <option value="BackEnd">BackEnd</option>
                    </select>
                  </Col>
            </Row>
            {/* Return list of names and labels */}
            <Row>
                  <Col style={styles.playersStyle}>
                    
                    {card.cards_members.map(name =>{
                    return (
                        <div>{name.member_name}</div>
                    )
                     })}
                  </Col>
                  <Col style={styles.tagsStyle}>

                  {card.card_labels.map(label =>{
                    return (
                        <div style={{color: `${label.color}`}}>{label.label_name}</div>
                    )
                     })}

                  </Col>
            </Row>
            {/* Text Input Area */}
            <Row>
              <Form style={{width: '100%', paddingTop:10}}>
              <Form.Group sm={8} controlId="exampleForm.ControlTextarea1">
                {/* <Form.Label>Description</Form.Label> */}
                <Form.Control as="textarea" rows="8" placeholder={card.card_description} onBlur={(event)=> setDesc(event.target.value)}/>
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
              <input placeholder="date due" placeholder={card.card_created} onBlur={(event)=> setDate(event.target.value)} style={{width:'100%'}}/> 
            </Row>
            {/* <Row style={styles.addToCardTrait}>
                <input placeholder="gitLink"  value={card.gitLink}style={{width:'100%'}}/> 
            </Row> */}
            <Row style={styles.addToCardTrait}>
            <select style={{width:'100%'}} onChange={(event)=> setDeck(event.target.value)}>
              <option>`${deckTitle}`</option>
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
        <Row style={styles.submitButton}>
        <Button onClick={(event)=> {
            editCard(card.card_id, deckNames.id, effort, impact, title, player, tags, dueDate, deck, desc)
        }} variant="primary">Submit</Button>
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
    