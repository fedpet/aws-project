import React, { Component } from 'react';
import PieChart from '../../../components/PieChart'
import LineChart from '../../../components/LineChart'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';

class Statistics extends Component {
    state = {
        chartData: []
    }
    componentDidMount(event,picker) {
       var accountId = JSON.parse(localStorage.getItem('token')).id;
       fetch("/api/waste?account="+accountId+"&groupByType=true&includeDataPoints=true&from="+moment().subtract(60, 'days').format('YYYY-MM-DD')+"&to="+moment().format('YYYY-MM-DD'))
       .then(response => response.json())
       .then(json => {
           console.warn("chart data " + json)
           this.setState({chartData: json})
       });
    }

  handleFilterChartsByDate(event, picker) {
        var accountId = JSON.parse(localStorage.getItem('token')).id;
       fetch("/api/waste?account="+accountId+"&groupByType=true&includeDataPoints=true&from="+moment(picker.startDate).format('YYYY-MM-DD')+"&to="+moment(picker.endDate).format('YYYY-MM-DD'))
       .then(response => response.json())
       .then(json => {
           this.setState({chartData: json})
       });
  }

  render() {
    return(
        <div>
          <div className="d-inline-flex p-2">
              <DateRangePicker
                  initialSettings={{ startDate: moment().subtract(60, 'days'), endDate: moment() }}
                  onApply={this.handleFilterChartsByDate.bind(this)}
                >
                  <input type="text" className="form-control" />
              </DateRangePicker>
          </div>

            <div className="row">
              <div className="col-xl-8 col-lg-7">
                  <div className="card shadow mb-4">
                      <div className="card-body">
                             <LineChart title="Waste" data={this.state.chartData}/>
                      </div>
                  </div>
              </div>

              <div className="col-xl-4 col-lg-5">
                  <div className="card shadow mb-4">
                      <div className="card-body">
                        <PieChart title="Waste" data={this.state.chartData}/>
                      </div>
                  </div>
              </div>
            </div>
        </div>
    )
  }
}

export default Statistics