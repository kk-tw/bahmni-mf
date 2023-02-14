import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import {
    Button,
    ModalBody,
    ModalHeader,
    SlidingModal,
    ModalFooter,
    RadioButton,
    RadioButtonGroup,
    AddIcon,
} from '@bahmni-mf/components/ComponentLibrary';
import AutoComboBox from '../components/AutoComboBox';
import { getDiagnosis } from '../queries/diagnosis';

interface DiagnoisInfo {
    currentDiagnosis: string;
    orderValue: string;
}

const Diagnosis = () => {
    console.log('re-render');
    const { t: translate } = useTranslation();
    const [modelOpen, setModalOpen] = useState(false);
    const [currentDiagnosis, setCurrentDiagnosis] = useState<string>('');
    const [orderValue, setOrderValue] = useState<string>('');
    const [certaintyValue, setCertaintyValue] = useState<string>('');

    const addDiagnosis = () => {
        const addDiagnosisEvent = new CustomEvent<DiagnoisInfo>(
            'ADD_DIAGNOSIS',
            {
                detail: { currentDiagnosis, orderValue },
            },
        );
        window.dispatchEvent(addDiagnosisEvent);
    };

    const closeSlider = () => {
        setOrderValue('');
    };

    const { isLoading, error, data } = useQuery('diagnosis', getDiagnosis, {
        refetchOnWindowFocus: false,
    });

    console.log(isLoading, error, data);

    return (
        <>
            <Button
                onClick={() => setModalOpen(true)}
                size="lg"
                renderIcon={AddIcon}
            >
                {translate('ADD_DIAGNOSIS')}
            </Button>
            <SlidingModal open={modelOpen} onClose={() => setModalOpen(false)}>
                <ModalHeader
                    title={translate('RECORD_DIAGNOSIS')}
                ></ModalHeader>
                <ModalBody>
                    <AutoComboBox
                        placeholder={translate('SEARCH_DIAGNOSIS') as string}
                        titleText={translate('CLINICAL_DIAGNOSIS')}
                        id="diagnosis-search"
                        onSelectItem={item =>
                            setCurrentDiagnosis(
                                item.selectedItem?.conceptName as string,
                            )
                        }
                    />
                    {currentDiagnosis ? (
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
                    {orderValue ? (
                        <RadioButtonGroup
                            legendText={translate('CLINICAL_CERTAINTY')}
                            name="certainty"
                            onChange={value =>
                                setCertaintyValue(value as string)
                            }
                        >
                            <RadioButton
                                labelText={translate(
                                    'CLINICAL_DIAGNOSIS_CERTAINTY_CONFIRMED',
                                )}
                                value="primary"
                                checked={certaintyValue === 'confirmed'}
                            />
                            <RadioButton
                                labelText={translate(
                                    'CLINICAL_DIAGNOSIS_CERTAINTY_PRESUMED',
                                )}
                                value="secondary"
                                checked={certaintyValue === 'presumed'}
                            />
                        </RadioButtonGroup>
                    ) : null}
                </ModalBody>
                <ModalFooter
                    primaryButtonText={translate('SAVE_KEY') || ''}
                    secondaryButtonText={translate('CANCEL') || ''}
                    onRequestSubmit={addDiagnosis}
                    onRequestClose={closeSlider}
                    primaryButtonDisabled={
                        !currentDiagnosis ||
                        orderValue.length < 1 ||
                        certaintyValue.length < 1
                    }
                ></ModalFooter>
            </SlidingModal>
        </>
    );
};

export default React.memo(Diagnosis);
