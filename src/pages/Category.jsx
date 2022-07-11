import React, { useEffect, useCallback, useMemo, useState } from 'react';
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
import { Browser, extend } from '@syncfusion/ej2-base';
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
    const toolbarOptions = ['Add', 'Delete', 'Search', 'Edit', 'Update', 'Cancel'];
    const editing = {
        allowDeleting: true,
        allowEditing: true,
        allowAdding: true,
        mode: 'Dialog',
        template: dialogTemplate,
    };
    const { data, isLoading, isSuccess, isError, error } = useGetCategoriesQuery();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();
    const [createCategory] = useCreateCategoryMutation();

    let categories;

    if (isSuccess) {
        categories = [...data];
        console.log(categories)
    }

    const handleDelete = (id) => {
        deleteCategory(id)
            .unwrap()
            .then((data) => {})
            .catch((err) => console.log(err));
    };

    function actionBegin(args) {
        if (args.requestType === 'delete') {
            console.log(args.data[0]);
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
                console.log(args.data)
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

    return (
        <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
            <div className='flex justify-between items-center'>
                <Header category='Page' title='Categories' />
            </div>

            <GridComponent
                id='gridcomp'
                dataSource={categories}
                allowPaging
                allowSorting
                toolbar={toolbarOptions}
                width='auto'
                editSettings={editing}
                actionBegin={actionBegin}
                actionComplete={actionComplete}
            >
                <ColumnsDirective>
                    {categoryGrid.map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                    ))}
                </ColumnsDirective>
                <Inject services={[Page, Search, Toolbar, Edit]} />
            </GridComponent>
        </div>
    );
}

export default Category;
