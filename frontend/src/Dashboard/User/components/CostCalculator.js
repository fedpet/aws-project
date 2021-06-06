import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class CostCalculator extends Component {
    state = {
        startDate: new Date(),
   }

    calculateCost (date) {
       var month = date.getMonth() + 1;
       var year = date.getFullYear();
       var accountId = JSON.parse(localStorage.getItem('token')).id;
      fetch("/api/account/" +accountId + "/cost?month="+month+"&year="+year, {
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
                  onChange= {(date) => this.calculateCost(date)}
                />
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