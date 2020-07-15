import React, { Component } from "react";
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";

import Robot from "./Robot";
import "./styles/TopPanel.css";

class TopPanel extends Component {
  render() {
    if (!this.props.bots) return null;

    return (
      <div id="top-panel">
        <MDBRow>
          {this.props.bots.map((bot, i) => (
            <MDBCol key={i} size="3">
              <Robot
                melody={bot.melody}
                onFavouriteToggled={(favourite) => this.props.onFavouriteToggled(i, favourite)}
              ></Robot>
            </MDBCol>
          ))}
          <MDBCol size="2"></MDBCol>
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
