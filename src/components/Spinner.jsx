import BounceLoader from 'react-spinners/BounceLoader';
import { useStateContext } from '../context/ContextProvider';


function Spinner({ message, customeStyle}) {
   const {currentColor} = useStateContext();
    return (
        <div className={`flex flex-col justify-center items-center w-full h-full space-y-2 ${customeStyle}`}>
            <BounceLoader color={currentColor} heigh={50} width={200} className='m-5' />
            <p className='text-md text-center px-2 '>{message}</p>
        </div>
    );
}

export default Spinner;
