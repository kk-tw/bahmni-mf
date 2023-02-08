const fetchDiagnosisSuggestions = async () => {
    const response = await fetch(
        '/openmrs/ws/rest/v1/concept?code=Diagnosis+Concept+Set&source=org.openmrs.module.emrapi&v=custom:(uuid,name,setMembers)',
    );
    return response.json();
};

export default fetchDiagnosisSuggestions;
