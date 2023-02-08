import React, { lazy, Suspense, useState } from 'react';
import { Button } from '@bahmni-mf/components/ComponentLibrary';

const App = () => {
    const ConsultationAppLazy = lazy(
        () => import('../components/ConsultationMF'),
    );

    const [loadConsultation, setLoadConsultation] = useState(false);

    return (
        <>
            <h1>MFE Host</h1>
            <hr />
            {loadConsultation ? (
                <Suspense fallback={<p>Loading...</p>}>
                    <ConsultationAppLazy />
                </Suspense>
            ) : (
                <Button
                    kind="secondary"
                    onClick={() => setLoadConsultation(true)}
                >
                    Load Consultation
                </Button>
            )}
        </>
    );
};

export default App;
