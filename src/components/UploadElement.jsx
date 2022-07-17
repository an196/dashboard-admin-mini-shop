import {FcAddImage} from 'react-icons/fc';
import React from 'react'

function UploadElement({style}) {
  return (
    <div className={`${style}`}>
        <label className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-gray-400'>
            <div className='space-y-1 text-center items-center flex flex-col text-indigo-600'>
                <FcAddImage className='h-10 w-10' />
                <div className='flex text-sm text-gray-600'>
                    <label className='relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500'>
                        <span>Upload a file</span>
                    </label>
                    <p className='pl-1'>or drag and drop</p>
                </div>
                <p className='text-xs text-gray-500'>PNG, JPG, GIF up to 10MB</p>
            </div>
        </label>
    </div>
  )
}

export default UploadElement;

