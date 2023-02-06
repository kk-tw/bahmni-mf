import React from 'react';
import {
    Button,
    GlobalStyle,
    SlidingModal,
    AddIcon,
    FormGroup,
    ModalBody,
    ModalHeader,
    Search,
} from '../components';

const App = () => (
    <>
        <GlobalStyle />
        <Button renderIcon={AddIcon}>Hi! there</Button>
        <SlidingModal open>
            <ModalHeader title="Record Diagnoses"></ModalHeader>
            <ModalBody>
                <FormGroup legendText={'Diagnoses'}>
                    <Search
                        labelText="Search Diagnoses"
                        placeholder="Search Diagnoses"
                    ></Search>
                </FormGroup>
            </ModalBody>
        </SlidingModal>
    </>
);

export default App;
