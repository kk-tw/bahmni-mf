import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import mdx from './SlidingModal.mdx';
import {
    Search,
    SlidingModal,
    ModalHeader,
    ModalBody,
    FormGroup,
} from '../components';

export default {
    title: 'Styled/SlidingModal',
    component: SlidingModal,
    parameters: {
        docs: {
            page: mdx,
        },
    },
} as ComponentMeta<typeof SlidingModal>;

const Template: ComponentStory<typeof SlidingModal> = args => (
    <SlidingModal {...args}>
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
);

export const Open = Template.bind({});

Open.args = {
    open: true,
};
