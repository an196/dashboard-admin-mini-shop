import {format} from 'date-fns';

const gridImage = (props) => (
    <div className='flex items-center gap-2'>
        <img className='rounded w-10 h-10' src={props?.image[0]} alt='product' />
    </div>
);

export const productGrid = [
    {
        field: 'image',
        headerText: 'Product',
        width: '150',
        template: gridImage,
        textAlign: 'Center',
    },
    {
        field: 'goodsID',
        headerText: 'GoodsID',
        width: '150',
        textAlign: 'Center',
    },
    {
        field: 'name',
        headerText: 'Name',
        width: '150',
        textAlign: 'Center',
    },
    {
        field: 'price',
        headerText: 'Price',
        width: '150',
        textAlign: 'Center',
    },
    {
        field: 'amount',
        headerText: 'Amount',
        width: '150',
        textAlign: 'Center',
    },
    {
        field: 'goodsReceipts',
        headerText: 'Goods Receipt',
        width: '150',
        textAlign: 'Center',
    },
    {
        field: 'category',
        headerText: 'Category',
        width: '150',
        textAlign: 'Center',
    }
];
