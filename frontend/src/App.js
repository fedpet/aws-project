import logo from './logo.svg';
import './App.scss';
import { useState, useEffect } from "react";
import { Redirect } from 'react-router';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import PieChart from './components/PieChart'
import LineChart from './components/LineChart'
import Login from "./login/Login";
import UserDashboard from './Dashboard/User/UserDashboard';
import AdminDashboard from './Dashboard/Admin/AdminDashboard';
import useToken from "./login/useToken";


function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken}/>
  }
  const role = JSON.parse(localStorage.getItem('token')).role ;

  if(role == 'admin') {
      return (
        <div className="wrapper">
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                  <Redirect to="/admin" />
              </Route>
              <Route exact path="/admin">
                <AdminDashboard />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
        )
  } else if(role === 'user'){
      return (
        <div className="wrapper">
          <BrowserRouter>
            <Switch>
              <Route path="/">
                <UserDashboard />
              </Route>
              <Route path="/dashboard">
                <UserDashboard />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      )
  } else {
    /* return 404 not found page */
    return (

    )
  }
}

export default App;
