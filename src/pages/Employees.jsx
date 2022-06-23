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

function Employees() {
    const { data: employees, isLoading, isSuccess, isError, error } = useGetEmployeesQuery();

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } 

    return (
        <>
            {isSuccess?
            <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
                <Header category='Page' title='Employees' />
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
            :<p>"Not content..."</p>
            }
        </>
    );
}

export default Employees;
