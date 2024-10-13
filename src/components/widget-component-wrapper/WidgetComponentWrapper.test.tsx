import {render, screen} from "@testing-library/react";
import WidgetComponentWrapper from "./WidgetComponentWrapper.tsx";

const titles = ['Test title 1', 'Test title 2', ''];
test.each(titles)('Title text exist', (title) => {
    render(<WidgetComponentWrapper title={title}><></></WidgetComponentWrapper>)
    const titleComponent = screen.getByTestId('widget-component-wrapper-title')
    expect(titleComponent).toHaveTextContent(title)
});