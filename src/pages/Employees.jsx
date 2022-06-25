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
import { useGetEmployeesQuery, useDeleteEmployeeMutation } from '../features/employee/employeeApiSlice';
import { ActionButton } from '../components';
import { useStateContext } from '../context/ContextProvider';

const toolbarOptions = ['Delete', 'Search'];
const editing = { allowDeleting: true };

function Employees() {
    const { currentColor } = useStateContext();

    const {data, isLoading, isSuccess, isError, error } = useGetEmployeesQuery();
    const [ deleteEmployee, { isLoading: isDeleteLoading }]  = useDeleteEmployeeMutation();
    
    let employees;

    if (isLoading) {
        <p>"Loading..."</p>;
    }

    if (isSuccess) {
        employees = [...data];
    }

    if (isError) {
        console.log(error);
    }

    const handleDelete = (id) => {
        deleteEmployee(id).unwrap()
            .then((data)=>{
                console.log("ok")
            })
            .catch((err)=>console.log(err));
    }

    function actionBegin(args) {
        if (args.requestType === 'delete') {
            //triggers while deleting the record
            console.log('actionBegin triggers');
            console.log(args.data[0]?._id);
            const id = args.data[0]?._id;
            handleDelete(id)
        }
    }

    function actionComplete(args) {
        // if (args.requestType === 'delete') {
        //     //triggers while deleting the record
        //     
        //     console.log(args.data);
        // }
        console.log('actionDelete triggers');
    }

    useEffect(()=>{
        console.log('data change')
    },[data])

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
                toolbar={toolbarOptions}
                width='auto'
                editSettings={editing}
                actionBegin={actionBegin.bind(this)}
                actionComplete={actionComplete.bind(this)}
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
