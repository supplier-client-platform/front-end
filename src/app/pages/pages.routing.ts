import { Routes } from '@angular/router';
import { BussinessComponent } from './bussiness/bussiness/bussiness.component';
import { ReportsComponent } from './reports/reports.component';
import { PRODUCT_ROUTES } from './products/products.routing';
import { ORDER_ROUTES } from './orders/orders.routing';


export const USER_ROUTES: Routes = [

    {
        path: 'product',
        children: PRODUCT_ROUTES
    },
    {
        path: 'order',
        children: ORDER_ROUTES
    },
    {
        path: 'bussiness',
        component: BussinessComponent
    },
    {
        path: 'reports',
        component: ReportsComponent
    }
];
