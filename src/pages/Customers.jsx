import React, { useRef } from 'react';
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Page,
    Selection,
    Inject,
    Edit,
    Toolbar,
    Sort,
    Filter,
    Search
} from '@syncfusion/ej2-react-grids';

// import { customersData, customersGrid } from "../data/dummy";
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { Header } from '../components';
import { customersGrid } from '../features/customer/customersGrid';
import { useGetCustomersQuery, useDeleteCustomersMutation } from '../features/customer/customerApiSlice';

const toolbarOptions = [
    {
        text: 'Delete',
        tooltipText: 'Delete',
        prefixIcon: 'e-delete',
        id: 'delete',
    },
    'Search',
    'Cancel',
];


function Customers() {
    const { data, isLoading, isSuccess, isError, error } = useGetCustomersQuery();
    const [deleteCustomers] = useDeleteCustomersMutation();

    let customers;
    let isDelete = false;
    let dialogInstance = useRef();
    let gridInstance = useRef();

    if (isLoading) {
        return  (<p>"Loading..."</p>);
    }

    if (isSuccess) {
        customers = [...data];
    }
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

    const handleDelete = (id) => {
        deleteCustomers(id)
            .unwrap()
            .then((data) => {})
            .catch((err) => console.log(err));
    };

    function actionBegin(args) {
        if (args.requestType === 'delete') {
            //triggers while deleting the record
            const id = args.data[0]?._id;
            handleDelete(id);
        }
    }

    function actionComplete(args) {}

    return (
        <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
            <div className='flex justify-between items-center'  id='dialog-target'>
            <Header category='Page' title='Customers' />
            </div>
            <GridComponent
                id='gridcomp'
                ref={(grid) => (gridInstance = grid)}
                dataSource={customers}
                allowPaging
                allowSorting
                editSettings={{ allowDeleting: true }}
                width='auto'
                toolbar={toolbarOptions}
                toolbarClick={toolbarClick}
                actionBegin={actionBegin}
                actionComplete={actionComplete}
            >
                <ColumnsDirective>
                    {customersGrid.map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                    ))}
                </ColumnsDirective>
                <Inject services={[Page, Toolbar, Edit, Sort, Filter, Search]} />
            </GridComponent>
            <DialogComponent
                width='300px'
                target='#dialog-target'
                visible={false}
                isModal={true}
                ref={(dialog) => (dialogInstance = dialog)}
            />
        </div>
    );
}

export default Customers;
