import React from 'react';
import './widgetComponentWrapper.css'

interface Props {
    children: React.ReactNode
    title?: string;
    className?: string;
}

const WidgetComponentWrapper = React.memo(({children, className, title}: Props) => {
    return (
        <div className={`widget-component-wrapper ${className}`}>
            <div className={'widget-component-wrapper-title'}>
                <p data-testid={'widget-component-wrapper-title'}>{title}</p>
            </div>
            {children}
        </div>
    );
});

export default WidgetComponentWrapper;