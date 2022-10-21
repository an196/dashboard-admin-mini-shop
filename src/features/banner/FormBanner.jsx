import React, { useState, useEffect } from 'react';
import Select, { components } from 'react-select';
import { useForm } from 'react-hook-form';
import { useStateContext } from '../../context/ContextProvider';
import DatePicker from 'react-datepicker';
import { ActionButton, InputForm, DragAndDropImage, DropDown } from '../../components';
import { formatDate } from '../../utils/helper/format';
import { firebaseUploadImage } from '../firebase/firebaseUploadFile';
import { useGetProductsQuery } from '../../features/product/productApiSlice';
import SelectItem from './SelectItem';

function FormBanner({ banner, onUpdate }) {
    const { data,  isSuccess } = useGetProductsQuery();

    const { currentColor } = useStateContext();
    const [infoBanner, setInfoBanner] = useState(banner);
    const [image, setImage] = useState();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
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

    let products;

    if (isSuccess) {
        products = [...data];
    }

    function onSaleTimeChange(date) {
        setInfoBanner({ saleTime: date });
        setValue('saleTime', date);
    }

    const handleSelectItem = (args) => {
       console.log(args)
       setInfoBanner({ item: args});
       setValue('item', args);
    };

    useEffect(() => {
        //to check props changed
        if (infoBanner) {
            setValue('saleTime', infoBanner?.saleTime);
            setValue('image', infoBanner?.image);
            setValue('__v', infoBanner?.__v);
            setValue('_id', infoBanner?._id);
            setValue('item', infoBanner?.item);
            setImage(infoBanner?.image);
            
        }
    }, []);

    console.log('infoBanner?.item' ,infoBanner?.item);
    return (
        <form onSubmit={handleSubmit(onUpdate)} className='space-y-2'>
            <InputForm
                lable='Button text'
                type='text'
                placeholder='Button text'
                name='buttonText'
                register={register}
                errors={errors}
                message='Please enter a button text.'
                required
            />
            <InputForm
                lable='Description'
                type='text'
                placeholder='Description'
                name='desc'
                register={register}
                errors={errors}
                message='Please enter a description.'
                required
            />
            <InputForm
                lable='Small text'
                type='text'
                placeholder='Small text'
                name='smallText'
                register={register}
                errors={errors}
                message='Please enter a small text.'
                required
            />
            <InputForm
                lable='Middle text'
                type='text'
                placeholder='Middle text'
                name='middleText'
                register={register}
                errors={errors}
                message='Please enter a middle text.'
                required
            />
            <InputForm
                lable='Large text 1'
                type='text'
                placeholder='Large text 1'
                name='largeText1'
                register={register}
                errors={errors}
                message='Please enter a large text 1.'
                required
            />
            <InputForm
                lable='Large text 2'
                type='text'
                placeholder='Large text 2'
                name='largeText2'
                register={register}
                errors={errors}
                message='Please enter a large text 2.'
                required
            />
            <InputForm
                lable='Discount'
                type='text'
                placeholder='Discount'
                name='discount'
                register={register}
                errors={errors}
                message='Please enter a discount.'
                required
            />
            <div className='input-container-row'>
                <label className='input-lable'>Sale time</label>
                <div className='w-1/2'>
                    <DatePicker
                        onChange={(date) => onSaleTimeChange(date)}
                        className='input-form'
                        value={formatDate(infoBanner?.saleTime, true)}
                        showTimeSelect
                        locale='vi-VI'
                    />
                </div>
            </div>
            {/* release v1 */}
            {/* <DragAndDropImage
                label='Image'
                loading={imageLoading.loading}
                handleImageChange={handleChangeImage}
                image={image}
                imageStyle='w-[150px] h-[150px]'
                name='image'
                containerStyle='input-container-row'
                labelStyle='input-lable'
                onDeleteImage={handleClearImage}
            /> */}
            <div className='input-container-row'>
                <SelectItem options={products} onChange={handleSelectItem} defaultValue={infoBanner?.item} />
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
