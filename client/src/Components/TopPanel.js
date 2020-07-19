import React, { Component } from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";

import Robot from "./Robot";
import "./styles/TopPanel.css";

class TopPanel extends Component {
  constructor() {
    super();
    // TODO: stop robots from playing if composition is playing.
    // Keep track of robot currently playing melody, if any. Only one may play at a time.
    this.state = { robotPlaying: -1 };
    this.handlePlayToggled = this.handlePlayToggled.bind(this);
  }

  handlePlayToggled(i, isPlaying) {
    if (isPlaying) this.setState({ robotPlaying: i });
    else this.setState({ robotPlaying: -1 });
    this.props.onPlayToggled(i, isPlaying);
  }

  render() {
    if (!this.props.bots) return null;

    return (
      <div id="top-panel">
        <MDBRow>
          {this.props.bots.map((bot, i) => (
            <MDBCol key={i} size="3">
              <Robot
                melody={bot.melody}
                isPlaying={this.state.robotPlaying === i}
                onPlayToggled={(isPlaying) => this.handlePlayToggled(i, isPlaying)}
                onFavouriteToggled={(isFavourite) => this.props.onFavouriteToggled(i, isFavourite)}
                index={i}
                onDragStart={this.props.onDragStart}
              ></Robot>
            </MDBCol>
          ))}
          <MDBCol size="2" id="refresh">
            <MDBBtn onClick={this.props.generateBots} id="generate-btn">
              Generate New Bots
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </div>
    );
  }
}

export default TopPanel;
