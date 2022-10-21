import React from 'react';
import Select, { components } from 'react-select';

function SelectItem({options, onChange, defaultValue}) {

    const { SingleValue, Option } = components;
    const IconSingleValue = (props) => (
        <SingleValue {...props}>
            <img
                src={props.data.image}
                className='h-[30px] w-[30px] mr-[10px] ml-0 '
            />
            <h4 className=' text-[16px] font-normal'>{props.data.name}</h4>
        </SingleValue>
    );

    const IconOption = (props) => (
        <Option {...props}>
            <img
                src={props.data.image}
                className='h-[30px] w-[30px] mr-[10px] ml-0 '
            />
            <h3 className=' text-[16px] font-normal'>{props.data.name}</h3>
            
        </Option>
    );

    
    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: state.isSearchable ? 'white' : '',
            color: state.isSearchable ? '#9ca3af' : '',
            ':hover': {
                ...provided[':hover'],
                backgroundColor: 
                state.isSelected
                    ? '#e9ecf2'
                    : ''
                  
                }
        }),
        singleValue: (provided) => ({
            ...provided,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }),
        control: (css, state) => ({ 
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

    // console.log('defaultValue',defaultValue)
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
