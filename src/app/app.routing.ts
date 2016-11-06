import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { USER_ROUTES } from './pages/pages.routing';
import { LoginGuard } from './shared/guards/login.guard';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: USER_ROUTES,
        canActivate: [LoginGuard]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/product/list',
        pathMatch: 'full'
    }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
