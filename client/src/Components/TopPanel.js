import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import './styles/TopPanel.css';

class TopPanel extends Component {
    constructor() {
        super();
        this.handlePlayClick = this.handlePlayClick.bind(this);
        this.handleThumbsUp = this.handleThumbsUp.bind(this);
        this.handleThumbsDown = this.handleThumbsDown.bind(this);
    }

    handlePlayClick(i) {
      console.log(`Playing ${i}`);
      const melody = this.props.bots[i].melody.map(note => note.key);
      this.props.playMelody(melody);
    }

    handleThumbsUp(e) {
      console.log("thumbs up");
    }

    handleThumbsDown(e) {
      console.log("thumbs down");
    }
    
    render() {
      console.log("hello", this.props.bots);
      if (!this.props.bots) return null;
      
      const bots = this.props.bots.map((bot, i) => (
        <MDBCol key={i} size="3">
          <div>
            <div className="robot-toolbar">
              <MDBIcon far icon="play-circle" className="toolbar-btn" onClick={() => this.handlePlayClick(i)}/>
              <MDBIcon far icon="thumbs-up" className="toolbar-btn" onClick={this.handleThumbsUp}/>
              <MDBIcon far icon="thumbs-down" className="toolbar-btn" onClick={this.handleThumbsDown}/>
            </div>
            <img src="walle_purple.png" className="robot" onClick={() => {this.props.handleRobotClick(i)}}></img>
          </div>
        </MDBCol>
      ));

    return(
      <div id="top-panel">
        <MDBRow>
          {bots}

        </MDBRow>
      </div>
    );
  }
}

export default TopPanel;