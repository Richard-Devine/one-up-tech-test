import './App.css'
import Widget from "./components/widget/Widget.tsx";
import DoughnutChart from "./components/pie-chart/DoughnutChart.tsx";

function App() {

  return (
    <>
      <Widget header={'Commission Breakdown'}>
        <DoughnutChart title={'Band 1'} fillPercent={99} fillPercentText centerText={'Center text'} tooltip={'tooltip test'}></DoughnutChart>
      </Widget>
    </>
  )
}

export default App
