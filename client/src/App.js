import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [test, setTest] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL + "/test");
      console.log(response);
      setTest(response.status);
    };
    fetchData();
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Server response {test}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
