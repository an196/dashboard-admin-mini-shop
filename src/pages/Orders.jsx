import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExelExport,
  PdfExport,
  Edit,
  Inject,
} from "@syncfusion/ej2-react-grids";

import {ordersData, contextMenuItems, ordersGrid} from "../data/dummy";
import { Header } from '../components';


function Orders() {
  return (
    <div className="mt-16 p-2 md:m-10  md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Orders"/>
      <GridComponent 
          id="gridcomp"
          dataSource={ordersData}
          allowPaging
          allowSorting
          allowAdding
          toolbar={contextMenuItems}
      >
        <ColumnsDirective>
          {ordersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item}/>
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, Edit, PdfExport]}/>
      </GridComponent>
    </div>
  );
}

export default Orders;
