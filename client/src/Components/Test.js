import React, { Component } from 'react';
import Tone from 'tone'
import { fetchJson } from '../Utils/request'

import './styles/TopPanel.css'

class TopPanel extends Component {
  constructor() {
    super();
    this.state = {}
    this.handleRobotClick = this.handleRobotClick.bind(this);
  }

  async componentDidMount() {
    const response = await fetchJson('/createbots/rating', { method: 'POST' });
    if (response.error) console.log(`Error fetching bots: ${response.error}`)
    else {
      this.setState({ bots: response.data.bots })
    }
  }

  handleRobotClick(i) {
    Tone.Transport.clear();
    console.log(`Playing ${i}`)
    const melody = this.state.bots[i].melody.notes.map(note => note.note)
    const synth = new Tone.Synth().toMaster();
    const sequence = new Tone.Sequence(function(time, note){
      synth.triggerAttackRelease(note, "4n", time);
    }, melody, "4n");
    sequence.start(Tone.Transport.time);
    sequence.loop = false;
    Tone.Transport.start();
  }

  render() {
    if (!this.state.bots) return null;

    return(
      <div id="top-panel">
        {this.state.bots.map((bot, i) => (
          <button key={i} onClick={() => this.handleRobotClick(i)}>Play {i}</button>
        ))}
      </div>
    );
  }
}

export default TopPanel;
