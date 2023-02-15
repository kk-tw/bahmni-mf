export interface IDiagnosis {
    order: string;
    certainty: string;
    uuid: string;
}

export interface IDiagnosisSearchResult {
    conceptName: string;
    conceptUuid: string;
    matchedName?: string;
}
