import React from 'react';
import { Header, ActionButton } from '../components';
import { useForm } from 'react-hook-form';
import { useGetBannerQuery } from '../features/banner/bannerApiSlice';
import { useStateContext } from '../context/ContextProvider';


function Banner() {
    const { currentColor } = useStateContext();
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const { data, isSuccess,  isLoading, isError, error } = useGetBannerQuery();

    let banner;
    if (isSuccess) {
        banner = {...data[0]};
        console.log(banner)
    }

    return (
        <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
            <div className='flex justify-between items-center'>
                <Header category='Page' title='Banner' />
            </div>
            <div className='flex w-full'>
                <div className='flex-1 p-10 border-1'>
                    <form onSubmit={() => {}} className='space-y-2'>
                        <div className='input-container-row'>
                            <label className='input-lable'>Button text</label>
                            <label>
                                <input
                                    type='text'
                                    placeholder='Button text'
                                    className='input-form'
                                    value={banner?.buttonText}
                                    {...register('buttonText', { required: true })}
                                />
                                {errors.email && <p className='input-lable-warning'>Please enter a button text.</p>}
                            </label>
                        </div>
                        <div className='input-container-row'>
                            <label className='input-lable'>Description</label>
                            <label>
                                <input
                                    type='text'
                                    placeholder='Description'
                                    className='input-form'
                                    value={banner?.desc}
                                    {...register('desc', { required: true })}
                                />
                                {errors.email && <p className='input-lable-warning'>Please enter a description.</p>}
                            </label>
                        </div>
                        <div className='input-container-row'>
                            <label className='input-lable'>Small text</label>
                            <label>
                                <input
                                    type='text'
                                    placeholder='Small text'
                                    className='input-form'
                                    value={banner?.smallText}
                                    {...register('smallText', { required: true })}
                                />
                                {errors.email && <p className='input-lable-warning'>Please enter a small text.</p>}
                            </label>
                        </div>
                        <div className='input-container-row'>
                            <label className='input-lable'>Middle text</label>
                            <label>
                                <input
                                    type='text'
                                    placeholder='Middle text'
                                    className='input-form'
                                    value={banner?.middleText}
                                    {...register('middleText', { required: true })}
                                />
                                {errors.email && <p className='input-lable-warning'>Please enter a middle text.</p>}
                            </label>
                        </div>
                        <div className='input-container-row'>
                            <label className='input-lable'>Large text 1</label>
                            <label>
                                <input
                                    type='text'
                                    placeholder='Large text 1'
                                    className='input-form'
                                    value={banner?.largeText1}
                                    {...register('largeText1', { required: true })}
                                />
                                {errors.email && <p className='input-lable-warning'>Please enter a large text 1.</p>}
                            </label>
                        </div>
                        <div className='input-container-row'>
                            <label className='input-lable'>Large text 2</label>
                            <label>
                                <input
                                    type='text'
                                    placeholder='Large text 2'
                                    className='input-form'
                                    value={banner?.largeText2}
                                    {...register('largeText2', { required: true })}
                                />
                                {errors.email && <p className='input-lable-warning'>Please enter a large text 2.</p>}
                            </label>
                        </div>
                        <div className='input-container-row'>
                            <label className='input-lable'>Discount</label>
                            <label>
                                <input
                                    type='text'
                                    placeholder='Discount'
                                    className='input-form w-[50%]'
                                    value={banner?.discount}
                                    {...register('discount', { required: true })}
                                />
                                {errors.email && <p className='input-lable-warning'>Please enter a discount.</p>}
                            </label>
                        </div>
                        <div className='input-container-row'>
                            <ActionButton
                                text='Save'
                                bgColor={currentColor}
                                color='white'
                                borderRadius={5}
                                width='full'
                                type='submit'
                                customeStyle='mt-5'
                            />
                        </div>
                    </form>
                </div>
                <div className='flex-1 bg-blue-500'>b</div>
            </div>
        </div>
    );
}

export default Banner;
