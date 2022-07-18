import React, { useState, useEffect } from 'react';
import { DragAndDropImage, InputForm } from '../../components';
import { useStateContext } from '../../context/ContextProvider';
import { useForm } from 'react-hook-form';
import { formatDate } from '../../utils/helper/format';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import {
    HtmlEditor,
    Image,
    Inject,
    Link,
    QuickToolbar,
    RichTextEditorComponent,
    Toolbar,
} from '@syncfusion/ej2-react-richtexteditor';
import { EditorData } from '../../data/dummy';
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
        defaultValues: {},
    });

    function onGoodsReceiptChange(date) {
        setGoodsReceipt(date);
        // setValue('saleTime', date);
    }

    const handleClearImage = (args) => {
        setImage(null);
    };

    const handleChangeImage = (file) => {
        firebaseUploadImage (file)
            .then((result) => {
                setValue('image', result);
                setImage(result);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/categories`).then((result) => {
            setCategories(result.data);
        });
    }, []);

    return (
        <form onSubmit={handleSubmit(onUpdate)} className='space-y-2'>
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
            <div className='input-container-row'>
                <label className='input-lable'>Goods Receipts</label>
                <div className='w-1/2'>
                    <DatePicker
                        selected={new Date()}
                        onChange={(date) => onGoodsReceiptChange(date)}
                        className='input-form'
                        value={formatDate(goodsReceipt)}
                        locale='vi-VI'
                    />
                </div>
            </div>
            <div className='input-container-row'>
                <label className='input-lable'>Categories</label>
                <label>
                    <select
                        id='categories'
                        name='categories'
                        className='input-form'
                        {...register('categories', { required: true })}
                    >
                        {categories?.map((categories) => (
                            <option key={categories.code} value={categories.name}>
                                {categories.name}
                            </option>
                        ))}
                    </select>
                    {errors.categories && <p className='input-lable-warning'>Please choose categories.</p>}
                </label>
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
            <div className='input-container-row'>
                <label className='input-lable'>Details</label>
                <RichTextEditorComponent>
                    <Inject services={[HtmlEditor, Toolbar, Image, Link, QuickToolbar]} />
                    <EditorData />
                </RichTextEditorComponent>
            </div>
        </form>
    );
}

export default FormProduct;
