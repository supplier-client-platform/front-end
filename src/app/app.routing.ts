import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { USER_ROUTES } from './pages/pages.routing';


const APP_ROUTES: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: USER_ROUTES
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: '',
        redirectTo: '/product/list',
        pathMatch: 'full'
    }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);