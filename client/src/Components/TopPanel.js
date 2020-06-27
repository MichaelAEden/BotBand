import React, { Component } from 'react';
import { MDBRow, MDBCol } from 'mdbreact';
import { fetchJson } from '../Utils/request'

import './styles/TopPanel.css'

class TopPanel extends Component {
    constructor() {
        super();
        this.state = {}
        this.handleRobotClick = this.handleRobotClick.bind(this);
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

    render() {
      if (!this.state.bots) return null;

      return(
        <div id="top-panel">
          <MDBRow>
            <MDBCol size="1"></MDBCol>
              {this.state.bots.map((bot, i) => (<MDBCol key={i} size="3">
                  <img src="Robot1.png" className="robot" onClick={() => this.handleRobotClick(i)}></img>
                </MDBCol>)
              )}
          </MDBRow>
        </div>
      );
    }
}

export default TopPanel;