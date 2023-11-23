import React, { useState, useEffect } from 'react';
import { Select } from 'antd';
import Parse from 'parse/dist/parse.min.js';

const DropdownButton = ({ parseClassName, columnName, placeHolderText }) => {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            const parseQuery = new Parse.Query(parseClassName);

            try {
                parseQuery.select(columnName);
                let values = await parseQuery.find();

                const optionList = values.map(item => ({
                    value: item.get(columnName),
                }));

                setOptions(optionList);
                console.log(optionList);
                return true;
            } catch (error) {
                alert(`Error! ${error.message}`);
                return false;
            }
        };

        fetchOptions();
    }, [parseClassName, columnName]);

    const handleChange = (value) => {
        console.log(`Selected values: ${value}`);
    };

    return (
        <Select
            className='custom-dropdown'
            size='large'
            mode="tags"
            style={{
                width: '100%',
            }}
            placeholder={placeHolderText}
            onChange={handleChange}
            options={options}
        />
    );
};

export default DropdownButton;
