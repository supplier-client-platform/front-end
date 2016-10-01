import { Routes, RouterModule } from "@angular/router";
import { ProductListComponent } from "./products/product-list/product-list.component";


export const USER_ROUTES: Routes = [
    {
        path: "product-list",
        component: ProductListComponent
    }
];
