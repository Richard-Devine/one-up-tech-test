import React from 'react';
import './input.css'

interface Props {
    placeholder?: string;
    setTestValue: (value: string) => void;
    value: string;
}
const Input = React.memo(({ placeholder, setTestValue, value }: Props) => {

    const onChangeHandler = (value: string) => {
        const regex = new RegExp('^(?:(\\d+)|(\\d*\\.\\d{0,2}))?$')
        if (regex.test(value)) {
            setTestValue(value)
        }
    }

    return (
        <div>
            <input
                placeholder={placeholder}
                className='input'
                onChange={(e) => onChangeHandler(e.target.value)}
                value={value}
                data-testid={'input'}
            />
        </div>
    )
});



export default Input;