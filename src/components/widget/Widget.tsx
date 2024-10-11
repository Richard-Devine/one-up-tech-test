import React from 'react';
import './widget.css'

interface Props {
    header: string;
    children: React.ReactNode
}

const Widget = React.memo(({header, children}: Props) => {
    return (
        <div className='widget-container'>
            <div className='widget-header'>
                <h3 data-testid={'header-container'}>{header}</h3>
            </div>
            {children}
        </div>
    )
});

export default Widget;