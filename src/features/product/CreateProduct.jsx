import React from 'react';
import { Header } from '../../components';
import FormProduct from './FormProduct';
import { useCreateProductMutation } from './productApiSlice';
import toast from 'react-hot-toast';

function CreateProduct() {
    const [createProduct] = useCreateProductMutation();

    const onUpdate = (props) => {
        createProduct(props)
            .then(() => toast.success('Create product successful'))
            .catch(() => toast.error('Create product failure'));
    };

    return (
        <div className='hero-container'>
            <div className='flex justify-between items-center'>
                <Header category='Page' title='Products' />
            </div>
            <div className='flex w-full sm:p-10 p-2'>
                    <FormProduct onUpdate={onUpdate} />
            </div>
        </div>
    );
}

export default CreateProduct;
