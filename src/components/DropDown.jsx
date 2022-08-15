import React from 'react';

function DropDown({ label, name, register, required, data, message, errors, k, v }) {
    return (
        <div className='input-container-row'>
            <label className='input-lable'>{label}</label>
            <label>
                <select id={name} name={name} className='input-form' {...register(name, { required: required })}>
                    {data?.map((item) => (
                        <option key={item[k]} value={item[v]}>
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
