import React, { useState, useEffect } from 'react';
import { ActionButton, DragAndDropImage, DropDown, InputForm, Editor } from '../../components';
import { useStateContext } from '../../context/ContextProvider';
import { useForm } from 'react-hook-form';
import { formatDate } from '../../utils/helper/format';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { firebaseUploadImage } from '../firebase/firebaseUploadFile';

function FormProduct({ onUpdate }) {
    const { currentColor } = useStateContext();
    const [goodsReceipt, setGoodsReceipt] = useState(new Date());
    const [categories, setCategories] = useState();
    const [imageLoading, setImageLoading] = useState(false);
    const [image, setImage] = useState();

   
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            name: '',
            price:'',
            amount: '',
            categories:'',
        },
    });

    function onGoodsReceiptChange(date) {
        setGoodsReceipt(date);
        setValue('goodsReceipt', date);
    }

    const handleClearImage = (args) => {
        setImage(null);
    };

    const handleChangeImage = (file) => {
        firebaseUploadImage(file)
            .then((result) => {
                setValue('image', result);
                setImage(result);
            })
            .catch((err) => console.log(err));
    };

    const onEditorChange = (args) => {
        setValue('details', args.value);
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/categories`).then((result) => {
            setCategories(result.data);
        });
    }, []);

    return (
        <form onSubmit={handleSubmit(onUpdate)} className='space-y-3 w-full'>
            <InputForm
                lable='Name'
                type='text'
                placeholder='Name'
                name='name'
                register={register}
                errors={errors}
                message='Please enter a name.'
                required
            />
            <div className='flex w-full space-x-10 pt-2'>
                <div className='flex-1'>
                    <InputForm
                        lable='Price'
                        type='number'
                        placeholder='Price'
                        name='price'
                        register={register}
                        errors={errors}
                        message='Please enter a price.'
                        required
                    />
                </div>
                <div className='flex-1'>
                    <InputForm
                        lable='Amount'
                        type='number'
                        placeholder='Amount'
                        name='amount'
                        register={register}
                        errors={errors}
                        message='Please enter a amount.'
                        required
                    />
                </div>
            </div>
            <div className='flex w-full space-x-10'>
                <div className='flex-1'>
                    <div className='input-container-row'>
                        <label className='input-lable'>Goods Receipts</label>
                        <DatePicker
                            selected={new Date()}
                            onChange={(date) => onGoodsReceiptChange(date)}
                            className='input-form'
                            value={formatDate(goodsReceipt)}
                            locale='vi-VI'
                        />
                    </div>
                </div>

                <div className='flex-1'>
                    {categories && (
                        <DropDown
                            label='Categories'
                            name='categories'
                            register={register}
                            errors={errors}
                            required
                            data={categories}
                            k='code'
                            v='name'
                            message='Please choose categories.'
                        />
                    )}
                </div>
            </div>
            <DragAndDropImage
                label='Image'
                loading={imageLoading.loading}
                handleImageChange={handleChangeImage}
                image={image}
                imageStyle='w-[150px] h-[150px]'
                name='image'
                containerStyle='input-container-row'
                labelStyle='input-lable'
                onDeleteImage={handleClearImage}
            />
            <Editor label='Details' onChange={onEditorChange} />
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

export default FormProduct;
