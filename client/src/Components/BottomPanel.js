import React, { Component } from "react";
import { MDBRow, MDBCol, MDBIcon } from "mdbreact";

import Robot from "./Robot";
import "./styles/BottomPanel.css";

class BottomPanel extends Component {
  constructor() {
    super();
    this.state = {};
    this.handlePlayComposition = this.handlePlayComposition.bind(this);
  }

  handlePlayComposition(i) {
    let melodies = [];
    this.props.composition.forEach((bot) => {
      let melody = bot.melody.notes.map((note) => note.note);
      melodies = melodies.concat(melody);
    });
    this.props.playMelody(melodies);
  }

  render() {
    const composition = this.props.composition.map((bot, i) => (
      <MDBCol key={i} size="2">
        <Robot melody={bot.melody} hidePlayback className="robot"></Robot>
      </MDBCol>
    ));

    return (
      <div id="bottom-panel">
        <div id="bottom-panel-label">
          <h2>Composition</h2>
        </div>
        <MDBRow>
          <MDBCol size="2" id="bottom-toolbar">
            <MDBIcon icon="play-circle" size="3x" onClick={this.handlePlayComposition} />
            <MDBIcon icon="trash-alt" size="3x" onClick={this.props.handleClearClick} />
          </MDBCol>
          {composition}
        </MDBRow>
      </div>
    );
  }
}

export default BottomPanel;
