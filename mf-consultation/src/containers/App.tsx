import React, { useState } from 'react';
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

interface DiagnoisInfo {
    searchValue: string;
    orderValue: string;
}

const App = () => {
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

    return (
        <>
            <Button
                onClick={() => setModalOpen(true)}
                size="sm"
                renderIcon={AddIcon}
            >
                Add diagnoses
            </Button>
            <SlidingModal open={modelOpen} onClose={() => setModalOpen(false)}>
                <ModalHeader title="Record Diagnoses"></ModalHeader>
                <ModalBody>
                    <FormGroup legendText={'Diagnoses'}>
                        <Search
                            labelText="Search Diagnoses"
                            placeholder="Search Diagnoses"
                            value={searchValue}
                            onChange={event =>
                                setSearchValue(event.target.value)
                            }
                        ></Search>
                    </FormGroup>
                    {searchValue.length ? (
                        <RadioButtonGroup
                            legendText={'Order'}
                            name="order"
                            onChange={value => setOrderValue(value as string)}
                        >
                            <RadioButton
                                labelText="Primary"
                                value="primary"
                                checked={orderValue === 'primary'}
                            />
                            <RadioButton
                                labelText="Secondary"
                                value="secondary"
                                checked={orderValue === 'secondary'}
                            />
                        </RadioButtonGroup>
                    ) : null}
                </ModalBody>
                <ModalFooter
                    primaryButtonText="Save"
                    secondaryButtonText="Cancel"
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

export default App;
