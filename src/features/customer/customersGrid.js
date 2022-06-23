import { format } from 'date-fns';

const customerGridImage = (props) => (
    <div className='image flex gap-4'>
        <img className='rounded-full w-10 h-10' src={props.imgProfile} alt='employee' />
        <div>
            <p>{props.name}</p>
            <p>{props.email}</p>
        </div>
    </div>
);

const customerJoinDate = (props) => (
    <div className='flex items-center justify-center gap-2'>
        <span>{format(new Date(props.joinDate), 'dd/MM/yyyy')}</span>
    </div>
);

const customerLastAccessDate = (props) => (
    <div className='flex items-center justify-center gap-2'>
        <span>{format(new Date(props.lastAccessAt), 'dd/MM/yyyy')}</span>
    </div>
)

export const customersGrid = [
    {
        field: 'customerID',
        headerText: 'CustomerID',
        width: '150',
        textAlign: 'Center',
    },
    {
        headerText: 'Name',
        width: '150',
        template: customerGridImage,
        textAlign: 'Center',
    },
    {
        field: 'country',
        headerText: 'Country',
        width: '150',
        textAlign: 'Center',
    },
    {
        field: 'joinDate',
        headerText: 'Join Date',
        width: '150',
        template: customerJoinDate,
        textAlign: 'Center',
    },
    {
        field: 'lastAccessAt',
        headerText: 'Current access',
        template: customerLastAccessDate,
        width: '150',
        textAlign: 'Center',
    },
    {
        field: 'totalBill',
        headerText: 'Total bill',
        width: '150',
        textAlign: 'Center',
    },
];
