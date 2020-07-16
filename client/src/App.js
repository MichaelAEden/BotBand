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
      dragIndex: 0
    };
    this.handleRobotPlayToggled = this.handleRobotPlayToggled.bind(this);
    this.handleRobotFavouriteToggled = this.handleRobotFavouriteToggled.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.generateBots = this.generateBots.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrop = this.onDrop.bind(this);
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

  onDragStart(i) {
    this.setState({dragIndex: i}, () => {
      console.log(this.state.dragIndex);
    });
  }

  onDrop() {
    let newComposition = this.state.composition.slice();
    const clickedMelody = this.state.bots[this.state.dragIndex];
    newComposition.push(clickedMelody);
    this.setState({composition: newComposition});
  }

  handleRobotPlayToggled(i, isPlaying) {
    console.log(`Toggled play to ${isPlaying} for robot ${i}`);
    // Increment robot play counter if robot is being played.
    if (isPlaying) {
      const bot = { ...this.state.bots[i], playCount: (this.state.bots[i].playCount || 0) + 1 };
      const bots = [...this.state.bots];
      bots[i] = bot;
      this.setState({ ...this.state, bots });
    }
  }

  handleRobotFavouriteToggled(i, isFavourite) {
    console.log(`Toggled favourite to ${isFavourite} for robot ${i}`);
    const bot = { ...this.state.bots[i], metric: 0 + isFavourite };
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
          onPlayToggled={this.handleRobotPlayToggled}
          onFavouriteToggled={this.handleRobotFavouriteToggled}
          playMelody={this.playMelody}
          generateBots={this.generateBots}
          onDragStart={this.onDragStart}
        />
        <BottomPanel
          composition={this.state.composition}
          bots={this.state.bots}
          playMelody={this.playMelody}
          handleClearClick={this.handleClearClick}
          onDrop={this.onDrop}
        />
      </MDBContainer>
    );
  }
}

export default App;
