import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

// 3rd party components
import { DropzoneModule, DropzoneConfigInterface } from 'angular2-dropzone-wrapper';
import { TabsModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AccordionModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ImageUploadModule } from 'ng2-imageupload';

// providers
import { ProductService } from './shared/services/product.service';
import { CommonService } from './shared/services/common.service';
import { OrderService } from './shared/services/order.service';

// Directives
// import { GoogleplaceDirective } from '../../node_modules/angular2-google-map-auto-complete/directives/googleplace.directive';

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
import { OrderInfoComponent } from './pages/orders/order-list/order-info/order-info.component';




const GMAP_KEY = 'AIzaSyCwkmAAikH-IoW8ZTNaqz73qhddfm9rOrE';

const DROPZONE_CONFIG = {
  server: 'https://httpbin.org/post',
  maxFilesize: 50,
  previewDelay: 5000,
  acceptedFiles: 'image/*'
};


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    Routing,
    TabsModule,
    AccordionModule,
    ModalModule,
    AgmCoreModule.forRoot({
      apiKey: GMAP_KEY
    }),
    ImageUploadModule,
    DropzoneModule.forRoot(DROPZONE_CONFIG),
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
    OrderListTableComponent,
    OrderInfoComponent
  ],
  providers: [
    ProductService,
    CommonService,
    OrderService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }


