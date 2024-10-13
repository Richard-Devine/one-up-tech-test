import './App.css'
import Widget from "./components/widget/Widget.tsx";
import DoughnutChart from "./components/doughnut-chart/DoughnutChart.tsx";
import WidgetComponentWrapper from "./components/widget-component-wrapper/WidgetComponentWrapper.tsx";

function App() {

    return (
        <>
            <Widget header={'Commission Breakdown'}>
                <div className={'commission-totals'}>
                    <WidgetComponentWrapper title='Total Revenue'>
                        <p>£56324</p>
                    </WidgetComponentWrapper>
                    <WidgetComponentWrapper title={'Total Commission'}>
                        <p>£56324</p>
                    </WidgetComponentWrapper>
                </div>
                <WidgetComponentWrapper title={'£0-£5000'} >
                    <DoughnutChart fillPercent={100} fillPercentText
                                   centerText={'Commission: £0'}></DoughnutChart>
                </WidgetComponentWrapper>
                <WidgetComponentWrapper title={'£5000-£10000'}>
                    <DoughnutChart  fillPercent={100} fillPercentText
                                   centerText={'Commission: £200'}></DoughnutChart>
                </WidgetComponentWrapper>
                <WidgetComponentWrapper title={'£10000-£15000'} >
                    <DoughnutChart fillPercent={58} fillPercentText
                                   centerText={'Center text'}></DoughnutChart>
                </WidgetComponentWrapper>
                <WidgetComponentWrapper title={'£15000-£20000'} >
                    <DoughnutChart fillPercent={0}
                                   centerText={'£4632 to unlock band 4'}></DoughnutChart>
                </WidgetComponentWrapper>
                <WidgetComponentWrapper title={'£20000+'} >
                    <DoughnutChart fillPercent={0} fillPercentText
                                   centerText={'Center text'}></DoughnutChart>
                </WidgetComponentWrapper>
            </Widget>
        </>
    )
}

export default App
