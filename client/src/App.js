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
    this.handleClearClick = this.handleClearClick.bind(this);
  }

  async componentDidMount() {
    const response = await fetchJson('/createbots/rating', {method: 'POST'});
    console.log(response);
    let bots = response.data.bots;
    bots.forEach( (bot) => {
      bot["count"] = 0;
    });
    console.log(bots);
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
    let new_composition = this.state.composition.slice();
    const clicked_melody = this.state.bots[i];
    new_composition.push(clicked_melody);

    //record usage
    let bots_copy = this.state.bots.slice();
    let json_copy = {};
    json_copy = Object.assign(json_copy, bots_copy[i]);
    json_copy["count"] += 1;
    bots_copy[i] = json_copy;
    this.setState({composition: new_composition, bots: bots_copy});
  }

  handleClearClick(e) {
    console.log("clearing composition");
    this.setState({composition: []});
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
          handleClearClick={this.handleClearClick}
        />
      </MDBContainer>
    );
  }
}

export default App;