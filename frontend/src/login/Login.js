import React, { useState } from 'react';
import PropTypes from 'prop-types';

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
         <div className="container">
            {/* <!-- Outer Row --> */}
            <div className="row justify-content-center">

              <div className="col-xl-10 col-lg-12 col-md-9">

                <div className="card o-hidden border-0 shadow-lg my-5">
                  <div className="card-body p-0">
                    {/* <!-- Nested Row within Card Body --> */}
                    <div className="row">
                      <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                      <div className="col-lg-6">
                        <div className="p-5">
                            <div class="text-center">
                                <h1 className="h4 text-gray-900 mb-2">Welcome to MyWaste</h1>
                                <p className="mb-4">Let's reuse whatever we have now, stop making more of it, take what we gather, and make - whether it's car parts, computer cases, anything that we can use.</p>
                                <p><spam>Ian Somerhalder</spam></p>
                            </div>
                            <hr/>
                          <form onSubmit={handleSubmit} className="user">
                            <div className="form-group">
                              <input type="text" className="form-control form-control-user" id="username"  onChange={e => setEmail(e.target.value)}  placeholder="Enter username..." required/>
                            </div>
                            <div className="form-group">
                              <input type="password" className="form-control form-control-user" id="InputPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} required/>
                            </div>
                            <div className="form-group">
                              <div className="custom-control custom-checkbox small">
                                <input type="checkbox" className="custom-control-input" id="customCheck"/>
                                <label className="custom-control-label" htmlFor="customCheck">Remember Me</label>
                              </div>
                            </div>
                            <button  type="submit" className="btn btn-primary btn-user btn-block">
                              Login
                            </button>
                          </form>
                            <hr/>
                          { errorMessage &&
                            <div className="alert alert-danger"> {errorMessage} </div> }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
         )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}