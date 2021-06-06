import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import NoDataToDisplay from 'highcharts/modules/no-data-to-display'
NoDataToDisplay(Highcharts)

function capitalized(str) {
    return str.charAt(0).toUpperCase() + str.substring(1)
}

class PieChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = PieChart.getDerivedStateFromProps(props, {})
    }

    static getDerivedStateFromProps(props, state) {
        return {
            chartOptions: {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y} Kg</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.y} Kg'
                        }
                    }
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
        return <HighchartsReact
                highcharts={Highcharts}
                options={this.state.chartOptions}/>;
    }
}

export default PieChart