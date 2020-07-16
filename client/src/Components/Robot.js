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
    this.state = { play: false, favourite: false, end_time: 0 };
    this.handlePlayClick = this.handlePlayClick.bind(this);
    this.handlePlayToggled = this.handlePlayToggled.bind(this);
    this.handleFavouriteToggled = this.handleFavouriteToggled.bind(this);
  }

  handlePlayClick() {
    if (this.state.play) {
      Tone.Transport.cancel();
      this.handlePlayToggled();
      return;
    }

    this.handlePlayToggled();
    // Tone.Timeline.cancelBefore(Tone.Transport.time);
    // BUG: When multiple bots are clicked consecutively, the previous bots play buttons don't return to normal
    // because the event is cleared from the timeline by the following line
    Tone.Transport.cancel();

    const melody = this.props.melody.notes.map((note) => note.note);
    play(melody);

    this.end_time = Tone.Transport.seconds + 2;
    Tone.Transport.schedule((time) => {
      this.handlePlayToggled();
    }, this.end_time);
  }

  handlePlayToggled(e) {
    this.props.onPlayToggled(!this.state.play);
    this.setState({ play: !this.state.play });
  }

  handleFavouriteToggled(e) {
    // TODO
    this.props.onFavouriteToggled(!this.state.favourite);
    this.setState({ favourite: !this.state.favourite });
  }

  getImage() {
    const note = this.props.melody.notes[0]["note"];
    return COLOUR_MAP[note.charAt(0)];
  }

  render() {
    return (
      <div className="robot">
        <div className="robot-toolbar">
          <MDBIcon
            far={!this.state.play}
            fas={this.state.play}
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
        <Melody melody={this.props.melody}></Melody>
        <img src={this.getImage()} className="robot-avatar" alt="Robot"></img>
      </div>
    );
  }
}

export default Robot;
