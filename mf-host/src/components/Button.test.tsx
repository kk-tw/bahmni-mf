import React from 'react';
import { cleanup, render } from '@testing-library/react';
import Button from './Button';

describe('<Button />', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render a prop', () => {
        const id = 'testId';
        const { container } = render(<Button id={id} />);
        expect(
            (container.querySelector('button') as HTMLButtonElement).id,
        ).toEqual(id);
    });

    it('should render its text', () => {
        const children = 'Hello';
        const { container, queryByText } = render(<Button>{children}</Button>);
        const { childNodes } = container.querySelector(
            'button',
        ) as HTMLButtonElement;
        expect(childNodes).toHaveLength(1);
        expect(queryByText(children)).not.toBeNull();
    });
});
