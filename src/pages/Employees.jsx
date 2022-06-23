import React, {useEffect} from 'react';
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Search,
    Inject,
    Toolbar,
} from '@syncfusion/ej2-react-grids';

import { employeesData,  } from '../data/dummy';
 import { employeesGrid } from '../data/employeesGrid';
import { Header } from '../components';
import { useGetEmployeesQuery } from '../features/employee/employeeApiSlice';

function Employees() {
    const { data: employees, isLoading, isSuccess, isError, error } = useGetEmployeesQuery();
    console.log("employees")
    console.log(employees)

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        content = (
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
        )
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return (
      content
        // <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
        //     <Header category='Page' title='Employees' />
        //     <GridComponent
        //         id='gridcomp'
        //         dataSource={employees}
        //         allowPaging
        //         allowSorting
        //         toolbar={['Search']}
        //         width='auto'
        //     >
        //         <ColumnsDirective>
        //             {employeesGrid.map((item, index) => (
        //                 <ColumnDirective key={index} {...item} />
        //             ))}
        //         </ColumnsDirective>
        //         <Inject services={[Page, Search, Toolbar]} />
        //     </GridComponent>
        // </div>
    );
}

export default Employees;
