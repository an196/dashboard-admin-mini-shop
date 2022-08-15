import { formatDate } from '../../utils/helper/format';
import { FiEdit } from 'react-icons/fi';

const gridImage = (props) => (
    <div className='flex items-center gap-2 justify-center'>
        <img
            className='rounded w-10 h-10'
            src={props?.image?.length > 1 ? props?.image[0] : props?.image}
            alt='product'
        />
    </div>
);

const gridGoodsReceipt = (props) => (
    <div className='flex items-center gap-2 justify-center'>
        <span>{formatDate(props?.goodsReceipts)}</span>
    </div>
);

const gridAction = (props) => (
    <div className='cursor-pointer'>
        <FiEdit />
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
        template: gridGoodsReceipt,
        textAlign: 'Center',
    },
    {
        field: 'category',
        headerText: 'Category',
        width: '150',
        textAlign: 'Center',
    },
];
