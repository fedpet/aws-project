import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.scss';
import logo from '../images/logo.svg';
import preview from '../images/login.jpg';

async function loginUser(credentials) {
    return fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(
        data => data.json()
    )
}

export default function Login({setToken}) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        if(token) {
            setErrorMessage('Authentication error. Incorrect username or password.')
        }
        setToken(token);
    }

  return(
    <div className="container-fluid">

      <div className="row">
        <div className="col-sm-6 login-section-wrapper">
          <div className="brand-wrapper">
            <img src={logo} alt="logo" className="logo"/>
          </div>
          <div className="login-wrapper my-auto">
          { errorMessage &&
            <div className="alert alert-danger"> {errorMessage} </div> }
            <h1 className="login-title">Login</h1>
            <form action="#!">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" className="form-control" placeholder="email@example.com" onChange={e => setEmail(e.target.value)} required/>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" className="form-control" placeholder="enter your passsword" onChange={e => setPassword(e.target.value)} required/>
              </div>
              <input name="login" id="login" className="btn btn-block login-btn" type="button" value="Login" onClick={handleSubmit}/>
            </form>
          </div>
        </div>
        <div className="col-sm-6 px-0 d-none d-sm-block">
          <img src={preview} alt="login image" className="login-img"/>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}