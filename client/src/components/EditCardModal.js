import React, { useState } from "react";
import { Button, Modal, Container, Row, Col, Form} from 'react-bootstrap';


export default function CardModal({closeModal, showMe, card, deckTitle, deckNames}) {
  const [show, setShow] = useState(false);
  const handleClose = () => closeModal()
  const handleShow = () => setShow(true);


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
          <input maxLength="2" value={card.card_weight} type="number" style={styles.effImpInputBox}/>
          </Col>
          <Col xs={1} style={styles.effortImpactInput}>
          <input maxLength="2" value={card.card_impact} type="number" style={styles.effImpInputBox}/>
          </Col>
          {/* title input area */}
          <Col xs={10} style={styles.titleStyle}>
            <Form style={{width: '100%'}}>
              <Form.Group sm={8} controlId="exampleForm.ControltitleArea">
                <Form.Control as="textarea" value={card.card_title} rows="1" placeholder="title"/>
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
                    <select>
                      <option>Miles</option>
                      <option>Michael</option>
                      <option>DJ</option>
                    </select>
                  </Col>
                  <Col style={styles.tagsStyle}>
                    <select>

                    {/* {card.labels.map(label =>{
                        return (
                            <optio n>{label}</option>
                        )
                    })} */}
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
                <Form.Control as="textarea" rows="8" value={card.card_description} placeholder="description"/>
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
              <input placeholder="date due" value={card.card_created} style={{width:'100%'}}/> 
            </Row>
            <Row style={styles.addToCardTrait}>
                <input placeholder="gitLink"  value={card.gitLink}style={{width:'100%'}}/> 
            </Row>
            <Row style={styles.addToCardTrait}>
            <select style={{width:'100%'}}>
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
        <Row style={styles.submitButton}>
            <Button variant="primary">Submit</Button>
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
    