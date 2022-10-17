import { format } from 'date-fns';

const detailsTemplate = (props) => (
    <div className='flex items-center justify-center h-[100px] overflow-y-auto flex-col space-y-2'>
        {props?.details.length > 0 &&
            props.details.map((item) => (
                <div className='flex flex-row space-x-3' key={item?.orderID}>
                    <img src={item?.image[0] || ''} width={30} height={30} className='w-[40px] h-[40px]' />
                    <div className='flex flex-col float-left text-left tex-[10px]'>
                        <h5>Name: {item?.name}</h5>
                        <h5>Price: {item?.price}</h5>
                        <h5>Category: {item?.category}</h5>
                        <h5>Quantity: {item?.quantity}</h5>
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
        width: '150',
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
        width: '150',
        textAlign: 'Center',
    },
    {
        field: 'date',
        headerText: 'Date',
        width: '150',
        template: dateTempalte,
        textAlign: 'Center',
    },
    {
        field: 'totalAmount',
        headerText: 'Total Amount',
        width: '150',
        textAlign: 'Center',
    },
    {
        field: 'totalPayment',
        headerText: 'Total Payment',
        width: '150',
        textAlign: 'Center',
    },
];
