import { GrLocation } from 'react-icons/gr';
import {format} from 'date-fns';

const gridEmployeeProfile = (props) => (
    <div className='flex items-center gap-2'>
        <img className='rounded-full w-10 h-10' src={props.imgProfile} alt='employee' />
        <p>{props.name}</p>
    </div>
);

const gridEmployeeCountry = (props) => (
    <div className='flex items-center justify-center gap-2'>
        <GrLocation />
        <span>{props.country}</span>
    </div>
);

const gridEmployeeHireDate = (props) => (
  <div className='flex items-center justify-center gap-2'>
      <span>{format(new Date(props.hireDate), 'dd/MM/yyyy')}</span>
  </div>
);

export const employeesGrid = [
    {
        field: 'employeeID',
        headerText: 'Employee',
        width: '150',
        textAlign: 'Center',
    },
    {
        headerText: 'Employee',
        width: '150',
        template: gridEmployeeProfile,
        textAlign: 'Center',
    },
    {
        field: 'name',
        headerText: '',
        width: '0',
        textAlign: 'Center',
    },
    {
        field: 'email',
        headerText: 'Email',
        width: '150',
        textAlign: 'Center',
    },
    {
        field: 'country',
        headerText: 'Country',
        width: '150',
        template: gridEmployeeCountry,
        textAlign: 'Center',
    },
    {
        field: 'hireDate',
        headerText: 'Hire date',
        width: '150',
        template: gridEmployeeHireDate,
        textAlign: 'Center',
    },
    {
        field: 'reportTo',
        headerText: 'Report to',
        width: '150',
        textAlign: 'Center',
    },
];
