import React, { useEffect, useRef } from 'react';
import { importRemote } from '@module-federation/utilities';

const ConsultationMF = () => {
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            importRemote<any>({
                url: 'http://localhost:9001',
                scope: 'bahmni_mf_consultation',
                module: 'ConsultationApp',
            }).then(({ default: mount, unmount }) => {
                interface Window {
                    mountConsultation: typeof mount;
                    unmountConsultation: typeof unmount;
                }

                (window as unknown as Window).mountConsultation = mount;
                (window as unknown as Window).unmountConsultation = unmount;
                mount(ref.current);
            });
        }
    }, []);

    return <div ref={ref} />;
};

export default ConsultationMF;
