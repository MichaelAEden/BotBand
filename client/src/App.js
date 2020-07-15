import React, { Component } from "react";
import { MDBContainer } from "mdbreact";

import TopPanel from "./Components/TopPanel";
import BottomPanel from "./Components/BottomPanel";
import { fetchJson } from "./Utils/request";

class App extends Component {
  constructor() {
    super();
    this.state = {
      bots: [],
      composition: [],
    };
    this.handleRobotClick = this.handleRobotClick.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.generateBots = this.generateBots.bind(this);
  }

  async componentDidMount() {
    this.generateBots();
  }

  async generateBots() {
    const response = await fetchJson("/createbots/rating", {
      method: "POST",
      body: JSON.stringify({ bots: this.state.bots }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.error) console.log(`Error fetching bots: ${response.error}`);
    else this.setState({ bots: response.data.bots });
  }

  handleRobotClick(i) {
    let new_composition = this.state.composition.slice();
    const clicked_melody = this.state.bots[i];
    new_composition.push(clicked_melody);

    // Record usage
    let bots_copy = this.state.bots.slice();
    let json_copy = {};
    json_copy = Object.assign(json_copy, bots_copy[i]);
    json_copy["count"] += 1;
    bots_copy[i] = json_copy;
    this.setState({ composition: new_composition, bots: bots_copy });
  }

  handleClearClick(e) {
    console.log("clearing composition");
    let bots_copy = this.state.bots.slice();
    let json_copy = {};

    bots_copy.forEach((bot, i) => {
      json_copy = Object.assign(json_copy, bot);
      json_copy["count"] = 0;
      bots_copy[i] = json_copy;
    });
    this.setState({ composition: [], bots: bots_copy });
  }

  render() {
    return (
      <MDBContainer id="App">
        <TopPanel
          bots={this.state.bots}
          handleRobotClick={this.handleRobotClick}
          playMelody={this.playMelody}
          generateBots={this.generateBots}
        />
        <BottomPanel
          composition={this.state.composition}
          bots={this.state.bots}
          playMelody={this.playMelody}
          handleClearClick={this.handleClearClick}
        />
      </MDBContainer>
    );
  }
}

export default App;
