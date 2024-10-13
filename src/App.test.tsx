import React from 'react';
import {render, screen} from "@testing-library/react";
import App from './App.tsx';
import calculateCommission from "./mockApi.ts";
import {userEvent} from "@testing-library/user-event";

jest.mock('./components/widget/Widget.tsx', () => ({children}: { children: React.ReactNode }) => (
    <div data-testid='widget-container'>{children}</div>
))
jest.mock('./components/widget-component-wrapper/WidgetComponentWrapper.tsx', () => ({children}: {
    children: React.ReactNode
}) => (
    <div data-testid='widget-component-wrapper'>{children}</div>
))
jest.mock('./components/doughnut-chart/DoughnutChart.tsx', () => ({fillPercent, centerText}: {fillPercent: number, centerText: string}) => (
    <div data-testid='doughnut-chart'>
        <div data-testid='doughnut-fill-percent'>{fillPercent}</div>
        <div data-testid='doughnut-center-text'>{centerText}</div>
    </div>
))
jest.mock('./components/input/Input.tsx', () => (
    {onChangeHandler, value}: {onChangeHandler: (value: string) => void, value:string}) => (
    <input data-testid='input' onChange={(e) => onChangeHandler(e.target.value)} value={value}/>
))

jest.mock('./mockApi.ts', () => ({
    __esModule: true,
    default: jest.fn()
}))

beforeEach(() => {
    jest.resetAllMocks();
})

test('App renders loading when waiting for data', async () => {
    render(<App/>)
    const widgetContainer = await screen.findAllByTestId('widget-container')
    const widgetComponentWrapper = screen.queryAllByTestId('widget-component-wrapper')
    const doughnutChart = screen.queryAllByTestId('doughnut-chart')
    const input = screen.queryAllByTestId('input')
    expect(widgetContainer.length).toEqual(1)
    expect(widgetContainer[0]).toHaveTextContent('Loading...')
    expect(widgetComponentWrapper.length).toEqual(0)
    expect(doughnutChart.length).toEqual(0)
    expect(input.length).toEqual(0)
})

test('App renders with all components', async () => {
    (calculateCommission as jest.Mock).mockReturnValue({
        bandFive: {title: 'Band 5', threshold: 2000000, rate: 0.25, name: 'bandFive', commission: 0},
        bandFour: {title: 'Band 4', threshold: 1500000, rate: 0.20, name: 'bandFour', commission: 0},
        bandThree: {title: 'Band 3', threshold: 1000000, rate: 0.15, name: 'bandThree', commission: 0},
        bandTwo: {title: 'Band 2', threshold: 500000, rate: 0.10, name: 'bandTwo', commission: 0},
        bandOne: {title: 'Band 1', threshold: 0, rate: 0.00, name: 'bandOne', commission: 0}
    })
    render(<App/>)
    const widgetContainer = await screen.findAllByTestId('widget-container')
    const widgetComponentWrapper = await screen.findAllByTestId('widget-component-wrapper')
    const doughnutChart = await screen.findAllByTestId('doughnut-chart')
    const input = await screen.findAllByTestId('input')
    expect(widgetContainer.length).toEqual(1)
    expect(widgetComponentWrapper.length).toEqual(7)
    expect(doughnutChart.length).toEqual(5)
    expect(input.length).toEqual(1)
})

const defaultTests = [
    {doughNut: 0, fillPercent: '100', centerText: 'Commission: £0.00'},
    {doughNut: 1, fillPercent: '0', centerText: '£5000.00 to unlock'},
    {doughNut: 2, fillPercent: '0', centerText: '£10000.00 to unlock'},
    {doughNut: 3, fillPercent: '0', centerText: '£15000.00 to unlock'},
    {doughNut: 4, fillPercent: '0', centerText: '£20000.00 to unlock'},
]
test.each(defaultTests)('App renders with default values', async (defaultTest) => {
    (calculateCommission as jest.Mock).mockReturnValue({
        bandFive: {title: 'Band 5', threshold: 2000000, rate: 0.25, name: 'bandFive', commission: 0},
        bandFour: {title: 'Band 4', threshold: 1500000, rate: 0.20, name: 'bandFour', commission: 0},
        bandThree: {title: 'Band 3', threshold: 1000000, rate: 0.15, name: 'bandThree', commission: 0},
        bandTwo: {title: 'Band 2', threshold: 500000, rate: 0.10, name: 'bandTwo', commission: 0},
        bandOne: {title: 'Band 1', threshold: 0, rate: 0.00, name: 'bandOne', commission: 0}
    })
    render(<App/>)
    const doughnutFillPercent = await screen.findAllByTestId('doughnut-fill-percent')
    const doughnutCenterText = await screen.findAllByTestId('doughnut-center-text')
    expect(calculateCommission).toHaveBeenCalledTimes(1)
    expect(doughnutFillPercent[defaultTest.doughNut]).toHaveTextContent(defaultTest.fillPercent)
    expect(doughnutCenterText[defaultTest.doughNut]).toHaveTextContent(defaultTest.centerText)
})

test('Input change calls API', async () => {
    (calculateCommission as jest.Mock).mockReturnValue({
        bandFive: {title: 'Band 5', threshold: 2000000, rate: 0.25, name: 'bandFive', commission: 0},
        bandFour: {title: 'Band 4', threshold: 1500000, rate: 0.20, name: 'bandFour', commission: 0},
        bandThree: {title: 'Band 3', threshold: 1000000, rate: 0.15, name: 'bandThree', commission: 0},
        bandTwo: {title: 'Band 2', threshold: 500000, rate: 0.10, name: 'bandTwo', commission: 0},
        bandOne: {title: 'Band 1', threshold: 0, rate: 0.00, name: 'bandOne', commission: 0}
    })
    render(<App/>)
    const input = screen.getByTestId('input')
    expect(calculateCommission).toHaveBeenCalledTimes(1)
    await userEvent.type(input, '2')
    expect(calculateCommission).toHaveBeenCalledTimes(2)
})