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
import {useGetProductsQuery} from '../features/product/productApiSlice';
import { productGrid } from '../features/product/productGrid';
import { Header } from '../components';

function Products() {
  const toolbarOptions = ['Delete', 'Search', 'Edit', 'Update', 'Cancel'];
  const editing = { allowDeleting: true, allowEditing: true, mode: 'Dialog' };
  const { data: products } = useGetProductsQuery();

  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
        <div className='flex justify-between items-center'>
            <Header category='Page' title='Products' />
        </div>
        <GridComponent
            id='gridcomp'
            dataSource={products}
            allowPaging
            allowSorting
            toolbar={toolbarOptions}
            width='auto'
            editSettings={editing}
           
        >
            <ColumnsDirective>
                {productGrid.map((item, index) => (
                    <ColumnDirective key={index} {...item} />
                ))}
            </ColumnsDirective>
            <Inject services={[Page, Search, Toolbar]} />
        </GridComponent>
    </div>
)
}

export default Products