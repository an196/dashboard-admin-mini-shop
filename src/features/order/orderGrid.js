import { format } from 'date-fns';

const detailsTemplate = (props) => (
    <div className='flex items-center float-left h-[100px] overflow-y-auto overflow-x-hidden flex-col space-y-2 scrollbar px-2 w-full'>
        {props?.details.length > 0 &&
            props.details.map((item) => (
                <div className='flex flex-row space-x-3 ' key={item?.orderID}>
                    <img src={item?.image[0] || ''} width={40} height={40} className='w-[40px] h-[40px]' />
                    <div className='flex flex-col text-left flex-wrap'>
                        <p className='break-words w-[150px]' > {item?.name}</p>
                        <p>Price: {item?.price}</p>
                        <p>Category: {item?.category}</p>
                        <p>Quantity: {item?.quantity}</p>
                    </div>
                </div>
            ))}
    </div>
);


const dateTempalte = (props) => <div>{props?.date ? format(new Date(props?.date), 'yyyy/MM/dd') : ''}</div>;

export const orderGrid = [
    {
        field: 'orderID',
        headerText: 'orderID',
        width: '100',
        textAlign: 'Center',
    },
    {
        field: 'details',
        headerText: 'Orders',
        template: detailsTemplate,
        width: '300',
        textAlign: 'Center',
    },
    {
        field: 'customerName',
        headerText: 'Customer',
        width: '100',
        textAlign: 'Center',
    },
    {
        field: 'date',
        headerText: 'Date',
        width: '100',
        template: dateTempalte,
        textAlign: 'Center',
    },
    {
        field: 'totalAmount',
        headerText: 'Total Amount',
        width: '100',
        textAlign: 'Center',
    },
    {
        field: 'totalPayment',
        headerText: 'Total Payment',
        width: '100',
        textAlign: 'Center',
    },
];
