import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import DoughnutChart from "./DoughnutChart.tsx";

jest.mock('chart.js');
jest.mock('react-chartjs-2');

test('Doughnut charts exist', async () => {
    render(<DoughnutChart fillPercent={60}/>)
    const chartUnderlay = await screen.findAllByTestId('doughnut-chart-underlay')
    const chartOverlay = await screen.findAllByTestId('doughnut-chart-overlay')
    expect(chartUnderlay.length).toEqual(1)
    expect(chartOverlay.length).toEqual(1)
});

const titles = ['Test title 1', 'Test title 2', ''];
test.each(titles)('Title text exist', (title) => {
    render(<DoughnutChart fillPercent={60} title={title}/>)
    const titleComponent = screen.getByTestId('doughnut-title')
    expect(titleComponent).toHaveTextContent(title)
});

const fillPercentages = [60, 46, 100, 3];
test.each(fillPercentages)('Fill percent text exists', (fillPercent) => {
    render(<DoughnutChart fillPercent={fillPercent} fillPercentText />);
    const fillPercentTextComponent = screen.getByTestId('doughnut-fill-percent-text');
    expect(fillPercentTextComponent).toHaveTextContent(`${fillPercent}%`);
});

const centerTexts = ['Test text 1', 'test-text-2', 'TEST TEXT 3', 'text that is being tested'];
test.each(centerTexts)('Center text exists', (centerText) => {
    render(<DoughnutChart fillPercent={60} centerText={centerText} />);
    const centerTextComponent = screen.getByTestId('doughnut-center-text');
    expect(centerTextComponent).toHaveTextContent(centerText);
});
