import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import './styles/TopPanel.css'
import Tone from 'tone';

class TopPanel extends Component {
  constructor() {
    super();
    this.state = {}
    this.handleRobotClick = this.handleRobotClick.bind(this);
  }

  playMelody(m) {
    let synth = new Tone.Synth().toMaster();
    let sequence = new Tone.Sequence(function(time, note){
      synth.triggerAttackRelease(note, "4n", time);
    }, m, "4n");
    sequence.start();
    sequence.loop = 1;
    Tone.Transport.toggle();
  }

  handleRobotClick(e) {
    console.log("hello");
    let m = ["C4", "E4", "G4", "A4"]
    this.playMelody(m);
  }

  render() {
    return(
      <div id="top-panel">
      <MDBRow>
          <MDBCol size="3">
          <img src="Robot1.png" className="robot" onClick={this.handleRobotClick}></img>
          </MDBCol>

          <MDBCol size="3">
          <img src="Robot1.png" className="robot" onClick={this.handleRobotClick}></img>
          </MDBCol>
      </MDBRow>
      </div>
    );
  }
}

export default TopPanel;