import React, { useEffect } from 'react';
import mount from '@bahmni-mf/consultation/ConsultationApp';

const App = () => {
    useEffect(() => {
        const consultationContainer = document.querySelector(
            '#app',
        ) as HTMLElement;
        if (consultationContainer) {
            mount(consultationContainer);
        }
    }, []);

    return (
        <>
            <h1>MFE Host</h1>
            <hr />
            <div id="app"></div>
        </>
    );
};

export default App;
