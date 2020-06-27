import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import './styles/TopPanel.css'

class TopPanel extends Component {
    constructor() {
        super();
        this.state = {}
        this.handleRobotClick = this.handleRobotClick.bind(this);
    }

    handleRobotClick(e) {
        console.log("hello");
    }

    render() {
        return(
            <div id="top-panel">
                <MDBRow>
                    <MDBCol size="3">
                        <img src="Robot1.png" className="robot" onClick={this.handleRobotClick}></img>
                    </MDBCol>

                    <MDBCol size="3">
                        <img src="Robot1.png" className="robot" onClick={this.handleRobotClick}></img>
                    </MDBCol>
                </MDBRow>
            </div>
        );
    }
}

export default TopPanel;