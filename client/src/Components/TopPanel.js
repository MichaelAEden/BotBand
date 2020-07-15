import React, { Component } from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";

import Robot from "./Robot";
import "./styles/TopPanel.css";

class TopPanel extends Component {
  constructor() {
    super();
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handleFavourite = this.handleFavourite.bind(this);
  }

  handlePlayClick(i) {
    console.log(`Playing ${i}`);
    const melody = this.props.bots[i].melody.notes.map((note) => note.note);
    this.props.playMelody(melody);
  }

  handleFavourite(i) {
    // TODO
    console.log(`Favourited: ${i}`);
  }

  render() {
    if (!this.props.bots) return null;

    return (
      <div id="top-panel">
        <MDBRow>
          {this.props.bots.map((bot, i) => (
            <MDBCol key={i} size="3">
              <Robot melody={bot.melody}></Robot>
            </MDBCol>
          ))}
          <MDBCol size="2"></MDBCol>
          <MDBCol size="2" id="refresh">
            <MDBBtn onClick={this.props.generateBots} id="generate-btn">
              Generate New Bots
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

export default TopPanel;
