import React from 'react';
import { MdDelete } from 'react-icons/md';

function DeleteButton({ style, onClick }) {
    return (
        <button
            type='button'
            className={`absolute top-2 right-0 p-1 rounded-full bg-black/20 text-xl cursor-pointer outline-none hover:shadow-md
             transition-all duration-500 ease-in-out hover:bg-black/40 ${style}`}
            onClick={onClick}
        >
            <MdDelete className='text-red-600' />
        </button>
    );
}

export default DeleteButton;
