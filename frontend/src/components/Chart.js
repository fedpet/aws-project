import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

function capitalized(str) {
    return str.charAt(0).toUpperCase() + str.substring(1)
}

class Chart extends React.Component {
    static getDerivedStateFromProps(props, state) {
        return {
            chartOptions: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                title: {
                    text: props.title
                },
                series: [{
                    name: 'Quantity',
                    data: props.data.map(d => {return {name:capitalized(d.type), y:d.total}})
                }]
            }
        }
    }

    render() {
        const { chartOptions } = this.state
        return <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                key={chartOptions}/>;
    }
}

export default Chart