import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './containers/App';

let root: Root;

const mount = (el: HTMLElement, renderComponent: string) => {
    root = createRoot(el);
    root.render(<App renderComponent={renderComponent} />);
};

export const unmount = () => {
    root.unmount();
};

const container = document.getElementById('bahmni-mf-consultation');
if (container) {
    mount(container, 'Diagnosis');
}

export default mount;
