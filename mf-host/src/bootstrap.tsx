import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './containers/App';

const container = document.getElementById('bahmni-mf-host') as HTMLElement;
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
