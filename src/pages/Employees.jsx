import React, { useEffect, useCallback,useMemo } from 'react';
//Synfusion
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Search,
    Inject,
    Toolbar,
} from '@syncfusion/ej2-react-grids';
import { Browser, extend } from '@syncfusion/ej2-base';

import { employeesGrid } from '../features/employee/employeesGrid';
import { DialogFormTemplate } from '../features/employee/DialogFormTemplate';
import { Header } from '../components';
import {
    useGetEmployeesQuery,
    useDeleteEmployeeMutation,
    useUpdateEmployeeMutation,
} from '../features/employee/employeeApiSlice';
import { ActionButton } from '../components';
import { useStateContext } from '../context/ContextProvider';

function Employees() {
    const toolbarOptions = ['Delete', 'Search', 'Edit', 'Update', 'Cancel'];
    const editing = { allowDeleting: true, allowEditing: true, mode: 'Dialog', template: dialogTemplate };

    const { currentColor } = useStateContext();


    const { data, isLoading, isSuccess, isError, error } = useGetEmployeesQuery();
    const [deleteEmployee, ] = useDeleteEmployeeMutation();
    const [updateEmployee] = useUpdateEmployeeMutation();

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
        deleteEmployee(id)
            .unwrap()
            .then((data) => {
            })
            .catch((err) => console.log(err));
    };



    function actionBegin(args) {
        if (args.requestType === 'delete') {
            //triggers while deleting the record
            const id = args.data[0]?._id;
            handleDelete(id);
        }
       
    }

    function actionComplete(args) {
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            if (Browser.isDevice) {
                args.dialog.height = window.innerHeight - 90 + 'px';
                args.dialog.dataBind();
            }

            const dialog = args.dialog;
            // change the header of the dialog
            dialog.header = args.requestType === 'beginEdit' ? 'Edit Employee ' + args.rowData['employeeID'] : 'New Employee';
        }

        if (args.requestType === 'save' && args.form) {
             console.log(args.data)
            // const newInfo = {
            //     ...args.data,
            //     imgProfile:args.data.imgProfileUpdate
            // }
            updateEmployee(args.data)
                .unwrap()
                .then((data) => console.log(data))
                .catch((err) => console.log(err));
        }
    }

    function actionFailure(args) {
        
    }

    function dialogTemplate(props) {
        return <DialogFormTemplate {...props} />;
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
                toolbar={toolbarOptions}
                width='auto'
                editSettings={editing}
                actionBegin={actionBegin.bind(this)}
                actionComplete={actionComplete.bind(this)}
                actionFailure={actionFailure.bind}
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
