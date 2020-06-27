import React, { Component } from 'react';
import { MDBContainer } from "mdbreact";
import { render } from '@testing-library/react';
import TopPanel from './Components/TopPanel';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <MDBContainer id="App">
        <TopPanel />
      </MDBContainer>
    );
  }
}

export default App;