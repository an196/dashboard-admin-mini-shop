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
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import {
    useGetCategoriesQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useCreateCategoryMutation,
} from '../features/category/categoryApiSlice';
import { DialogFormTemplate } from '../features/category/DialogFormTemplate';
import { categoryGrid } from '../features/category/categoryGrid';
import { Header } from '../components';

function Category() {
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
    const { data, isSuccess } = useGetCategoriesQuery();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [createCategory] = useCreateCategoryMutation();

    let categories;
    //define variable
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

    if (isSuccess) {
        categories = [...data];
    }

    const handleDelete = (id) => {
        deleteCategory(id)
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
                args.dialog.dataBind();
            }

            const dialog = args.dialog;
            // change the header of the dialog
            dialog.header =
                args.requestType === 'beginEdit' ? 'Edit Record of ' + args.rowData['code'] : 'New Category';
        }

        if (args.requestType === 'save' && args.form) {
            if (args.data.code) {
                updateCategory(args.data)
                    .unwrap()
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err));
            } else {
                createCategory(args.data)
                    .unwrap()
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err));
            }
        }
    }

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
        <div className='hero-container'>
            <div className='flex justify-between items-center' id='dialog-target'>
                <Header category='Page' title='Categories' />
            </div>
            <div className='w-[95xw] md:w-full'>
                <GridComponent
                    id='gridcomp'
                    ref={(grid) => (gridInstance = grid)}
                    dataSource={categories}
                    allowPaging
                    allowSorting
                    toolbar={toolbarOptions}
                    width='auto'
                    editSettings={editing}
                    actionBegin={actionBegin}
                    actionComplete={actionComplete}
                    toolbarClick={toolbarClick}
                >
                    <ColumnsDirective>
                        {categoryGrid.map((item, index) => (
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

export default Category;
