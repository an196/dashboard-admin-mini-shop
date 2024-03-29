import React, { useState, useEffect } from 'react';
//component
import { Header, ActionButton, Spinner } from '../../components';
//form
import { useForm } from 'react-hook-form';
//context api
import { useStateContext } from '../../context/ContextProvider';
//icon
import { FcAddImage } from 'react-icons/fc';
import { MdDelete } from 'react-icons/md';
//file upload
import { FileUploader } from 'react-drag-drop-files';
//datetime picker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
//firebase
import firebase from '../firebase/firebaseConfig';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
//formet date
import { format } from 'date-fns';
//toast
import toast from 'react-hot-toast';
//api
import { useCreateEmployeeMutation } from './employeeApiSlice';
//constants
import { TIMEDELAY } from '../../utils/constants/time.contants';
import { countries } from '../../data/countries';

const storage = getStorage(firebase);

//define type of file
const fileTypes = ['JPG', 'PNG', 'GIF'];

function CreateEmployee() {
    const [wrongImageType, setWrongImageType] = useState(false);
    const [imageAsset, setImageAsset] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(false);
    const [createEmployee] = useCreateEmployeeMutation();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const { currentColor } = useStateContext();

    const onSubmit = (props) => {
        setPageLoading(true);
        //console.log(props);

        createEmployee(props)
            .then((data) => {
                setTimeout(() => {
                    toast.success('Create employee successfully');
                    setImageAsset(null);
                    reset();
                    setPageLoading(false);
                }, TIMEDELAY);
            })
            .catch((error) => {
                toast.error('Error on submit');
                console.log(error);
            });
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
            setLoading(true);
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
                    console.log(loading);
                    switch (snapshot.state) {
                        case 'paused':
                            break;
                        case 'running':
                            break;
                        default:
                            break;
                    }
                },
                (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            toast.error("User doesn't have permission to access the object");
                            break;

                        case 'storage/canceled':
                            toast.error('User canceled the upload');
                            break;

                        case 'storage/unknown':
                            toast.error('Unknown error occurred, inspect error.serverResponse');
                            break;
                        default:
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        setTimeout(() => {
                            setImageAsset(downloadURL);
                            setValue('imgProfile', downloadURL);
                            setLoading(false);
                        }, TIMEDELAY);
                    });
                },
            );
        } else {
            setWrongImageType(true);
        }
    };

    const handleDateTimepickerChange = (date) => {
        setStartDate(date);
        setValue('hireDate', format(date, 'yyyy/MM/dd'));
    };

    useEffect(() => {
        register('imgProfile', { required: true });
    }, []);

    return (
        <div>
            {!pageLoading ? (
                <div className='m-2 md:m-10 p-2 mt-20 md:p-10 bg-white rounded-xl shadow-md px-10'>
                    <div>
                        <Header category='Create' title='Employees' />
                    </div>
                    <div className='mt-3 w-full xl:w-1/3  lg:w-2/3'>
                        <form className='space-y-2 w-xl' onSubmit={handleSubmit(onSubmit)}>
                            <div className='input-container-row'>
                                <label className='input-lable'>Name</label>
                                <label>
                                    <input
                                        type='text'
                                        placeholder='Name'
                                        className='input-form'
                                        {...register('name', { required: true })}
                                    />
                                    {errors.email && <p className='input-lable-warning'>Please enter a valid name.</p>}
                                </label>
                            </div>
                            <div className='input-container-row'>
                                <label className='input-lable'>Email</label>
                                <label>
                                    <input
                                        type='email'
                                        placeholder='Email'
                                        className='input-form'
                                        {...register('email', { required: true })}
                                    />
                                    {errors.email && <p className='input-lable-warning'>Please enter a valid email.</p>}
                                </label>
                            </div>
                            <div className='input-container-row'>
                                <label className='input-lable'>Country</label>
                                <label>
                                    <select
                                        id='country'
                                        name='country'
                                        className='input-form'
                                        {...register('country', { required: true })}
                                    >
                                        {countries?.map((country) => (
                                            <option key={country.code} value={country.name}>
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.country && <p className='input-lable-warning'>Please choose country.</p>}
                                </label>
                            </div>
                            <div className='input-container-row'>
                                <label className='block input-lable'>Cover photo</label>
                                {loading && <Spinner message='Uploading image!' customeStyle='mt-3' />}
                                {!imageAsset ? (
                                    !loading && (
                                        <label>
                                            <FileUploader
                                                handleChange={uploadImage}
                                                children={uploadElement}
                                                types={fileTypes}
                                            />
                                            {errors.imgProfile && (
                                                <p className='input-lable-warning'>Please choose image.</p>
                                            )}
                                        </label>
                                    )
                                ) : (
                                    <div className='relative h-full mt-2'>
                                        <img src={imageAsset} alt='uploaded-pic' className='w-full h-full' />
                                        <button
                                            type='button'
                                            className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none 
                                    hover:shadow-md transition-all duration-500 ease-in-out'
                                            onClick={() => setImageAsset(null)}
                                        >
                                            <MdDelete />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className='input-container-row'>
                                <label className='block input-lable mt-3'>Hire date</label>
                                <div className='w-1/2'>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => handleDateTimepickerChange(date)}
                                        className='input-form'
                                    />
                                </div>
                            </div>
                            <ActionButton
                                text='Create'
                                bgColor={currentColor}
                                color='white'
                                borderRadius={5}
                                width='full'
                                type='submit'
                            />
                        </form>
                    </div>
                </div>
            ) : (
                <Spinner message='Submitting...!' customeStyle='mt-96' />
            )}
        </div>
    );
}

export default CreateEmployee;
