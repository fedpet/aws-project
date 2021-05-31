import React, { Component } from 'react';
import PieChart from './components/PieChart'
import LineChart from './components/LineChart'

class Statistics extends Component {
    state = {chartData: []}
    componentDidMount() {
       fetch("/api/waste?groupByType=true&includeDataPoints=true")
       .then(response => response.json())
       .then(json => {
           this.setState({chartData: json})
       });
    }

  render() {
    return(
        <div class="row">
          <div class="col-xl-8 col-lg-7">
              <div class="card shadow mb-4">
                  <div class="card-body">
                         <LineChart title="Waste" data={this.state.chartData}/>
                  </div>
              </div>
          </div>

          <div class="col-xl-4 col-lg-5">
              <div class="card shadow mb-4">
                  <div class="card-body">
                    <PieChart title="Waste" data={this.state.chartData}/>
                  </div>
              </div>
          </div>
        </div>
    )
  }
}

export default Statistics