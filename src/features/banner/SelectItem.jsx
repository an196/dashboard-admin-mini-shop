import React from 'react';
import Select, { components } from 'react-select';

function SelectItem({options, onChange, defaultValue}) {

    const { SingleValue, Option } = components;
    const IconSingleValue = (props) => (
        <SingleValue {...props}>
            <img
                src={props.data.image}
                className='h-[30px] w-[30px] mr-[10px] ml-0'
            />
            {props.data.name}
        </SingleValue>
    );

    const IconOption = (props) => (
        <Option {...props}>
            <img
                src={props.data.image}
                className='h-[30px] w-[30px] mr-[10px] ml-0'
            />
            {props.data.name}
        </Option>
    );

    
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            
        }),
        singleValue: (provided) => ({
            ...provided,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }),
        control: (css,state) => ({ 
            ...css, 
            paddingLeft: '0', 
            border: 0, 
            borderBottom: '1px solid #9ca3af',
            borderColor: '#9ca3af',
            boxShadow: 'none',
            borderRadius: 0,
            fontSize: '14px',

        })
    };

    console.log('defaultValue',defaultValue)
    return (
        <div>
            <Select
                styles={customStyles}
                components={{ SingleValue: IconSingleValue, Option: IconOption }}
                options={options}
                isClearable
                isSearchable
                getOptionLabel={(option) => `${option.name}`}
                onChange={onChange}
                defaultValue={defaultValue}
            />
        </div>
    );
}

export default SelectItem;
