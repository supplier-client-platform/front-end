import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DropzoneModule, DropzoneConfigInterface } from 'angular2-dropzone-wrapper';
// import { NglModule, provideNglConfig } from 'ng-lightning/ng-lightning';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AccordionModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

// providers
import { ProductService } from './shared/services/product.service';
import { CommonService } from './shared/services/common.service';

// custom components
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';
import { Routing } from './app.routing';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductAddComponent } from './pages/products/product-add/product-add.component';
import { ProductEditComponent } from './pages/products/product-edit/product-edit.component';
import { OrderListComponent } from './pages/orders/order-list/order-list.component';
import { LoadingComponent } from './layout/loading/loading.component';
import { BussinessComponent } from './pages/bussiness/bussiness/bussiness.component';
import { OrderListTableComponent } from './pages/orders/order-list/order-list-table/order-list-table.component';



const DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  server: 'https://httpbin.org/post',
  maxFilesize: 50,
  previewDelay: 5000,
  acceptedFiles: 'image/*'
};
// NglModule,
// provideNglConfig({ 'svgPath': './icons' })

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    Routing,
    DropzoneModule.forRoot(DROPZONE_CONFIG),
    TabsModule,
    AccordionModule,
    ModalModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LayoutComponent,
    LoginComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
    OrderListComponent,
    LoadingComponent,
    BussinessComponent,
    OrderListTableComponent
  ],
  providers: [
    ProductService,
    CommonService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }


