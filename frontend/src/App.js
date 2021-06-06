import './App.scss';
import { Redirect } from 'react-router';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./login/Login";
import UserDashboard from './Dashboard/User/UserDashboard';
import AdminDashboard from './Dashboard/Admin/AdminDashboard';
import useToken from "./login/useToken";
import NotFound from "./components/NotFound"

function App() {
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken}/>
  }
  const role = JSON.parse(localStorage.getItem('token')).role ;

  if(role === 'admin') {
      return (
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                  <Redirect to="/admin" />
              </Route>
              <Route exact path="/admin">
                <AdminDashboard />
              </Route>
              <Route path="*" component={NotFound} />
            </Switch>
          </BrowserRouter>
        )
  } else if(role === 'user'){
      return (
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                 <Redirect to="/dashboard" />
              </Route>
              <Route exact path="/dashboard">
                <UserDashboard />
              </Route>
              <Route path="*" component={NotFound} />
            </Switch>
          </BrowserRouter>
      )
  }
}

export default App;
