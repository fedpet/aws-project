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
    <div className="row statistics-area">
       <div className="col-xl-8 col-lg-7">
           <LineChart title="Waste" data={this.state.chartData}/>
       </div>
       <div className="col-xl-4 col-lg-5">
            <PieChart title="Waste" data={this.state.chartData}/>
       </div>
     </div>
    )
  }
}

export default Statistics