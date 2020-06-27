import React, { Component } from 'react';
import { MDBContainer } from "mdbreact";
import { render } from '@testing-library/react';
import Test from './Components/Test';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <MDBContainer id="App">
        <Test />
      </MDBContainer>
    );
  }
}

export default App;