import React, { useRef } from 'react';
//Synfusion
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Search,
    Inject,
    Toolbar,
    Edit,
} from '@syncfusion/ej2-react-grids';
import { Browser} from '@syncfusion/ej2-base';

import { employeesGrid } from '../features/employee/employeesGrid';
import { DialogFormTemplate } from '../features/employee/DialogFormTemplate';
import { Header } from '../components';
import {
    useGetEmployeesQuery,
    useDeleteEmployeeMutation,
    useUpdateEmployeeMutation,
    useCreateEmployeeMutation,
} from '../features/employee/employeeApiSlice';
import { ActionButton } from '../components';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../context/ContextProvider';

function Employees() {
    const toolbarOptions = [
        'Add',
        {
            text: 'Delete',
            tooltipText: 'Delete',
            prefixIcon: 'e-delete',
            id: 'delete',
        },
        'Search',
        'Edit',
        'Update',
        'Cancel',
    ];

    const editing = {
        allowDeleting: true,
        allowEditing: true,
        allowAdding: true,
        mode: 'Dialog',
        template: dialogTemplate,
        showConfirmDialog: false,
    };

    const { currentColor } = useStateContext();

    const { data, isLoading, isSuccess, isError, error } = useGetEmployeesQuery();
    const [deleteEmployee] = useDeleteEmployeeMutation();
    const [updateEmployee] = useUpdateEmployeeMutation();
    const [createEmployee] = useCreateEmployeeMutation();

    let employees;
    let dialogInstance = useRef();
    let gridInstance = useRef();
    let isDelete = false;
    let buttons = [
        {
            buttonModel: {
                content: 'OK',
                cssClass: 'e-flat',
                isPrimary: true,
            },
            click: () => confirmationClick(),
        },
        {
            buttonModel: {
                content: 'Cancel',
                cssClass: 'e-flat',
            },
            click: () => cancelClick(),
        },
    ];

    let buttons1 = [
        {
            buttonModel: {
                content: 'OK',
                cssClass: 'e-flat',
                isPrimary: true,
            },
            click: () => {
                dialogInstance.hide();
            },
        },
    ];

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
            .then((data) => {})
            .catch((err) => console.log(err));
    };

    function actionBegin(args) {
        if (args.requestType === 'beginEdit') {
            gridInstance.toolbarModule.toolbar.enableItems(2, false);
        }
        if (args.requestType === 'save') {
            gridInstance.toolbarModule.toolbar.enableItems(2, true);
        }
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
            dialog.header =
                args.requestType === 'beginEdit' ? 'Edit Employee ' + args.rowData['employeeID'] : 'New Employee';
        }

        if (args.requestType === 'save' && args.form) {
            if (args.data.employeeID) {
                updateEmployee(args.data)
                    .unwrap()
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err));
            } else {
                createEmployee(args.data)
                    .unwrap()
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err));
            }
        }
    }

    function actionFailure(args) {}

    function dialogTemplate(props) {
        return <DialogFormTemplate {...props} />;
    }

    function toolbarClick(args) {
        dialogInstance.buttons = buttons;
        if (args.item.id === 'delete') {
            if (gridInstance.getSelectedRecords().length !== 0) {
                isDelete = true;
                dialogInstance.content = 'Do you wish to delete the selected record?';
                dialogInstance.show();
            } else {
                dialogInstance.content = 'No record selected for deletion';
                dialogInstance.buttons = buttons1;
                dialogInstance.show();
            }
        }
    }

    function confirmationClick(args) {
        if (isDelete) {
            isDelete = false;
            dialogInstance.hide();
            gridInstance.deleteRecord();
        }
    }

    function cancelClick(args) {
        dialogInstance.hide();
    }

    return (
        <div className='mt-16 p-0 md:m-10  md:p-10 bg-white rounded-3xl'>
            <div className='flex justify-between items-center p-2 md:p-0' id='dialog-target'>
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
            <div className='p-2 md:p-0 w-full'>
                <GridComponent
                    id='gridcomp'
                    ref={(grid) => (gridInstance = grid)}
                    dataSource={employees}
                    allowPaging
                    allowSorting
                    toolbar={toolbarOptions}
                    width='auto'
                    editSettings={editing}
                    actionBegin={actionBegin.bind(this)}
                    actionComplete={actionComplete.bind(this)}
                    actionFailure={actionFailure.bind}
                    toolbarClick={toolbarClick}
                >
                    <ColumnsDirective>
                        {employeesGrid.map((item, index) => (
                            <ColumnDirective key={index} {...item} />
                        ))}
                    </ColumnsDirective>
                    <Inject services={[Page, Search, Toolbar, Edit]} />
                </GridComponent>
                <DialogComponent
                    width='300px'
                    target='#dialog-target'
                    visible={false}
                    isModal={true}
                    ref={(dialog) => (dialogInstance = dialog)}
                />
            </div>
        </div>
    );
}

export default Employees;
