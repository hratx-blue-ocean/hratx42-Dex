import React, { Component } from 'react'

export default class Board extends Component {
  constructor(props){
    super(props)
    this.state = {
      decks: [{}],
      tickets: [{}],
      users: [],
      filterBy: '',
      sortBy: ''
    }
  }
  render() {
    return (
      <div>
        This is your board
      </div>
    )
  }
}
