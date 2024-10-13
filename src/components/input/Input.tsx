import React from 'react';
import './input.css'

interface Props {
    placeholder?: string;
    onChangeHandler: (value: string) => void;
    value: string;
}
const Input = React.memo(({ placeholder, onChangeHandler, value }: Props) => {

    const regexCheck = (value: string) => {
        const regex = new RegExp('^(?:(\\d+)|(\\d*\\.\\d{0,2}))?$')
        if (regex.test(value)) {
            onChangeHandler(value)
        }
    }

    return (
        <div>
            <input
                placeholder={placeholder}
                className='input'
                onChange={(e) => regexCheck(e.target.value)}
                value={value}
                name={'revenue-input'}
                data-testid={'input'}
            />
        </div>
    )
});



export default Input;