import React from 'react';

function InputForm({lable,type, placeholder,name, required, register, errors, message}) {
    return (
        <div className='input-container-row'>
            <label className='input-lable'>{lable}</label>
            <label>
                <input
                    type={type}
                    placeholder={placeholder}
                    className='input-form'
                    name={name}
                    {...register(`${name}`, { required: required })}
                />
                {errors[name] && <p className='input-lable-warning'>{`${message}`}</p>}
            </label>
        </div>
    );
}

export default InputForm;
