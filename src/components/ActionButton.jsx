import { useLocation, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import { logOut } from '../features/auth/authSlice';
import toast from 'react-hot-toast';

function ActionButton({ icon, bgColor, color, size, text, borderRadius, bgHoverColor, width, action, to, customeStyle }) {
    const { setIsClicked, initialState } = useStateContext();
    const location = useLocation();
    let navigate = useNavigate();

    const onLogOut = async () => {
        setIsClicked(initialState);
        logOut();
        navigate('/login', { replace: true });
        toast.success('Log out');
    };

    const handleAction = (action, to) => {
        switch (action) {
            case 'logout':
                onLogOut();
                break;
            case 'add':
                navigate(to, { replace: true });;
                break;
            default:
                break;
        }
    };

    return (
        <button
            type='button'
            onClick={() => handleAction(action,to)}
            style={{ backgroundColor: bgColor, color, borderRadius }}
            className={`text-${size} p-3 w-${width} hover:drop-shadow-xl hover:bg-${bgHoverColor} ${customeStyle}`}
        >
            {icon} {text}
        </button>
    );
}

export default ActionButton;
