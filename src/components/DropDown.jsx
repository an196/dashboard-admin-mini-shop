import React from 'react';

function DropDown({ label, name, onChange,value, register, required, data, message, errors, k, v }) {
   
    return (
        <div className='input-container-row'>
            <label className='input-lable'>{label}</label>
            <label>
                <select id={name} name={name} className='input-form' 
                    onChange={onChange}
                    value={value}
                    {...register(name, { required: required })}
                >
                    {data?.map((item, index) => (
                        <option key={item[k]} value={item[k]}>
                            {item[v]}
                        </option>
                    ))}
                </select>
                {errors.categories && <p className='input-lable-warning'>{message}</p>}
            </label>
        </div>
    );
}

export default DropDown;
