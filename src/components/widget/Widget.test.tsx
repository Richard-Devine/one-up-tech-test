import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import Widget from "./Widget.tsx";

const headers = ['Test header 1', 'Test Header 2', 'test-header-3']
test.each(headers)('Widget header is rendering correctly', (testHeader) => {
    render(<Widget header={testHeader}><></></Widget>)
    const header = screen.getByTestId('header-container')
    expect(header).toHaveTextContent(testHeader)
})