import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
    Button,
    ModalBody,
    ModalHeader,
    SlidingModal,
    ModalFooter,
    RadioButton,
    RadioButtonGroup,
    AddIcon,
    SkeletonText,
} from '@bahmni-mf/components/ComponentLibrary';
import AutoComboBox from '../components/AutoComboBox';
import { getDiagnosis, saveDiagnosis } from '../queries/diagnosis';
import { IDiagnosis, IDiagnosisSearchResult } from '../types/diagnosis';

interface IDiagnosisInfo {
    codedAnswer: {
        name: string;
        uuid: string;
    };
    order: string;
    certainty: string;
}

const Diagnosis = () => {
    const { t: translate } = useTranslation();
    const queryClient = useQueryClient();

    const [modelOpen, setModalOpen] = useState(false);
    const [currentDiagnosis, setCurrentDiagnosis] =
        useState<IDiagnosisSearchResult>({
            conceptName: '',
            conceptUuid: '',
        });
    const [orderValue, setOrderValue] = useState<string>('');
    const [certaintyValue, setCertaintyValue] = useState<string>('');

    const { isLoading, data } = useQuery('diagnosis', getDiagnosis, {
        refetchOnWindowFocus: false,
    });

    const saveDiagnosisMutation = useMutation({
        mutationFn: saveDiagnosis,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['diagnosis'],
            });
        },
    });

    const addDiagnosis = () => {
        console.log(currentDiagnosis);
        const savedDiagnosis: IDiagnosis = {
            order: orderValue,
            certainty: certaintyValue,
            uuid: currentDiagnosis.conceptUuid,
        };

        saveDiagnosisMutation.mutate(savedDiagnosis);
        const addDiagnosisEvent = new CustomEvent<IDiagnosis>('ADD_DIAGNOSIS', {
            detail: savedDiagnosis,
        });
        window.dispatchEvent(addDiagnosisEvent);
    };

    const closeSlider = () => {
        setOrderValue('');
    };

    if (isLoading) {
        return <SkeletonText />;
    }

    return (
        <>
            <Button
                onClick={() => setModalOpen(true)}
                size="lg"
                renderIcon={AddIcon}
            >
                {translate('ADD_DIAGNOSIS')}
            </Button>
            {data.map((eachDiagnois: IDiagnosisInfo, index: number) => (
                <div key={`${eachDiagnois.codedAnswer.uuid}-${index}`}>
                    {eachDiagnois.codedAnswer.name}
                    Order: {eachDiagnois.order}
                    Certainty: {eachDiagnois.certainty}
                </div>
            ))}
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
                                item.selectedItem as IDiagnosisSearchResult,
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
                                value="PRIMARY"
                                checked={orderValue === 'PRIMARY'}
                            />
                            <RadioButton
                                labelText={translate(
                                    'CLINICAL_DIAGNOSIS_ORDER_SECONDARY',
                                )}
                                value="SECONDARY"
                                checked={orderValue === 'SECONDARY'}
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
                                value="CONFIRMED"
                                checked={certaintyValue === 'CONFIRMED'}
                            />
                            <RadioButton
                                labelText={translate(
                                    'CLINICAL_DIAGNOSIS_CERTAINTY_PRESUMED',
                                )}
                                value="PRESUMED"
                                checked={certaintyValue === 'PRESUMED'}
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
