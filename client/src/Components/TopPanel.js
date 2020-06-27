import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import { fetchJson } from '../Utils/request'
import './styles/TopPanel.css'
import Tone from 'tone';

class TopPanel extends Component {
    constructor() {
        super();
        this.state = {}
        this.handlePlayClick = this.handlePlayClick.bind(this);
        this.handleThumbsUp = this.handleThumbsUp.bind(this);
        this.handleThumbsDown = this.handleThumbsDown.bind(this);
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

  handlePlayClick(e) {
    console.log("hello");
    let m = ["C4", "E4", "G4", "A4"]
    this.playMelody(m);
  }

    handleThumbsUp(e) {
      console.log("thumbs up");
    }

    handleThumbsDown(e) {
      console.log("thumbs down");
    }

    render() {
      if (!this.state.bots) return null;
      
      const bots = this.state.bots.map((bot, i) => (
        <MDBCol key={i} size="3">
          <div>
            <div className="robot-toolbar">
              <MDBIcon far icon="play-circle" className="toolbar-btn" onClick={this.handlePlayClick}/>
              <MDBIcon far icon="thumbs-up" className="toolbar-btn" onClick={this.handleThumbsUp}/>
              <MDBIcon far icon="thumbs-down" className="toolbar-btn" onClick={this.handleThumbsDown}/>
            </div>
            <img src="Robot1.png" className="robot"></img>
          </div>
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