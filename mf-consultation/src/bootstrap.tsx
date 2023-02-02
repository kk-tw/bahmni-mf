import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './containers/App';

let root: Root;

const mount = (el: HTMLElement) => {
    root = createRoot(el);
    root.render(<App />);
};

export const unmount = () => {
    root.unmount();
};

const container = document.getElementById('bahmni-mf-consultation');
if (container) {
    mount(container);
}

export default mount;
