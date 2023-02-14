import React, { useEffect, useRef } from 'react';
import mount, { unmount } from '@bahmni-mf/consultation/ConsultationApp';

const ConsultationMF = () => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            mount(ref.current, 'Diagnosis');
        }
    }, []);

    return <div ref={ref} />;
};

interface Window {
    mountConsultation: typeof mount;
    unmountConsultation: typeof unmount;
}

(window as unknown as Window).mountConsultation = mount;
(window as unknown as Window).unmountConsultation = unmount;

export default ConsultationMF;
