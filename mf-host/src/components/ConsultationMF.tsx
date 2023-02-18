import React, { useEffect, useRef } from 'react';
import mount, { unmount } from '@bahmni-mf/consultation/ConsultationApp';

const ConsultationMF = () => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            mount(ref.current, 'Diagnosis', {
                patient: { uuid: '3ae1ee52-e9b2-4934-876d-30711c0e3e2f' },
                visit: {
                    uuid: '228b811d-3540-4730-b744-10dddd5a9ae8',
                    visitType: { name: 'OPD' },
                },
            });
        }
    }, []);

    return <div ref={ref} />;
};

interface IWindow {
    mountConsultation: typeof mount;
    unmountConsultation: typeof unmount;
}

(window as unknown as IWindow).mountConsultation = mount;
(window as unknown as IWindow).unmountConsultation = unmount;

export default ConsultationMF;
