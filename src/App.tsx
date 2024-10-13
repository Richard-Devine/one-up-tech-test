import './App.css'
import Widget from "./components/widget/Widget.tsx";
import DoughnutChart from "./components/doughnut-chart/DoughnutChart.tsx";
import WidgetComponentWrapper from "./components/widget-component-wrapper/WidgetComponentWrapper.tsx";
import Input from "./components/input/Input.tsx";
import {useCallback, useEffect, useState} from "react";
import calculateCommission from "./mockApi.ts";

interface CommissionBand {
    rate: number,
    commission: number,
    threshold: number,
    title: string
}

interface Commission {
    [key: string]: CommissionBand;
}

function App() {

    const [testValue, setTestValue] = useState('')
    const [commissionRatesAndValues, setCommissionRatesAndValues] = useState<Commission | null>(null)
    const {bandOne, bandTwo, bandThree, bandFour, bandFive} = commissionRatesAndValues ?? {}
    const testValueToPence = (parseFloat(testValue) * 100 | 0)

    useEffect(() => {
        const commission = calculateCommission(0)
        setCommissionRatesAndValues(commission)
    }, []);

    const onChangeHandler = (value: string) => {
        const valueInPence = Number(parseFloat(value) * 100)
        setTestValue(valueInPence.toString())
        const commission = calculateCommission(valueInPence)
        setCommissionRatesAndValues(commission)
    }

    const getPercentage = (partNumber: number, wholeNumber: number) => {
        return Math.floor(partNumber / wholeNumber * 100);
    }

    const penceToPounds = (pence: number) => {
        return (pence / 100).toFixed(2);
    }
    const amountToUnlock = (threshold: number) => {
        return penceToPounds(threshold - testValueToPence)
    }

    const calculateTotalCommission = useCallback(() => {
        let total = 0
        if (commissionRatesAndValues) {
            for (const key of Object.keys(commissionRatesAndValues)) {
                total += commissionRatesAndValues[key].commission
            }
        }
        return total
    }, [commissionRatesAndValues])

    const totalCommission = penceToPounds(calculateTotalCommission())

    return (
        <>
            <Widget header={'Commission Breakdown'}>
                {!commissionRatesAndValues ? <>Loading...</> :
                    <>
                        <div className={'commission-totals'}>
                            <WidgetComponentWrapper title='Revenue'>
                                <Input
                                    placeholder='Enter amount (£)'
                                    value={testValue}
                                    onChangeHandler={(value) => onChangeHandler(value)}/>
                            </WidgetComponentWrapper>
                            <WidgetComponentWrapper title={'Total Commission'}>
                                <p>£{totalCommission}</p>
                            </WidgetComponentWrapper>
                        </div>

                        <WidgetComponentWrapper title={`${bandOne.title} - ${bandOne.rate}%`}>
                            <DoughnutChart
                                fillPercent={
                                    testValueToPence >= bandOne.threshold ?
                                        100 :
                                        getPercentage(testValueToPence, bandOne.threshold)
                                }
                                fillPercentText
                                centerText={
                                    testValueToPence >= bandOne.threshold ?
                                        `Commission: £${penceToPounds(bandOne.commission)}` :
                                        `£${amountToUnlock(bandOne.threshold)} to unlock`}>
                            </DoughnutChart>
                        </WidgetComponentWrapper>

                        <WidgetComponentWrapper title={`${bandTwo.title} - ${bandTwo.rate}%`}>
                            <DoughnutChart
                                fillPercent={
                                    testValueToPence >= bandTwo.threshold ?
                                        100 :
                                        getPercentage(testValueToPence, bandTwo.threshold)
                                }
                                fillPercentText
                                centerText={
                                    testValueToPence >= bandTwo.threshold ?
                                        `Commission: £${penceToPounds(bandTwo.commission)}` :
                                        `£${amountToUnlock(bandTwo.threshold)} to unlock`}>
                            </DoughnutChart>
                        </WidgetComponentWrapper>

                        <WidgetComponentWrapper title={`${bandThree.title} - ${bandThree.rate}%`}>
                            <DoughnutChart
                                fillPercent={
                                    testValueToPence >= bandThree.threshold ?
                                        100 :
                                        getPercentage(testValueToPence, bandThree.threshold)
                                }
                                fillPercentText
                                centerText={
                                    testValueToPence >= bandThree.threshold ?
                                        `Commission: £${penceToPounds(bandThree.commission)}` :
                                        `£${amountToUnlock(bandThree.threshold)} to unlock`}>
                            </DoughnutChart>
                        </WidgetComponentWrapper>

                        <WidgetComponentWrapper title={`${bandFour.title} - ${bandFour.rate}%`}>
                            <DoughnutChart
                                fillPercent={
                                    testValueToPence >= bandFour.threshold ?
                                        100 :
                                        getPercentage(testValueToPence, bandFour.threshold)
                                }
                                fillPercentText
                                centerText={
                                    testValueToPence >= bandFour.threshold ?
                                        `Commission: £${penceToPounds(bandFour.commission)}` :
                                        `£${amountToUnlock(bandFour.threshold)} to unlock`}>
                            </DoughnutChart>
                        </WidgetComponentWrapper>

                        <WidgetComponentWrapper title={`${bandFive.title} - ${bandFive.rate}%`}>
                            <DoughnutChart
                                fillPercent={
                                    testValueToPence >= bandFive.threshold ?
                                        100 :
                                        getPercentage(testValueToPence, bandFive.threshold)
                                }
                                fillPercentText
                                centerText={
                                    testValueToPence >= bandFive.threshold ?
                                        `Commission: £${penceToPounds(bandFive.commission)}` :
                                        `£${amountToUnlock(bandFive.threshold)} to unlock`}>
                            </DoughnutChart>
                        </WidgetComponentWrapper></>
                }
            </Widget>
        </>
    )
}

export default App
