import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './containers/App';

const mount = (el: HTMLElement) => {
    const root = createRoot(el);
    root.render(<App />);
};

const container = document.getElementById('bahmni-mf-component-library');
if (container) {
    mount(container);
}

export default mount;
