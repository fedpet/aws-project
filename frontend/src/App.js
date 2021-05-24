import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import PieChart from './components/PieChart'
import LineChart from './components/LineChart'


function App() {
  const [chartData, setChartData] = useState([
      { type: 'paper',  total: 3 },
      { type: 'plastic', total: 4 },
  ]);

  useEffect(() => {
    fetch("/api/waste?groupByType=true&includeDataPoints=true")
        .then(response => response.json())
        .then(json => setChartData(json));
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PieChart title="Waste" data={chartData}/>
        <LineChart title="Waste" data={chartData}/>
      </header>
    </div>
  );
}

export default App;
