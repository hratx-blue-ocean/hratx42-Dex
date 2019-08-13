import React, { useState } from "react";
import './CardModal.css';
import { Button, Modal, Container, Row, Col, Form} from 'react-bootstrap';




export default function CardModal(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Button variant="primary" onClick={handleShow}>
    Create Card
    </Button>

  <Modal size="lg" show={show} onHide={handleClose}>
    <Container>
        {/* Header Container for effort, impact, title, and exit */}
        <Row xs={12} style={styles.headerRow}>
            <Col xs={2} style={styles.effortImpact}>2|5</Col>
            {/* title input area */}
            <Col xs={9} style={styles.titleStyle}>
              This ticket will do all of things we need it to!
            </Col>
            <Col xs={1} style={{justifyContent:''}}>
              <div style={styles.exitButton}>X</div></Col>
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
            {/* content of players and tags */}
            <Row>
                  <Col style={styles.playersStyle}>Players</Col>
                  <Col style={styles.tagsStyle}>Tags</Col>
            </Row>
            {/* Text Input Area */}
            <Row>
              <Form style={{width: '100%'}}>
              <Form.Group sm={8} controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows="8" />
              </Form.Group>
              </Form>
            </Row>
          </Col>

        {/* Header Container for effort, impact, title, and exit */}
          <Col xs={4} style={styles.addToCardCol}>
            <Row style={styles.addToCardTitle}>
              <div>Add To Card</div>
            </Row>
            <Row style={styles.addToCardTrait}>Due Date</Row>
            <Row style={styles.addToCardTrait}>Git Hub</Row>
            <Row style={styles.addToCardTrait}>Move</Row>
            <Row style={styles.addToCardTrait}>Completed</Row>
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
    "border": "1px solid black",
    "heigh": "auto"
  },
  effortImpact: {
    "border": "1px solid black"
  },
  exitButton: {
    fontWeight:1000,
  },

  titleStyle: {
    "border": "1px solid black"
  },


  //Content Column Row
  mainContent: {
    "border": "1px solid black"
  },
  playersTagsTitles: {
    "border": "1px solid black"
  },
  playersStyle: {
    "border": "1px solid black"
  },
  tagsStyle: {
    "border": "1px solid black"
  },
  textBoxStyle: {
    align: "top",
    width:'100%', 
    height:'100px',
    placeholder: "description..."
  },



//add specific content column for card 
  addToCardCol: {
    border: "1px solid black",
  },
  addToCardTitle: {
    justifyContent: 'center'
  },
  addToCardTrait: {
    border: "1px solid black",
    paddingLeft: 5,
  },

//buttonRow
submitButton: {
  paddingLeft: 10,
  paddingBottom: 10,
}
}
    
