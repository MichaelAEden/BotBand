import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import { fetchJson } from '../Utils/request'

import './styles/TopPanel.css'

class TopPanel extends Component {
    constructor() {
        super();
        this.state = {}
        this.handleRobotClick = this.handleRobotClick.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.handleThumbsUp = this.handleThumbsUp.bind(this);
        this.handleThumbsDown = this.handleThumbsDown.bind(this);
    }

    async componentDidMount() {
      // const response = await fetchJson('/createbots/rating')
      // if (response.data) this.setState({ bots: response.bots })
      const mockData = {
        bots: [
          {
            melody: [
              { note: 'A4' },
              { note: 'B4' },
              { note: 'C4' }
            ]
          },
          {
             melody: [
               { note: 'A4' },
               { note: 'B4' },
               { note: 'C4' }
             ]
          },
        ]
      }
      this.setState({bots: mockData.bots})
    }

    handleRobotClick(i) {
      console.log(i);
    }

    handleThumbsUp(e) {
      console.log("thumbs up");
    }

    handleThumbsDown(e) {
      console.log("thumbs down");
    }

    handleHover(e) {
      console.log("hovering");
    }

    render() {
      if (!this.state.bots) return null;
      
      const bots = this.state.bots.map((bot, i) => (
        <MDBCol key={i} size="3">
          <div>
            <div className="robot-toolbar">
              <MDBIcon far icon="play-circle" className="toolbar-btn" onMouseEnter={this.handleHover}/>
              <MDBIcon far icon="thumbs-up" className="toolbar-btn" onClick={this.handleThumbsUp}/>
              <MDBIcon far icon="thumbs-down" className="toolbar-btn" onClick={this.handleThumbsDown}/>
            </div>
            <img src="Robot1.png" className="robot" onClick={() => this.handleRobotClick(i)}></img>
          </div>
        </MDBCol>
      ));

      return(
        <div id="top-panel">
          <MDBRow>
            <MDBCol size="1"></MDBCol>
              {bots}
          </MDBRow>
        </div>
      );
    }
}

export default TopPanel;