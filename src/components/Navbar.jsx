import React, { useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import avatar from '../data/avatar.jpg';
import { useStateContext } from '../context/ContextProvider';
import { logOut } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { LogOutButton } from '../components';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
    <TooltipComponent content={title} position='BottomCenter'>
        <button
            onClick={customFunc}
            style={{ color }}
            className='relative text-xl rounded-full p-3 hover:bg-light-gray'
        >
            <span
                style={{ background: dotColor }}
                className='absolute inline-flex rounded-full h-2 w-2 right-2 top-2'
            />
            {icon}
        </button>
    </TooltipComponent>
);

function Navbar() {
    const {
        setActiveMenu,
        handleClick,
        setIsClicked,
        screenSize,
        setScreenSize,
        currentColor,
        initialState,
        themeSettings,
    } = useStateContext();

    const navigate = useNavigate();

    async function onLogOut() {
        setIsClicked(initialState);
        logOut();
        navigate('/login', { replace: true });
    }

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if(themeSettings){
            setActiveMenu(false);
            return;
        }
       
        if (screenSize <= 900 ) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    return (
        <div className='flex justify-between p-2 md:mx-6  sticky'>
            <NavButton
                title='Menu'
                customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
                color={currentColor}
                icon={<AiOutlineMenu />}
            />
            <div className='flex'>
                <NavButton
                    title='Chat'
                    dotColor='#03C9D7'
                    customFunc={() => handleClick('chat')}
                    color={currentColor}
                    icon={<BsChatLeft />}
                />
                <NavButton
                    title='Notifications'
                    dotColor='#03C9D7'
                    customFunc={() => handleClick('notification')}
                    color={currentColor}
                    icon={<RiNotification3Line />}
                />
                <TooltipComponent content='Profile' position='BottomCenter'>
                    <div
                        className='flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg'
                        onClick={() => handleClick('userProfile')}
                    >
                        <img className='rounded-full w-8 h-8' src={avatar} alt='user-profile' />
                        <div>
                            <span className='text-gray-400 text-14'>Hi,</span>{' '}
                            <span className='text-gray-400 font-bold ml-1 text-14'>Michael</span>
                        </div>
                        <MdKeyboardArrowDown className='text-gray-400 text-14' />
                    </div>
                </TooltipComponent>

                {/* {isClicked.chat && <Chat />}
                {isClicked.notification && <Notification />} */}
                {/* {isClicked.userProfile && (<UserProfile />)} */}
                <NavButton
                    title='Logout'
                    customFunc={onLogOut}
                    color={currentColor}
                    icon={<LogOutButton />}
                />
            </div>
        </div>
    );
}

export default Navbar;
