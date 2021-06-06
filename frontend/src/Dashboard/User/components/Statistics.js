import React, { Component } from 'react';
import PieChart from '../../../components/PieChart'
import LineChart from '../../../components/LineChart'
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import moment from 'moment';
import CostCalculator from "./CostCalculator"

class Statistics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: []
        }
        this.updateChartData = this.updateChartData.bind(this);
    }

    updateChartData(data) {
        this.setState({chartData: data})
    }
    
    UNSAFE_componentWillReceiveProps(props) {
        if(this.state.chartData !== props.receiveChartData) {
            this.setState({chartData: props.receiveChartData})
        }
    }

  render() {
    return(
        <div>
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