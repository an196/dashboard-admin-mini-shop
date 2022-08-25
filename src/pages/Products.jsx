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
import {
    useGetProductsQuery,
    useDeleteProductMutation,
    useCreateProductMutation,
    useUpdateProductMutation,
} from '../features/product/productApiSlice';
import { productGrid } from '../features/product/productGrid';
import { Header, ActionButton, AlertModal } from '../components';
import DialogFormTemplate from '../features/product/DialogFormTemplate';
import { Browser, extend } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../context/ContextProvider';

function Products() {
    //table
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
        mode: 'Dialog',
        allowAdding: true,
        template: dialogTemplate,
        showConfirmDialog: false,
    };

    //rtk query
    const { data, isSuccess } = useGetProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    //context
    const { currentColor } = useStateContext();

    //define variable
    let products;
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
        products = [...data];
    }

    function actionBegin(args) {
        if (args.requestType === 'beginEdit') {
            gridInstance.toolbarModule.toolbar.enableItems(2, false);
        }
        if (args.requestType === 'save') {
            gridInstance.toolbarModule.toolbar.enableItems(2, true);
        }

        if (args.requestType === 'delete') {
            console.log(args.data[0]);
            //triggers while deleting the record
            const id = args.data[0]?._id;
            deleteProduct(id);
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
                args.requestType === 'beginEdit' ? 'Edit Record of ' + args.rowData['goodsID'] : 'New Product';
        }

        if (args.requestType === 'save' && args.form) {
            if (args.data.goodsID) {
             
                
                let newImages=[];
                let stringImages = args.data.image;
                console.log(stringImages)
                if(stringImages)
                    newImages = stringImages.split(',');

                 
                const newData = {
                    ...args.data,
                    image: newImages,
                };
                console.log(newData)
                updateProduct(newData)
                    .unwrap()
                    .then((data) => console.log(data))
                    .catch((err) => console.log(err));
            } else {
                createProduct(args.data)
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
        <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
            <div className='flex justify-between items-center' id='dialog-target'>
                <Header category='Page' title='Products' />
                <ActionButton
                    color='white'
                    bgColor={currentColor}
                    text='Add'
                    borderRadius='10px'
                    width='w-md'
                    customeStyle={`order-last h-8 text-center leading-normal flex items-center text-sm hover:${currentColor}/75`}
                    action='add'
                    to='/products/add'
                />
            </div>

            <GridComponent
                id='gridcomp'
                ref={(grid) => (gridInstance = grid)}
                dataSource={products}
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
                    {productGrid?.map((item, index) => (
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
    );
}

export default Products;
