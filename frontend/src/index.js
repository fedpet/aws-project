import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './Dashboard/Admin/AdminDashboard.scss';

//Boostrap Libs
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

//Redux
import { Provider } from 'react-redux';
import { Store } from './redux/store';
import { dom } from '@fortawesome/fontawesome-svg-core';
dom.watch();

ReactDOM.render(
<Provider store={Store}>
    <App />
</Provider> , document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();