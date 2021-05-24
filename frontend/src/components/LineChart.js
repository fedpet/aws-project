import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function capitalized(str) {
    return str.charAt(0).toUpperCase() + str.substring(1)
}

class LineChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = LineChart.getDerivedStateFromProps(props, {})
    }

    static getDerivedStateFromProps(props, state) {
        return {
            chartOptions: {
                chart: {
                    type: 'spline'
                },
                title: {
                    text: props.title
                },
                xAxis: {
                    type: 'datetime',
                    title: {
                        text: 'Date'
                    }
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y} Kg</b>'
                },
                series: props.data.map(d => {
                    const data = d.data || []
                    return {
                        name: capitalized(d.type),
                        data: data.map(r => [new Date(r.date).getTime(), r.quantity])
                    }
                })
            }
        }
    }

    render() {
        return <HighchartsReact
                highcharts={Highcharts}
                options={this.state.chartOptions}/>;
    }
}

export default LineChart