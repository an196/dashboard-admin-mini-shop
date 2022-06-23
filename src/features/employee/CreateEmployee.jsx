import React, { useState, useRef } from 'react';
import { Header, ActionButton } from '../../components';
import { useForm } from 'react-hook-form';
import { useStateContext } from '../../context/ContextProvider';
import firebase from '../firebase/firebaseConfig';
import { FcAddImage } from 'react-icons/fc';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { FileUploader } from 'react-drag-drop-files';

//firebase
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
const storage = getStorage();

const fileTypes = ['JPG', 'PNG', 'GIF'];

function CreateEmployee() {
    const [wrongImageType, setWrongImageType] = useState(false);
    const [imageAsset, setImageAsset] = useState(null);
    const progressBarRef = useRef();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const { currentColor } = useStateContext();

    const onSubmit = async ({ email, password }) => {
        // try {
        //     const userData = await login({ email, password }).unwrap();
        //     console.log('logining');
        //     dispatch(setCredentials({ ...userData, email }));
        //     console.log('login successfully');
        //     toast.success('login successfully');
        //     navigate('/dashboard');
        // } catch (err) {
        //     if (!err?.originalStatus) {
        //         // isLoading: true until timeout occurs
        //         toast.error('No Server Response');
        //     } else if (err.originalStatus === 400) {
        //         toast.error('Missing Username or Password');
        //     } else if (err.originalStatus === 401) {
        //         toast.error('Unauthorized');
        //     } else {
        //         toast.error('Login Failed');
        //     }
        //     // errRef.current.focus();
        // }
    };

    const uploadElement = (
        <div>
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
    );

    const uploadImage = (file) => {
        if (
            file.type === 'image/png' ||
            file.type === 'image/svg' ||
            file.type === 'image/jpeg' ||
            file.type === 'image/gif' ||
            file.type === 'image/tiff'
        ) {
            
            // Create the file metadata
            var metadata = {
                contentType: file.type,
            };
            const storageRef = ref(storage, 'profile/' + file.name);
            var uploadTask = uploadBytesResumable(storageRef, file, metadata);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    // A full list of error codes is available at
                    // https://firebase.google.com/docs/storage/web/handle-errors
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;

                        case 'storage/canceled':
                            // User canceled the upload
                            break;

                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setImageAsset(downloadURL);
                    });
                },
            );
        } else {
            setWrongImageType(true);
        }
    };

    return (
        <div className='m-2 md:m-10 p-2 mt-20 md:p-10 bg-white rounded-xl shadow-md  px-10'>
            <div>
                <Header category='Create' title='Employees' />
            </div>
            <div className='mt-3 w-full xl:w-1/3  lg:w-2/3'>
                <form className='space-y-3 w-xl' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex float-left flex-col text-md w-full'>
                        <label className='text-md font-semibold'>Name</label>
                        <label>
                            <input
                                type='text'
                                placeholder='Name'
                                className='flex-1 py-2 border-b-1 border-gray-400 focus:border-black focus:text-black text-sm text-gray-600 
                                placeholder-gray-400 w-full outline-none'
                                {...register('name', { required: true })}
                            />
                            {errors.email && (
                                <p className='p-1 text-[13px] font-light  text-orange-500'>
                                    Please enter a valid email.
                                </p>
                            )}
                        </label>
                    </div>
                    <div className='flex float-left flex-col text-md w-full'>
                        <label className='text-md font-semibold'>Email</label>
                        <label>
                            <input
                                type='email'
                                placeholder='Email'
                                className='flex-1 py-2 border-b-1 border-gray-400 focus:border-black focus:text-black text-sm text-gray-600 
                                placeholder-gray-400 w-full outline-none'
                                {...register('email', { required: true })}
                            />
                            {errors.email && (
                                <p className='p-1 text-[13px] font-light  text-orange-500'>
                                    Please enter a valid email.
                                </p>
                            )}
                        </label>
                    </div>
                    <div className='flex float-left flex-col text-md w-full'>
                        <label className='text-md font-semibold'>Country</label>
                        <label>
                            <select
                                id='country'
                                name='country'
                                className='flex-1 py-2 border-b-1 border-gray-400 focus:border-black focus:text-black text-sm
                                text-gray-600 placeholder-gray-400 w-full outline-none'
                            >
                                <option>United States</option>
                                <option>Canada</option>
                                <option>Mexico</option>
                            </select>
                            {errors.email && (
                                <p className='p-1 text-[13px] font-light  text-orange-500'>
                                    Please enter a valid email.
                                </p>
                            )}
                        </label>
                    </div>
                    <div className='flex float-left flex-col text-md w-full'>
                        <label className='block text-md font-semibold'>Cover photo</label>
                        {!imageAsset ? (
                            <FileUploader handleChange={uploadImage} children={uploadElement} types={fileTypes}  />
                        ) : (
                            <div className='relative h-full'>
                                <img src={imageAsset} alt='uploaded-pic' className='w-full h-full' />
                                <button
                                    type='button'
                                    className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out'
                                    onClick={() => setImageAsset(null)}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        )}
                    </div>
                    <ActionButton text='Sign in' bgColor={currentColor} color='white' borderRadius={5} width='full' />
                </form>
            </div>
        </div>
    );
}

export default CreateEmployee;
