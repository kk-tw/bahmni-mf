import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { ComboBoxProps } from 'carbon-components-react';
import { ComboBox } from '@bahmni-mf/components/ComponentLibrary';
import fetchDiagnosisSuggestions from '../queries/diagnosis';
import useDebounce from '../hooks/debounce';

interface ItemType {
    conceptName: string;
}

type ExcludedAttributes = 'items';

interface AutoComboBoxProps extends Omit<ComboBoxProps, ExcludedAttributes> {
    onSelectItem: (data: { selectedItem: ItemType | null | undefined }) => void;
}

const AutoComboBox: React.FC<AutoComboBoxProps> = ({
    placeholder,
    titleText,
    id,
    onSelectItem,
}) => {
    const [items, setItems] = useState([]);
    const [inputText, setInputText] = useState('');

    const debouncedSearchQuery = useDebounce(inputText, 600);

    const lang = 'en';
    const { data } = useQuery(
        ['diagnosisSuggestion', debouncedSearchQuery],
        () => fetchDiagnosisSuggestions(lang, debouncedSearchQuery),
        {
            refetchOnWindowFocus: false,
            enabled: !!debouncedSearchQuery && debouncedSearchQuery.length > 2,
        },
    );

    useEffect(() => {
        if (Array.isArray(data)) {
            setItems(data as []);
        }
    }, [data]);

    const changeInputText = (inputText: string) => {
        setInputText(inputText);

        if (inputText.length < 2) {
            setItems([]);
        }
    };

    return (
        <ComboBox
            onChange={item => onSelectItem(item)}
            onInputChange={(inputText: string) => changeInputText(inputText)}
            id={id}
            items={items}
            itemToString={(item: ItemType) => (item ? item.conceptName : '')}
            placeholder={placeholder}
            titleText={titleText}
        />
    );
};

export default AutoComboBox;
