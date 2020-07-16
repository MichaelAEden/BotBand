import React, { Component } from "react";
import { MDBIcon } from "mdbreact";
import Tone from "tone";

import Melody from "./Melody";
import { play } from "../Utils/melody";
import "./styles/Robot.css";

// Based on Scriabin's colour mapping
const COLOUR_MAP = {
  C: "Robot_Red.png",
  D: "Robot_Orange.png",
  E: "Robot_Yellow.png",
  F: "Robot_Green.png",
  G: "Robot_Teal.png",
  A: "Robot_Blue.png",
  B: "Robot_Purple.png",
};

class Robot extends Component {
  constructor() {
    super();
    this.state = { isFavourite: false };
    this.handlePlayClicked = this.handlePlayClicked.bind(this);
    this.handleFavouriteClicked = this.handleFavouriteClicked.bind(this);
  }

  handlePlayClicked(e) {
    const isPlaying = this.props.isPlaying;
    this.props.onPlayToggled(!isPlaying);

    // Stop any melodies which are currently playing.
    Tone.Transport.cancel();

    if (isPlaying) return;

    const melody = this.props.melody.notes.map((note) => note.note);
    play(melody);

    const endTime = Tone.Transport.seconds + 2;
    Tone.Transport.schedule((time) => {
      this.props.onPlayToggled(false);
    }, endTime);
  }

  handleFavouriteClicked(e) {
    this.props.onFavouriteToggled(!this.state.isFavourite);
    this.setState({ isFavourite: !this.state.isFavourite });
  }

  getImage() {
    const note = this.props.melody.notes[0]["note"];
    return COLOUR_MAP[note.charAt(0)];
  }

  render() {
    return (
      <div className="robot">
        <div
          className="robot-toolbar"
          style={{ visibility: this.props.hideToolbar ? "hidden" : undefined }}
        >
          <MDBIcon
            far
            size="lg"
            icon={this.props.isPlaying ? "stop-circle" : "play-circle"}
            className="toolbar-btn"
            onClick={this.handlePlayClicked}
          />
          <MDBIcon
            far={!this.state.isFavourite}
            fas={this.state.isFavourite}
            size="lg"
            icon="star"
            className="toolbar-btn"
            onClick={this.handleFavouriteClicked}
          />
        </div>
        <Melody melody={this.props.melody}></Melody>
        <img
          src={this.getImage()}
          className="robot-avatar"
          alt="Robot"
          draggable
          onMouseDown={this.props.onDragStart}
        ></img>
      </div>
    );
  }
}

export default Robot;
