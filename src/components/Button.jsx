import React from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { logOut } from '../features/auth/authSlice';

function Button({ icon, bgColor, color, size, text, borderRadius, bgHoverColor, width, isLogOut }) {
    const { setIsClicked, initialState } = useStateContext();
    const location = useLocation();
    let navigate = useNavigate();

    const onLogOut = async () => {
        logOut();
        navigate("/login", { replace: true });
    };

    return (
        <button
            type='button'
            onClick={() => {!isLogOut ? setIsClicked(initialState) : onLogOut()}}
            style={{ backgroundColor: bgColor, color, borderRadius }}
            className={`text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor} `}
        >
            {icon} {text}
        </button>
    );
}

export default Button;
