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
      startTime: Date.now(),
      composition: [],
      dragIndex: 0,
      rearrange: false,
      startY: 0,
    };
    this.handleRobotPlayToggled = this.handleRobotPlayToggled.bind(this);
    this.handleRobotFavouriteToggled = this.handleRobotFavouriteToggled.bind(this);
    this.handleClearClick = this.handleClearClick.bind(this);
    this.generateBots = this.generateBots.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDropRobot = this.onDropRobot.bind(this);
  }

  async componentDidMount() {
    this.generateBots();
  }

  async generateBots() {
    const response = await fetchJson("/bots", {
      method: "POST",
      body: JSON.stringify({
        bots: this.state.bots,
        generation: this.state.generation,
        startTime: this.state.startTime,
        endTime: Date.now(),
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.error) console.log(`Error fetching bots: ${response.error}`);
    else
      this.setState({
        ...this.state,
        bots: response.data.bots,
        generation: response.data.generation,
        startTime: Date.now(),
      });
  }

  onDragStart(e, i, rearrange) {
    this.setState({
      dragIndex: i,
      startY: e.clientY + window.scrollY,
      rearrange,
    });
  }

  onDrop() {
    let { composition, bots, dragIndex } = this.state;
    let newComposition = composition.slice();
    let draggedMelody = null;
    if (this.state.rearrange) {
      draggedMelody = newComposition[dragIndex];
      newComposition.splice(this.state.dragIndex, 1);
    } else {
      draggedMelody = bots[dragIndex];
    }
    newComposition.push(draggedMelody);
    this.setState({ composition: newComposition });
  }

  onDropRobot(e, i) {
    e.preventDefault();
    let robot = document.querySelector("#composition-row");
    // let target = robot.childNodes[i + 1].childNodes[0].children[2];
    let target = robot.childNodes[i + 1].childNodes[0];
    let hoverBoundingRect = target.getBoundingClientRect();

    let endY = e.clientY;
    let offsetY = endY - this.state.startY;

    const { dragIndex, startY, bots, composition, rearrange } = this.state;
    if (offsetY > hoverBoundingRect.top - startY) {
      let newComposition = composition.slice();
      let draggedMelody = rearrange ? composition[dragIndex] : bots[dragIndex];
      newComposition.splice(i, 0, draggedMelody);
      if (rearrange) {
        const deleteIndex = dragIndex > i ? dragIndex + 1 : dragIndex;
        newComposition.splice(deleteIndex, 1);
      }
      this.setState({ composition: newComposition });
    }
  }

  handleRobotPlayToggled(i, isPlaying) {
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
    // TODO pass favourite data here
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
          onDragStart={this.onDragStart}
          onDrop={this.onDrop}
          onDropRobot={this.onDropRobot}
        />
      </MDBContainer>
    );
  }
}

export default App;
