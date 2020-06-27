import React, { Component } from 'react';
import { MDBContainer } from "mdbreact";
import { render } from '@testing-library/react';
import TopPanel from './Components/TopPanel';
import { fetchJson } from './Utils/request';

class App extends Component {
  constructor() {
    super();
    this.state = {
      bots: []
    }
  }

  async componentDidMount() {
    const response = await fetchJson('/createbots/rating', {method: 'POST'});
    console.log(response);
    if (response.data) this.setState({ bots: response.data.bots })
  }

  render() {
    return(
      <MDBContainer id="App">
        <TopPanel bots={this.state.bots}/>
      </MDBContainer>
    );
  }
}

export default App;