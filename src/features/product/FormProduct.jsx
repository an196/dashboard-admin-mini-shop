import React, { useState, useEffect } from 'react';
import {
    ActionButton,
    DragAndDropImage,
    DropDown,
    InputForm,
    Editor,
    InputDialog,
    DeleteButton,
} from '../../components';
import { useStateContext } from '../../context/ContextProvider';
import { useForm } from 'react-hook-form';
import { formatDate } from '../../utils/helper/format';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { firebaseUploadImage } from '../firebase/firebaseUploadFile';
import UnitInput from './UnitInput';



function FormProduct({ onUpdate, product }) {
    const { currentColor } = useStateContext();
    const [goodsReceipts, setGoodsReceipts] = useState();
    const [categories, setCategories] = useState();
    const [details, setDetails] = useState();
    const [imageLoading, setImageLoading] = useState(false);
    const [images, setImages] = useState([]);
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
            name: product ? product.name : '',
            price: product ? product.price : '',
            amount: product ? product.amount : 1,
        },
    });

    function onGoodsReceiptChange(date) {
        setGoodsReceipts(date);
        setValue('goodsReceipts', date);
    }

    const handleClearImage = (image) => {
        setImages(images.filter((_image) => _image !== image));
        setValue('image',images);
    };

    const handleUploadImage = (file) => {
        firebaseUploadImage(file, 'product')
            .then((result) => {
            
                const newImages = [...images, result];
                setImages(newImages);
                setValue('image',newImages);
            })
            .catch((err) => console.log(err));
    };

    const onCategoriesChange = (event) => {
        setValue('category', event.target.value);
    };

    const onEditorChange = (args) => {
        //console.log(args)
        setValue('details', args.value);
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/categories`).then((result) => {
            setCategories(result.data);
        });
    }, []);

    useEffect(() => {
        if (product) {
            setImages( product.image);
            setGoodsReceipts(product.goodsReceipts);
            setDetails(product.details);
            
            setValue('_id', product._id);
            setValue('image',product.image);
            setValue('category',product.categories);
            setValue('goodsReceipts', product?.goodsReceipts);
            setValue('details', product.details);
        } else {
            //set form info
            if (categories) setValue('category', categories[0]['code']);
            setValue('goodsReceipts', Date());
            setGoodsReceipts(new Date());
        }
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
                    <UnitInput
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
                        placeholder='0'
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
                            selected={new Date(goodsReceipts)}
                            onChange={(date) => onGoodsReceiptChange(date)}
                            className='input-form'
                            value={formatDate(goodsReceipts)}
                            locale='vi-VI'
                        />
                    </div>
                </div>

                <div className='flex-1'>
                    {categories && (
                        <DropDown
                            label='Categories'
                            name='category'
                            register={register}
                            errors={errors}
                            required
                            data={categories}
                            onChange={onCategoriesChange}
                            k='code'
                            v='name'
                            message='Please choose categories.'
                            value={product?.category}
                        />
                    )}
                </div>
            </div>
            <DragAndDropImage
                label='Image'
                loading={imageLoading.loading}
                handleImageChange={handleUploadImage}
                image={image || ''}
                imageStyle='w-[150px] h-[150px]'
                name='image'
                containerStyle='input-container-row'
                deleteButtonStyle='left-0'
                labelStyle='input-lable'
            />
            <div className='input-container-row w-full flex-row flex-wrap '>
                {images.map((image) => (
                    <div className='relative h-full m-2 w-[150px]' key={image}>
                        <img src={image} className={`w-[150px] h-[150px]`} />
                        <DeleteButton className='left-0' onClick={() => handleClearImage(image)} />
                    </div>
                ))}
            </div>
            <Editor label='Details' onChange={onEditorChange} value={product?.details ?? ''}/>
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
