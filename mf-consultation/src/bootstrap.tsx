import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './containers/App';
import './utils/userDefaults';

let root: Root;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mount = (el: HTMLElement, renderComponent: string, options?: any) => {
    root = createRoot(el);
    root.render(<App renderComponent={renderComponent} options={options} />);
};

export const unmount = () => {
    root.unmount();
};

const container = document.getElementById('bahmni-mf-consultation');
if (container) {
    mount(container, 'Diagnosis', {
        patient: { uuid: '3ae1ee52-e9b2-4934-876d-30711c0e3e2f' },
        visit: {
            uuid: '228b811d-3540-4730-b744-10dddd5a9ae8',
            visitType: { name: 'OPD' },
        },
    });
}

export default mount;
