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
  handlePlayClick() {
    const melody = this.props.melody.notes.map((note) => note.note);
    play(melody);
  }

  handleFavourite(e) {
    // TODO
    console.log("Favourite");
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
            icon="play-circle"
            className="toolbar-btn"
            onClick={() => this.handlePlayClick()}
          />
          <MDBIcon far icon="star" className="toolbar-btn" onClick={this.handleFavourite} />
        </div>
        <img src={this.getImage()} className="robot"></img>
      </div>
    );
  }
}

export default Robot;
