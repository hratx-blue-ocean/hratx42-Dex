import React, { useState } from "react";
// import DatePicker from 'react-date-picker';
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
        {/* TITLES FOR Header Container for effort, impact, title, and exit */}
        <Row xs={12} style={styles.headerRow}>
          <Col xs={1} style={styles.effortImpactTitle}>
            <div style={{fontSize:10}}>Effort</div>
          </Col>
          <Col xs={1} style={styles.effortImpactTitle}>
            <div style={{fontSize:10}}>Impact</div>
          </Col>
          <Col xs={9} style={styles.titleStyle}>
            <div style={{width: '100%' , paddingTop:5}}></div>
          </Col>
          <Col xs={1} style={{justifyContent:'center'}}>
              <div style={styles.exitButton}>  X</div>
          </Col>
        </Row>
        {/* CONTENT FOR Header Container for effort, impact, title, and exit */}
        <Row xs={12} style={styles.headerRow}>
          <Col xs={1} style={styles.effortImpactInput}>
          <input maxLength="2" type="number" style={styles.effImpInputBox}/>
          </Col>
          <Col xs={1} style={styles.effortImpactInput}>
          <input maxLength="2" type="number" style={styles.effImpInputBox}/>
          </Col>
          {/* title input area */}
          <Col xs={10} style={styles.titleStyle}>
                        <Form style={{width: '100%'}}>
              <Form.Group sm={8} controlId="exampleForm.ControltitleArea">
                {/* <Form.Label>Description</Form.Label> */}
                <Form.Control as="textarea" rows="1" placeholder="title"/>
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
            {/* content of players and tags */}
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
                      <option>FrontEnd</option>
                      <option>BackEnd</option>
                      <option>Git</option>
                    </select>
                  </Col>
            </Row>
            {/* Text Input Area */}
            <Row>
              <Form style={{width: '100%', paddingTop:10}}>
              <Form.Group sm={8} controlId="exampleForm.ControlTextarea1">
                {/* <Form.Label>Description</Form.Label> */}
                <Form.Control as="textarea" rows="8" placeholder="description"/>
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
              <input placeholder="date due" style={{width:'100%'}}/> 
            </Row>
            <Row style={styles.addToCardTrait}>
                <input placeholder="gitLink" style={{width:'100%'}}/> 
            </Row>
            <Row style={styles.addToCardTrait}>
            <select style={{width:'100%'}}>
              <option>BackLog</option>
              <option>In Progress</option>
              <option>Ready For Review</option>
              <option>Completed</option>
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
  },
  effortImpactTitle: {
    // border: "1px solid black",
    justifyContent: 'center',
    paddingTop:10,
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
    
