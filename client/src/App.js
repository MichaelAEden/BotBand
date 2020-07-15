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
    this.handleRobotFavouriteToggled = this.handleRobotFavouriteToggled.bind(this);
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

  hanldeRobotDragged(i) {
    // TODO: this function is not called by anything, currently using as a placeholder.
    let newComposition = this.state.composition.slice();
    const clickedMelody = this.state.bots[i];
    newComposition.push(clickedMelody);
  }

  handleRobotFavouriteToggled(i, favourite) {
    console.log(`Toggled favourite to ${favourite} for robot ${i}`);
    const bot = { ...this.state.bots[i], metric: 0 + favourite };
    const bots = [...this.state.bots];
    bots[i] = bot;
    this.setState({ ...this.state, bots });
  }

  handleClearClick(e) {
    console.log("Clearing composition");
    this.setState({ ...this.state, composition: [] });
  }

  render() {
    return (
      <MDBContainer id="App">
        <TopPanel
          bots={this.state.bots}
          onFavouriteToggled={this.handleRobotFavouriteToggled}
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
