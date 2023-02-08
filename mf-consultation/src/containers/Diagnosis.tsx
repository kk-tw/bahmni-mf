import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import {
    Button,
    FormGroup,
    ModalBody,
    ModalHeader,
    Search,
    SlidingModal,
    ModalFooter,
    RadioButton,
    RadioButtonGroup,
    AddIcon,
} from '@bahmni-mf/components/ComponentLibrary';
import '../i18n';
import fetchDiagnosisSuggestions from '../queries/diagnosis';

interface DiagnoisInfo {
    searchValue: string;
    orderValue: string;
}

const Diagnosis = () => {
    const { t: translate } = useTranslation();
    const [modelOpen, setModalOpen] = useState(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const [orderValue, setOrderValue] = useState<string>('');

    const addDiagnosis = () => {
        const addDiagnosisEvent = new CustomEvent<DiagnoisInfo>(
            'ADD_DIAGNOSIS',
            {
                detail: { searchValue, orderValue },
            },
        );
        window.dispatchEvent(addDiagnosisEvent);
    };

    const closeSlider = () => {
        setSearchValue('');
        setOrderValue('');
    };

    const { isLoading, error, data } = useQuery(
        'diagnoisSuggestion',
        fetchDiagnosisSuggestions,
        {
            refetchOnWindowFocus: false,
        },
    );

    console.log(isLoading, error, data);

    return (
        <>
            <Button
                onClick={() => setModalOpen(true)}
                size="lg"
                renderIcon={AddIcon}
            >
                {translate('ADD_DIAGNOSIS', { ns: 'clinical' })}
            </Button>
            <SlidingModal open={modelOpen} onClose={() => setModalOpen(false)}>
                <ModalHeader
                    title={translate('RECORD_DIAGNOSIS')}
                ></ModalHeader>
                <ModalBody>
                    <FormGroup
                        legendText={translate('CLINICAL_DIAGNOSIS') || ''}
                    >
                        <Search
                            labelText={translate('SEARCH_DIAGNOSIS') as string}
                            placeholder="Search Diagnoses"
                            value={searchValue}
                            onChange={event =>
                                setSearchValue(event.target.value)
                            }
                        ></Search>
                    </FormGroup>
                    {searchValue.length ? (
                        <RadioButtonGroup
                            legendText={translate('CLINICAL_ORDER')}
                            name="order"
                            onChange={value => setOrderValue(value as string)}
                        >
                            <RadioButton
                                labelText={translate(
                                    'CLINICAL_DIAGNOSIS_ORDER_PRIMARY',
                                )}
                                value="primary"
                                checked={orderValue === 'primary'}
                            />
                            <RadioButton
                                labelText={translate(
                                    'CLINICAL_DIAGNOSIS_ORDER_SECONDARY',
                                )}
                                value="secondary"
                                checked={orderValue === 'secondary'}
                            />
                        </RadioButtonGroup>
                    ) : null}
                </ModalBody>
                <ModalFooter
                    primaryButtonText={translate('SAVE') || ''}
                    secondaryButtonText={translate('CANCEL') || ''}
                    onRequestSubmit={addDiagnosis}
                    onRequestClose={closeSlider}
                    primaryButtonDisabled={
                        searchValue.length < 1 || orderValue.length < 1
                    }
                ></ModalFooter>
            </SlidingModal>
        </>
    );
};

export default React.memo(Diagnosis);
