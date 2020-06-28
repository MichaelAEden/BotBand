import React, { Component } from 'react';
import { MDBContainer } from "mdbreact";
import { fetchJson } from './Utils/request';
import TopPanel from './Components/TopPanel';
import BottomPanel from './Components/BottomPanel';
import Tone from 'tone';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bots: [],
      composition: []
    }
    this.handleRobotClick = this.handleRobotClick.bind(this);
  }

  async componentDidMount() {
    const response = await fetchJson('/createbots/rating', {method: 'POST'});
    console.log(response);
    if (response.data) this.setState({ bots: response.data.bots })
  }

  playMelody(m) {
    Tone.Transport.clear();
    const synth = new Tone.Synth().toMaster();
    const sequence = new Tone.Sequence(function(time, note){
      synth.triggerAttackRelease(note, "4n", time);
    }, m, "4n");
    sequence.start(Tone.Transport.time);
    sequence.loop = false;
    Tone.Transport.start();
  }

  handleRobotClick(i) {
    console.log(this.state.bots);
    let new_composition = this.state.composition.slice();
    const clicked_melody = this.state.bots[i];
    new_composition.push(clicked_melody);
    this.setState({composition: new_composition});
  }

  render() {
    return(
      <MDBContainer id="App">
        <TopPanel
          bots={this.state.bots}
          handleRobotClick={this.handleRobotClick}
          playMelody={this.playMelody}
        />
        <BottomPanel
          composition={this.state.composition}
          playMelody={this.playMelody}
        />
      </MDBContainer>
    );
  }
}

export default App;