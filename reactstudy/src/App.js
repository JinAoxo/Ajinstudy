import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {

  let [data, b] = useState(['data1', 'data2', 'data3'])

  return (
    <div className="App">

      <div>{ data[0] }</div>
      <div>{ data[1] }</div>
      <div>{data[2]}</div>
      
      
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
