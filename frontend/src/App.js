import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";


function App() {
  const [exampleData, setExampleData] = useState([]);

  useEffect(() => {
    fetch("/api/example")
      .then(response => response.json())
      .then(json => setExampleData(json));
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
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
	    <ul>
	    {exampleData.map(content => (
		  <li key={content.id}>{content.title}</li>
	    ))}
	    </ul>
      </header>
    </div>
  );
}

export default App;
