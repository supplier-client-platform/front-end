import { Routes, RouterModule } from "@angular/router";
import { OrderListComponent } from "./orders/order-list/order-list.component";
import { PRODUCT_ROUTES } from "./products/products.routing";



export const USER_ROUTES: Routes = [

    {
        path: "product",
        children: PRODUCT_ROUTES
    },
    {
        path: "order",
        component: OrderListComponent
    }
];
