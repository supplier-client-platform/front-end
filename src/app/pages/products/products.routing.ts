import { Routes } from '@angular/router';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductListComponent } from './product-list/product-list.component';



export const PRODUCT_ROUTES: Routes = [
    {
        path: 'list',
        component: ProductListComponent
    },
    {
        path: 'add',
        component: ProductAddComponent
    },
    {
        path: 'edit/:id',
        component: ProductEditComponent
    },
    {
        path: '',
        redirectTo: 'list'
    }

];
