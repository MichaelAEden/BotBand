import React, { Component } from "react";
import { MDBIcon } from "mdbreact";

import { play } from "../Utils/melody";

// Based on Scriabin's colour mapping
const colour_map = {
  "C":"Robot_Red.png",
  "D":"Robot_Orange.png",
  "E":"Robot_Yellow.png",
  "F":"Robot_Green.png",
  "G":"Robot_Teal.png",
  "A":"Robot_Blue.png",
  "B":"Robot_Purple.png",
};

class Robot extends Component {
  constructor() {
    super();
    this.state = { favourite: false };
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handleFavouriteToggled = this.handleFavouriteToggled.bind(this);
  }

  handlePlayClick() {
    const melody = this.props.melody.notes.map((note) => note.note);
    play(melody);
  }

  handleFavouriteToggled(e) {
    // TODO
    this.props.onFavouriteToggled(!this.state.favourite);
    this.setState({ favourite: !this.state.favourite });
  }

  getImage() {
    const note = this.props.melody.notes[0]["note"];
    return colour_map[note.charAt(0)];
  }

  render() {
    // TODO: change play button depending on whether melody is currently playing.
    return (
      <div>
        <div className="robot-toolbar">
          <MDBIcon
            far
            size="lg"
            icon="play-circle"
            className="toolbar-btn"
            onClick={this.handlePlayClick}
          />
          <MDBIcon
            far={!this.state.favourite}
            fas={this.state.favourite}
            size="lg"
            icon="star"
            className="toolbar-btn"
            onClick={this.handleFavouriteToggled}
          />
        </div>
        <img src={this.getImage()} className="robot" alt="Robot"></img>
      </div>
    );
  }
}

export default Robot;
