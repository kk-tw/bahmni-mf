import {
    FETCH_DIAGNOSIS_SUGGESTIONS,
    GET_DIAGNOSIS,
    SAVE_DIAGNOSIS,
} from '../constants/queries';
import { IDiagnosis } from '../types/diagnosis';

const fetchDiagnosisSuggestions = async (locale: string, searchKey: string) => {
    const response = await fetch(
        `${FETCH_DIAGNOSIS_SUGGESTIONS}?limit=200&locale=${locale}&term=${searchKey}`,
    );
    return response.json();
};

export const getDiagnosis = async () => {
    const response = await fetch(
        `${GET_DIAGNOSIS}?patientUuid=3ae1ee52-e9b2-4934-876d-30711c0e3e2f`,
    );
    return response.json();
};

export const saveDiagnosis = async (diagnosis: IDiagnosis) => {
    const req = {
        bahmniDiagnoses: [
            {
                certainty: diagnosis.certainty,
                codedAnswer: {
                    uuid: diagnosis.uuid,
                },
                comments: '',
                diagnosisDateTime: null,
                diagnosisStatusConcept: null,
                existingObs: null,
                order: diagnosis.order,
            },
        ],
        context: {},
        disposition: null,
        drugOrders: [],
        encounterDateTime: 1676385067000,
        encounterTypeUuid: '81852aee-3f10-11e4-adec-0800271c1b75',
        encounterUuid: '2d61597f-12bb-4707-ad6b-193de0a8a510',
        extensions: {
            mdrtbSpecimen: [],
        },
        locationUuid: 'baf7bd38-d225-11e4-9c67-080027b662ec',
        observations: [],
        orders: [],
        patientUuid: '3ae1ee52-e9b2-4934-876d-30711c0e3e2f',
        providers: [
            {
                encounterRoleUuid: 'a0b03050-c99b-11e0-9572-0800200c9a66',
                name: 'Super Man',
                uuid: 'c1c26908-3f10-11e4-adec-0800271c1b75',
            },
        ],
        visitType: 'OPD',
        visitUuid: '228b811d-3540-4730-b744-10dddd5a9ae8',
    };
    const response = await fetch(SAVE_DIAGNOSIS, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        body: JSON.stringify(req),
    });

    return response.json();
};

export default fetchDiagnosisSuggestions;
