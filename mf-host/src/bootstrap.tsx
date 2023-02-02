import React from 'react';
import { createRoot } from 'react-dom/client';
import mount, { unmount } from '@bahmni-mf/consultation/ConsultationApp';
import App from './containers/App';

interface Window {
    mountConsultation: typeof mount;
    unmountConsultation: typeof unmount;
}

(window as unknown as Window).mountConsultation = mount;
(window as unknown as Window).unmountConsultation = unmount;

const container = document.getElementById('bahmni-mf-host') as HTMLElement;
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}
