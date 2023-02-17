import {
    FETCH_DIAGNOSIS_SUGGESTIONS,
    GET_DIAGNOSIS,
    SAVE_DIAGNOSIS,
} from '../constants/queries';
import { IDiagnosis } from '../types/diagnosis';
import { IPatient } from '../types/patient';
import { IVisit } from '../types/visit';
import { getLocation } from '../utils/helpers';
import { getData, postData } from '../utils/request';

interface ISaveDiagnosisParams {
    diagnosis: IDiagnosis;
    patient: IPatient;
    visit: IVisit;
}

const fetchDiagnosisSuggestions = async (locale: string, searchKey: string) => {
    const response = await getData(
        `${FETCH_DIAGNOSIS_SUGGESTIONS}?limit=200&locale=${locale}&term=${searchKey}`,
    );
    return response;
};

export const getDiagnosis = async (patient: IPatient) => {
    const response = await getData(
        `${GET_DIAGNOSIS}?patientUuid=${patient.uuid}`,
    );

    return response;
};

export const saveDiagnosis = async ({
    diagnosis,
    patient,
    visit,
}: ISaveDiagnosisParams) => {
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
        encounterDateTime: new Date().getTime(),
        encounterTypeUuid: '81852aee-3f10-11e4-adec-0800271c1b75',
        encounterUuid: '2d61597f-12bb-4707-ad6b-193de0a8a510',
        extensions: {
            mdrtbSpecimen: [],
        },
        locationUuid: getLocation().uuid,
        observations: [],
        orders: [],
        patientUuid: patient.uuid,
        providers: [
            {
                encounterRoleUuid: 'a0b03050-c99b-11e0-9572-0800200c9a66',
                name: 'Super Man',
                uuid: 'c1c26908-3f10-11e4-adec-0800271c1b75',
            },
        ],
        visitType: visit.visitType.name || 'OPD',
        visitUuid: visit.uuid,
    };
    const response = await postData(SAVE_DIAGNOSIS, req);
    return response;
};

export default fetchDiagnosisSuggestions;
