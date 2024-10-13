import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import Input from "./Input.tsx";
import {userEvent} from "@testing-library/user-event";
import {useState} from "react";

const inputValues = [
    {value: '23.56', expect: '23.56'},
    {value: '.363', expect: '.36'},
    {value: '252352', expect: '252352'},
    {value: '.34', expect: '.34'},
    {value: 'wrtw', expect: ''},
    {value: '3.ggsg', expect: '3.'},
    {value: '24thfh', expect: '24'}
]
test.each(inputValues)('Input regex working', async (inputValue) => {
    const MockParentComponent = () => {
        const [value, setValue] = useState('')
        return <Input onChangeHandler={setValue} value={value}/>
    }
    render(<MockParentComponent />)
    const input = screen.getByTestId('input')
    await userEvent.type(input, inputValue.value)
    expect(input).toHaveValue(inputValue.expect)
})