import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import Parse from 'parse/dist/parse.min.js';

const DBFetcherDropdownButton = ({ parseClassName, columnName, placeHolderText, onSelect }) => {
    const [options, setOptions] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);

    useEffect(() => {
        const fetchOptions = async () => {
            const parseQuery = new Parse.Query(parseClassName);

            try {
                parseQuery.select(columnName);
                let values = await parseQuery.find();

                const optionList = values.map(item => ({
                    value: item.get(columnName),
                }));

                // Add the "None" option to the beginning of the options array
                const finalOptions = [{ value: 'None' }, ...optionList];
                setOptions(finalOptions);

                return true;
            } catch (error) {
                alert(`Error! ${error.message}`);
                return false;
            }
        };

        fetchOptions();
    }, [parseClassName, columnName]);

    const handleChange = (value) => {
        // If "None" is selected, set the selectedValue to null
        setSelectedValue(value === 'None' ? null : value);
        onSelect(value); // Notify parent component about the change
    };

    return (
        <Select
            className='custom-dropdown'
            size='large'
            style={{
                width: '100%',
            }}
            placeholder={placeHolderText}
            onChange={handleChange}
            value={selectedValue}
            options={options}
        />
    );
};

export default DBFetcherDropdownButton;
