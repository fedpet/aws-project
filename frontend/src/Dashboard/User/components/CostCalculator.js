import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Container from 'react-bootstrap/Container'

class CostCalculator extends Component {
    state = {
        startDate: new Date(),
        totalCost: '',
        currency: '',
        result: ''

    }

    calculateCost () {
       var month = this.state.startDate.getMonth();
       var year = this.state.startDate.getFullYear();
       var accountId = JSON.parse(localStorage.getItem('token')).id;
      fetch("/api/account/" +accountId + "/cost?month="+month, {
           method: 'GET',
           withCredentials: true,
           credentials: 'include',
           headers: {
               'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')).token,
               'Content-Type': 'application/json'
           }
       })
      .then(response => response.json())
      .then(json => {
          this.setState({totalCost: json.cost + " " + json.currency });
      });
    }

    render () {
        return(
        <div className="container">
          <div className="row">
            <div className="col">
                <DatePicker
                  selected={this.state.startDate}
                  dateFormat="MM/yyyy"
                  showMonthYearPicker
                  onChange= {
                    (date) => this.setState({startDate: date})
                  }
                />
            </div>
            <div className="col">
                <button onClick={this.calculateCost.bind(this)} className="btn btn-primary">Calculate</button>
            </div>
            <div className="col">
                <div className="form-group">
                    <input className="form-control" type="text" value={this.state.totalCost} placeholder="Total cost" readOnly />
               </div>
            </div>
          </div>
        </div>
        )
    }
}

export default CostCalculator