import React from 'react';
import { useState, useEffect } from "react";
import PieChart from '../components/PieChart'
import LineChart from '../components/LineChart'
import './Dashboard.scss';


export default function Dashboard() {

  const [chartData, setChartData] = useState([
      { type: 'paper',  total: 3 },
      { type: 'plastic', total: 4 },
  ]);
  const logout = () => {
      localStorage.clear();
      window.location.href = "/login";
  };

  useEffect(() => {
    fetch("/api/waste?groupByType=true&includeDataPoints=true")
        .then(response => response.json())
        .then(json => setChartData(json));
  }, []);

  return(
    <div className="dashboard">
      <button onClick={logout}>Logout</button>
      <header className="App-header">
        <PieChart title="Waste" data={chartData}/>
        <LineChart title="Waste" data={chartData}/>
      </header>
    </div>
  );
}