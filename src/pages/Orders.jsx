import React from 'react';
import {
    GridComponent,
    ColumnsDirective,
    ColumnDirective,
    Resize,
    Sort,
    ContextMenu,
    Filter,
    Page,
    PdfExport,
    Edit,
    Inject,
    Search
} from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import { useGetOrdersQuery } from '../features/order/orderApiSlice';
import {orderGrid} from '../features/order/orderGrid';

const toolbarOptions = [
  'Search',
];

function Orders() {
    const { data, isLoading, isSuccess } = useGetOrdersQuery();

    let orders;

    if (isLoading) {
        return <p>"Loading..."</p>;
    }

    if (isSuccess) {
        orders = [...data];
        console.log(orders)
    }

    return (
        <div className='mt-16 p-2 md:m-10  md:p-10 bg-white rounded-3xl'>
            <Header category='Page' title='Orders' />
            <GridComponent
                id='gridcomp'
                dataSource={orders}
                allowPaging
                allowSorting
                allowAdding
                toolbar={toolbarOptions}
            >
                <ColumnsDirective>
                    {orderGrid.map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                    ))}
                </ColumnsDirective>
                <Inject services={[Resize, Sort, ContextMenu, Filter, Page, Edit, PdfExport ,Search]} />
            </GridComponent>
        </div>
    );
}

export default Orders;
