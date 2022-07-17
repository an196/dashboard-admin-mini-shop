import React, { useEffect, useCallback, useMemo } from 'react';
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
import { useGetProductsQuery,useDeleteProductMutation, useCreateProductMutation, useUpdateProductMutation } from '../features/product/productApiSlice';
import { productGrid } from '../features/product/productGrid';
import { Header, ActionButton } from '../components';
import DialogFormTemplate from '../features/product/DialogFormTemplate';
import { Browser, extend } from '@syncfusion/ej2-base';
import { useStateContext } from '../context/ContextProvider';

function Products() {
    //table
    const toolbarOptions = ['Add', 'Delete', 'Search', 'Edit', 'Update', 'Cancel'];
    const editing = { allowDeleting: true, allowEditing: true, mode: 'Dialog', allowAdding: true, template: dialogTemplate };

    //rtk query
    const { data, isSuccess } = useGetProductsQuery();
    const [deleteProduct] = useDeleteProductMutation();
    const [createProduct] = useCreateProductMutation();
    const [updateProduct] = useUpdateProductMutation();

    //context
    const {currentColor} = useStateContext();
    let products;
   
    if(isSuccess){
        products = [...data];
        console.log(products)
        
    }

    function actionBegin(args) {
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
                console.log(args.data)
                updateProduct(args.data)
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

    return (
        <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
            <div className='flex justify-between items-center'>
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
                dataSource={products}
                allowPaging
                allowSorting
                toolbar={toolbarOptions}
                width='auto'
                editSettings={editing}
                actionBegin={actionBegin}
                actionComplete={actionComplete}
            >
                <ColumnsDirective>
                    {productGrid.map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                    ))}
                </ColumnsDirective>
                <Inject services={[Page, Search, Toolbar, Edit]} />
            </GridComponent>
        </div>
    );
}

export default Products;
