import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';


class CostCalculator extends Component {

  constructor (props) {
    super(props)
    this.state = {
      startDate: new Date(),
      totalCost: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    })
  }

  componentDidMount() {
    this.calculateCost();
    this.handleChartUpdate();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.startDate !== this.state.startDate) {
        this.calculateCost();
        this.handleChartUpdate();
    }
  }

  getPickerDate() {
     return this.state.startDate
  }

    handleChartUpdate() {
       var accountId = JSON.parse(localStorage.getItem('token')).id;
       var month = this.state.startDate.getMonth();
       var year = this.state.startDate.getFullYear();
       var from = moment(new Date(year, month, 1)).format('YYYY-MM-DD');
       var to = moment(new Date(year, month + 1, 0)).format('YYYY-MM-DD');
       fetch("/api/waste?account="+accountId+"&groupByType=true&includeDataPoints=true&from="+from+"&to="+to)
       .then(response => response.json())
       .then(json => {
           this.props.makeUpdateChartData(json)
       });
    }


   calculateCost() {
       var month = this.state.startDate.getMonth() + 1;
       var year = this.state.startDate.getFullYear();
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
          this.setState({totalCost: json.cost });
      });
   }

    render () {
        return(
        <div className="container">
          <div className="row d-flex justify-content-center text-center  align-items-center">
            <div className="col">
                    <DatePicker
                      className="form-control"
                      selected={this.state.startDate}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      onChange = {this.handleChange}
                    />
            </div>
            <div className="col">
                <div>
                  <p className="totalCost"><span>Total cost: </span>{this.state.totalCost}&euro;</p>
               </div>
            </div>
          </div>
        </div>
        )
    }
}

export default CostCalculator