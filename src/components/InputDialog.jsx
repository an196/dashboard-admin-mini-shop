import React from 'react';

function InputDialog({value, name, type, onChange, label, disable, hidden}) {
    let defaultValue = value ?? '';
    return (
        <div className={`e-float-input e-control-wrapper`}>
            <input
                defaultValue={defaultValue}
                id={name}
                name={name}
                type={type}
                onChange={onChange}
                disabled={disable}
                style={{display: hidden? 'none' : ''}}
            />
            <span className='e-float-line'></span>
            <label className='e-float-text e-label-top'>{label}</label>
        </div>
    );
}

export default InputDialog;
