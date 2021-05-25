import logo from './logo.svg';
import './App.scss';
import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import PieChart from './components/PieChart'
import LineChart from './components/LineChart'
import Login from "./login/Login";
import Dashboard from './Dashboard/Dashboard';
import useToken from "./login/useToken";

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken}/>
  }

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route path="/">
            <Dashboard />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
