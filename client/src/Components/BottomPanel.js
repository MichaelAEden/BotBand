import React, { Component } from "react";
import { MDBRow, MDBCol, MDBIcon } from "mdbreact";

import Robot from "./Robot";
import { play } from "../Utils/melody";
import "./styles/BottomPanel.css";

class BottomPanel extends Component {
  constructor() {
    super();
    this.state = {};
    this.handlePlayComposition = this.handlePlayComposition.bind(this);
    this.handleShowComposition = this.handleShowComposition.bind(this);
  }

  collectMelodies(i) {
    let melodies = [];
    this.props.composition.forEach((bot) => {
      let melody = bot.melody.notes.map((note) => note.note);
      melodies = melodies.concat(melody);
    });
    return melodies
  }

  handlePlayComposition(i) {
    play(this.collectMelodies());
  }

  handleShowComposition(i) {
    console.log("Displaying composition");
    let melody = this.collectMelodies().toString();
    if (melody) {
      alert(melody);
    }
    else alert("Composition is empty.");
  }

  onDrag(e) {
    e.preventDefault();
  }

  render() {
    const composition = this.props.composition.map((bot, i) => (
      <MDBCol key={i} size="2">
        <Robot
          melody={bot.melody}
          hideToolbar
          className="robot"
          onDragStart={this.props.onDragStart}
          onDropRobot={this.props.onDropRobot}
          index={i}
          rearrange
        ></Robot>
      </MDBCol>
    ));
    const numSpaces = 6 - (composition.length % 6);
    const emptySpaces = [];
    for(let i = 0; i < numSpaces; i++) {
      emptySpaces.push(
        <MDBCol key={i} size="2" className="empty-space" onDrop={this.props.onDrop}>
        </MDBCol>
      );
    }

    return (
      <div id="bottom-panel" onDragOver={(e) => this.onDrag(e)}>
        <div id="bottom-panel-label">
          <h2>Composition</h2>
        </div>
        <MDBRow id="composition-row">
          <MDBCol size="1" id="bottom-toolbar">
            <MDBIcon icon="play-circle" size="3x" className="m-1" fixed onClick={this.handlePlayComposition} />
            <MDBIcon icon="trash-alt" size="3x" className="m-1" fixed onClick={this.props.handleClearClick} />
            <MDBIcon icon="file-download" size="3x" className="m-1" fixed onClick={this.handleShowComposition} />
          </MDBCol>
          {composition}
          {emptySpaces}
        </MDBRow>
      </div>
    );
  }
}

export default BottomPanel;
