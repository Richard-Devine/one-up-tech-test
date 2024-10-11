import './App.css'
import Widget from "./components/widget/Widget.tsx";
import DoughnutChart from "./components/doughnut-chart/DoughnutChart.tsx";

function App() {

    return (
        <>
            <Widget header={'Commission Breakdown'}>
                <DoughnutChart title={'£0-£5000'} fillPercent={100} fillPercentText centerText={'Commission: £0'}></DoughnutChart>
                <DoughnutChart title={'£5000-£10000'} fillPercent={100} fillPercentText centerText={'Commission: £200'}></DoughnutChart>
                <DoughnutChart title={'£10000-£15000'} fillPercent={58} fillPercentText centerText={'Center text'}></DoughnutChart>
                <DoughnutChart title={'£15000-£20000'} fillPercent={0} centerText={'£4632 to unlock band 4'}></DoughnutChart>
                <DoughnutChart title={'£20000+'} fillPercent={0} fillPercentText centerText={'Center text'}></DoughnutChart>
            </Widget>
        </>
    )
}

export default App
