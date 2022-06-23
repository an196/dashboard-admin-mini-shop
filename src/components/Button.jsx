import React from 'react';
import { useStateContext } from '../context/ContextProvider';

function Button({ icon, bgColor, color, size, text, borderRadius, bgHoverColor, width }) {
    const { initialState, setIsClicked } = useStateContext();
    return (
        <button
            type='button'
            onClick={() => setIsClicked(initialState)}
            style={{ backgroundColor: bgColor, color, borderRadius }}
            className={`text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor} `}
        >
            {icon} {text}
        </button>
    );
}

export default Button;
