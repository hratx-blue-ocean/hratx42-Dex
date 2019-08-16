import React, { useState } from "react";
import { Button, Modal, Container, Row, Col, Form } from 'react-bootstrap';

import table from '../../utils/table';

export default function CardModal({ closeModal, showMe, card, deckTitle, deckNames, editCard, users, labels }) {
  const [show, setShow] = useState(false);
  const handleClose = () => closeModal()

  const [effort, setEffort] = useState(card.weight);
  const [impact, setImpact] = useState(card.impact);
  const [title, setTitle] = useState(card.title);
  const [players, setPlayers] = useState(card.cards_members);
  const [tags, setTags] = useState(card.card_labels);
  const [dueDate, setDate] = useState(new Date());
  const [deck, setDeck] = useState(deckTitle);
  const [desc, setDesc] = useState(card.description);

  return (
    <div>hello world</div>
  )

}
const styles = {
  //Header Row effort, impact, title, exit
  headerRow: {
    // "border": "1px solid black",
    height: 'auto'
  },
  effortImpact: {
    // "border": "1px solid black"
    // paddingTop: 20
  },
  effortImpactTitle: {
    // border: "1px solid black",
    justifyContent: 'center',
    paddingTop: 35,
  },
  effortImpactInput: {
    // border: "1px solid black",
  },
  effImpInputBox: {
    width: 40,
    height: 20,
    // oninput:"this.value=this.value.replace(/[^0-9]/g,'');"

  },
  exitButton: {
    fontWeight: 1000,
    fontSize: 20,
    paddingLeft: 15,
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
    height: '100px',
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
