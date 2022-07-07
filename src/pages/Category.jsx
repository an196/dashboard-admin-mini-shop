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
} from '@syncfusion/ej2-react-grids';

import {
    useGetCategoriesQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} from '../features/category/categoryApiSlice';
import { DialogFormTemplate } from '../features/category/DialogFormTemplate';
import { categoryGrid } from '../features/category/categoryGrid';
import { Header } from '../components';

function Category() {
    const toolbarOptions = ['Add','Delete', 'Search', 'Edit', 'Update', 'Cancel' ];
    const editing = {   allowAdding: true, allowDeleting: true, allowEditing: true, mode: 'Dialog', template: dialogTemplate };
    const { data, isLoading, isSuccess, isError, error } = useGetCategoriesQuery();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    let categories;
    if (isSuccess) {
        categories = data;
        console.log(categories);
    }

    const handleDelete = (id) => {
        deleteCategory(id)
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
        if (args.requestType === 'save' && args.form) {
            updateCategory(args.data)
                .unwrap()
                .then((data) => console.log(data))
                .catch((err) => console.log(err));
        }
    }

    function actionComplete(args) {
        if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
            const dialog = args.dialog;
            
            // change the header of the dialog
            dialog.header = args.requestType === 'beginEdit' ? 'Edit Record of ' + args.rowData['code'] : 'New Category';
        }
    }
    function dialogTemplate(props) {
      console.log('props')
      console.log(props)
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
                <Inject services={[Page, Search, Toolbar]} />
            </GridComponent>
        </div>
    );
}

export default Category;
