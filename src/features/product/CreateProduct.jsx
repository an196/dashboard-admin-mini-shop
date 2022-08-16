import React from 'react';
import { Header } from '../../components';
import FormProduct from './FormProduct';
import { useCreateProductMutation } from './productApiSlice';
import toast from 'react-hot-toast';

function CreateProduct() {
    const [createProduct] = useCreateProductMutation();

    const onUpdate = (props) => {
        console.log(props)
        createProduct(props)
            .then(() => toast.success('Create product successful'))
            .catch(() => toast.error('Create product failure'));
    };

    return (
        <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
            <div className='flex justify-between items-center'>
                <Header category='Page' title='Products' />
            </div>
            <div className='flex w-full'>
                <div className='flex-1 p-10 border-1'>
                    <FormProduct onUpdate={onUpdate} />
                </div>
                <div className='flex-1'></div>
            </div>
        </div>
    );
}

export default CreateProduct;
