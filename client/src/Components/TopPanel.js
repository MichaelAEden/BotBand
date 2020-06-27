import React, { Component } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import { fetchJson } from '../Utils/request'
import './styles/TopPanel.css'
import Tone from 'tone';

class TopPanel extends Component {
  constructor() {
    super();
    this.state = {
      bots: []
    };
    this.handleRobotClick = this.handleRobotClick.bind(this);
  }

  async componentDidMount() {
    const response = await fetchJson('/createbots/rating', {method: 'POST'});
    console.log(response);
    if (response.data) this.setState({ bots: response.data.bots })
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
    console.log(this.state.bots);
    if (!this.state.bots) return null;
    
    const bots = this.state.bots.map((bot, i) => (
      <MDBCol key={i} size="3">
        <img src="Robot1.png" className="robot" onClick={() => this.handleRobotClick(i)}></img>
      </MDBCol>
    ));

    return(
      <div id="top-panel">
        <MDBRow>
          <MDBCol size="1"></MDBCol>
            {bots}
        </MDBRow>
      </div>
    );
  }
}

export default TopPanel;