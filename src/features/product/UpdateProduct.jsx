import { Header } from '../../components';
import FormProduct from './FormProduct';
import { useUpdateProductMutation, useGetProductQuery } from './productApiSlice';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

function UpdateProduct() {
    let params = useParams();
    let product;

    const { data, isSuccess } = useGetProductQuery(params.id);
    const [updateProduct] = useUpdateProductMutation();

    if (isSuccess) {
        product = { ...data };
    }
   
    const onUpdate = (props) => {
        //console.log(props)
        updateProduct(props)
            .then(() => toast.success('Update product successful'))
            .catch(() => toast.error('Update product failure'));
    };

    return (
        <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
            <div className='flex justify-between items-center'>
                <Header category='Page' title='Products' />
            </div>
            {isSuccess && (
                <div className='flex w-full'>
                    <div className='md:p-10 p-2 border-1 w-full xl:w-[50%]'>
                        <FormProduct onUpdate={onUpdate} product={product} />
                    </div>
                    
                </div>
            )}
        </div>
    );
}

export default UpdateProduct;
