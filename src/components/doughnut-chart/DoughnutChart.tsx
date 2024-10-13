import React from 'react'
import 'chart.js/auto';
import {Doughnut} from 'react-chartjs-2'
import './doughnutChart.css'

interface Props {
    title?: string;
    fillPercent: number;
    fillPercentText?: boolean;
    centerText?: string;
    tooltip?: string
}

const colours = {
    red:'#EE5C58',
    green:'#34B53A',
    yellow:'#F1B63A',
    grey: '#e0e0e0'
}

const DoughnutChart = React.memo((
    {
        fillPercent,
        fillPercentText,
        centerText = '',
    }: Props) => {

    const options = {
        cutout: '85%',
        plugins: {
            tooltip: {
                enabled: false
            },
        },
    }

    const backgroundColour = (fillPercent: number): string => {
        if (fillPercent <= 40) return colours.red
        if (fillPercent < 99) return colours.yellow
        return colours.green
    }

    return (
        <div className={'doughnut-container'} data-testid='doughtnut-container'>
            <div className={'doughnut-chart-underlay'} data-testid='doughnut-chart-underlay'>
                <Doughnut
                    options={{
                        ...options, animation: false
                    }}
                    data={{
                        datasets: [{
                            data: [100],
                            backgroundColor: [colours.grey],
                            hoverBackgroundColor: [colours.grey],
                            borderWidth: 0
                        }]
                    }}/>
                <div className={'doughnut-chart-overlay'} data-testid='doughnut-chart-overlay'>
                    <Doughnut
                        options={options}
                        data={{
                            datasets: [{
                                data: [fillPercent, 100 - fillPercent],
                                backgroundColor: [backgroundColour(fillPercent), 'transparent'],
                                hoverBackgroundColor: [backgroundColour(fillPercent), 'transparent'],
                                borderRadius: fillPercent < 100 ? 10 : 0,
                                borderWidth: 0
                            }]
                        }}/>
                    <div className={'doughnut-chart-text-container'}>
                        {fillPercentText ?
                            <p className='fill-percent-text'
                               data-testid={'doughnut-fill-percent-text'}>{fillPercent}%</p>
                            : null
                        }
                        <p className='center-text' data-testid={'doughnut-center-text'}>{centerText}</p>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default DoughnutChart;