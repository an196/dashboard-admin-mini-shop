import React, { useEffect } from 'react';
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Search,
    Inject,
    Toolbar,
} from '@syncfusion/ej2-react-grids';

import { employeesGrid } from '../features/employee/employeesGrid';
import { Header } from '../components';
import { useGetEmployeesQuery } from '../features/employee/employeeApiSlice';
import { ActionButton } from '../components';
import { useStateContext } from '../context/ContextProvider';

function Employees() {
    const { currentColor } = useStateContext();

    const { data: employees, isLoading, isSuccess, isError, error } = useGetEmployeesQuery();

    let content;
    if (isLoading) {
        <p>"Loading..."</p>;
    }

    return (
        <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
            <div className='flex justify-between items-center'>
                <Header category='Page' title='Employees' />
                <ActionButton
                    color='white'
                    bgColor={currentColor}
                    text='Add'
                    borderRadius='10px'
                    width='w-md'
                    customeStyle={`order-last h-8 text-center leading-normal flex items-center text-sm hover:${currentColor}/75`}
                    action='add'
                    to='/employees/add'
                />
            </div>
            <GridComponent
                id='gridcomp'
                dataSource={employees}
                allowPaging
                allowSorting
                toolbar={['Search']}
                width='auto'
            >
                <ColumnsDirective>
                    {employeesGrid.map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                    ))}
                </ColumnsDirective>
                <Inject services={[Page, Search, Toolbar]} />
            </GridComponent>
        </div>
    );
}

export default Employees;
