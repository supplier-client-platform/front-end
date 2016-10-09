import { Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';



export const ORDER_ROUTES: Routes = [

    {
        path: 'list',
        component: OrderListComponent
    },
    {
        path: '',
        redirectTo: 'list'
    }
];
