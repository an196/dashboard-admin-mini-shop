import React from 'react';
import backgroundImg from '../assets/headphone.jpg';
import { useForm } from 'react-hook-form';
import { SiShopware } from 'react-icons/si';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../features/auth/authSlice';
import { useLoginMutation } from '../features/auth/authApiSlice';

import toast from 'react-hot-toast';

function Login() {
    const navigate = useNavigate();
    const [login] = useLoginMutation();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues:{
            email: 'admin@gmail.com',
            password: 'admin'
        }
    });

    const onSubmit = async ({ email, password }) => {
        try {
            const userData = await login({ email, password }).unwrap();
            console.log('logining');
            dispatch(setCredentials({ ...userData, email }));

            console.log('login successfully');
            toast.success('login successfully');
            navigate('/dashboard');
        } catch (err) {
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                toast.error('No Server Response');
            } else if (err.originalStatus === 400) {
                toast.error('Missing Username or Password');
            } else if (err.originalStatus === 401) {
                toast.error('Unauthorized');
            } else {
                toast.error('Login Failed');
            }
            // errRef.current.focus();
        }
    };

    return (
        <div className='flex justify-start item-center flex-col h-screen '>
            <div className='relative md:w-full h-full justify-items-center flex'>
                <img
                    src={backgroundImg}
                    className='absolute overflow-hidden object-cover w-screen h-screen opacity-90 -z-10'
                    alt={backgroundImg}
                />
                <form
                    className='relative space-y-8 rounded bg-white py-10 px-6 md:mt-0 md:max-w-md w-full  md:px-14 flex flex-col items-center'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='flex items-center space-x-3'>
                        <SiShopware className='w-10 h-10 cursor-pointer object-contain md:left-10 md:top-6 z-10' />
                        <span className='font-semibold text-xl'>MiniShop</span>
                    </div>
                    <div className='p-5 flex flex-col items-center space-y-10'>
                        <h1 className='text-4xl font-semibold'>Sign in</h1>
                        <div className='space-y-4'>
                            <label className='inline-block w-full'>
                                <input
                                    type='text'
                                    placeholder='Email'
                                    className='input w-full h-10 p-3 outline-none text-md rounded-sm border'
                                    {...register('email', { required: true })}
                                />
                                {errors.email && (
                                    <p className='p-1 text-[13px] font-light  text-orange-500 '>
                                        Please enter a valid email.
                                    </p>
                                )}
                            </label>
                            <label className='inline-block w-full'>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    className='input w-full h-10 p-3 outline-none text-md rounded-sm border' 
                                    {...register('password', { required: true })}
                                />
                                {errors.password && (
                                    <p className='p-1 text-[13px] font-light  text-orange-500'>
                                        Your password must contain between 4 and 60 characters.
                                    </p>
                                )}
                            </label>
                        </div>

                        <button type='submit' className='w-full rounded bg-[#e50914] py-3 font-semibold text-white'>
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
