const fetchDiagnosisSuggestions = async (locale: string, searchKey: string) => {
    const response = await fetch(
        `openmrs/ws/rest/emrapi/concept?limit=200&locale=${locale}&term=${searchKey}`,
    );
    return response.json();
};

export const getDiagnosis = async () => {
    const response = await fetch(
        '/openmrs/ws/rest/v1/concept?code=Diagnosis+Concept+Set&source=org.openmrs.module.emrapi&v=custom:(uuid,name,setMembers)',
    );
    return response.json();
};

export default fetchDiagnosisSuggestions;
