import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useStateContext } from '../../context/ContextProvider';
import DatePicker from 'react-datepicker';
import { ActionButton } from '../../components';
import { useState } from 'react';
import { formatDate } from '../../utils/helper/format';

function FormBanner({ banner, onUpdate }) {
    const { currentColor } = useStateContext();
    const [infoBanner, setInfoBanner] = useState(banner);

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            buttonText: infoBanner.buttonText,
            desc: infoBanner.desc,
            smallText: infoBanner.smallText,
            middleText: infoBanner.middleText,
            largeText1: infoBanner.largeText1,
            largeText2: infoBanner.largeText2,
            discount: infoBanner.discount,
        },
    });

    function onSaleTimeChange(date) {
        setInfoBanner({ saleTime: date });
        setValue('saleTime', date);
    }

    function handleChange(args) {
        console.log(args.target.name);
        console.log(args.target.value);
        let key = args.target.name;
        let value = args.target.value;
        setValue({ [key]: value });
    }

    useEffect(() => {
        setValue('saleTime', infoBanner?.saleTime);
        setValue('image', infoBanner?.image);
        setValue('__v', infoBanner?.__v);
        setValue('_id', infoBanner?._id);
    }, []);

    return (
        <form onSubmit={handleSubmit(onUpdate)} className='space-y-2'>
            <div className='input-container-row'>
                <label className='input-lable'>Button text</label>
                <label>
                    <input
                        type='text'
                        placeholder='Button text'
                        className='input-form'
                        name='buttonText'
                        {...register('buttonText', { required: true })}
                    />
                    {errors.buttonText && <p className='input-lable-warning'>Please enter a button text.</p>}
                </label>
            </div>
            <div className='input-container-row'>
                <label className='input-lable'>Description</label>
                <label>
                    <input
                        type='text'
                        placeholder='Description'
                        className='input-form'
                        name='desc'
                        onChange={(input) => handleChange(input)}
                        {...register('desc', { required: true })}
                    />
                    {errors.desc && <p className='input-lable-warning'>Please enter a description.</p>}
                </label>
            </div>
            <div className='input-container-row'>
                <label className='input-lable'>Small text</label>
                <label>
                    <input
                        name='smallText'
                        type='text'
                        placeholder='Small text'
                        className='input-form'
                        {...register('smallText', { required: true })}
                    />
                    {errors.smallText && <p className='input-lable-warning'>Please enter a small text.</p>}
                </label>
            </div>
            <div className='input-container-row'>
                <label className='input-lable'>Middle text</label>
                <label>
                    <input
                        name='middleText'
                        type='text'
                        placeholder='Middle text'
                        className='input-form'
                        {...register('middleText', { required: true })}
                    />
                    {errors.middleText && <p className='input-lable-warning'>Please enter a middle text.</p>}
                </label>
            </div>
            <div className='input-container-row'>
                <label className='input-lable'>Large text 1</label>
                <label>
                    <input
                        name='largeText1'
                        type='text'
                        placeholder='Large text 1'
                        className='input-form'
                        {...register('largeText1', { required: true })}
                    />
                    {errors.largeText1 && <p className='input-lable-warning'>Please enter a large text 1.</p>}
                </label>
            </div>
            <div className='input-container-row'>
                <label className='input-lable'>Large text 2</label>
                <label>
                    <input
                        name='largeText2'
                        type='text'
                        placeholder='Large text 2'
                        className='input-form'
                        {...register('largeText2', { required: true })}
                    />
                    {errors.largeText2 && <p className='input-lable-warning'>Please enter a large text 2.</p>}
                </label>
            </div>
            <div className='input-container-row'>
                <label className='input-lable'>Discount</label>
                <label>
                    <input
                        name='discount'
                        type='text'
                        placeholder='Discount'
                        className='input-form w-[50%]'
                        {...register('discount', { required: true })}
                    />
                    {errors.discount && <p className='input-lable-warning'>Please enter a discount.</p>}
                </label>
            </div>
            <div className='input-container-row'>
                <label className='input-lable'>Sale time</label>
                <div className='w-1/2'>
                    <DatePicker
                        selected={new Date(infoBanner?.saleTime)}
                        onChange={(date) => onSaleTimeChange(date)}
                        className='input-form'
                        value={formatDate(infoBanner?.saleTime, true)}
                        showTimeSelect
                        locale='vi-VI'
                    />
                </div>
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
    );
}

export default FormBanner;
