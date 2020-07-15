import React, { Component } from "react";
import { MDBIcon } from "mdbreact";

import { play } from "../Utils/melody";

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
    // TODO
    return "Robot_2_-_Blue.png";
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
