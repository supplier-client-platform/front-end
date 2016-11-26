import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// 3rd party components
import { DropzoneModule } from 'angular2-dropzone-wrapper';
import { TabsModule, CollapseModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AccordionModule } from 'ng2-bootstrap/ng2-bootstrap';
import { ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ImageUploadModule } from 'ng2-imageupload';
import { NKDatetime } from 'ng2-datetime/ng2-datetime';
import { ToastyModule } from 'ng2-toasty';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
// providers
import { ProductService } from './shared/services/product.service';
import { CommonService } from './shared/services/common.service';
import { OrderService } from './shared/services/order.service';
import { UserService } from './shared/services/user.service';
import { LoginGuard } from './shared/guards/login.guard';
import { DashboardService } from './shared/services/dashboard.service';

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
import { ReportsComponent } from './pages/reports/reports.component';
import { SearchComponent } from './pages/search/search.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { BrandProductsComponent } from './pages/brands/brand-products/brand-products.component';
import { BrandService } from './shared/services/brand.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {SearchOrderPipe} from './shared/pipes/order-search.pipe';
import {SearchBrandPipe} from './shared/pipes/brand-search.pipe';
import { BrandReportListTableComponent } from './pages/reports/brand-report-list-table/brand-report-list-table.component';
import { OrderReportListTableComponent } from './pages/reports/order-report-list-table/order-report-list-table.component';
import { ProductReportListTableComponent } from './pages/reports/product-report-list-table/product-report-list-table.component';
import {ReportService} from './shared/services/report.service';

const GMAP_KEY = 'AIzaSyCwkmAAikH-IoW8ZTNaqz73qhddfm9rOrE';

const GMAP_CONFIG = {
  apiKey: GMAP_KEY,
  libraries: ['places']
};
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
    AgmCoreModule.forRoot(GMAP_CONFIG),
    ImageUploadModule,
    DropzoneModule.forRoot(DROPZONE_CONFIG),
    ReactiveFormsModule,
    ToastyModule.forRoot(),
    CollapseModule,
    ChartsModule,
    SlimLoadingBarModule.forRoot()
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
    OrderInfoComponent,
    ReportsComponent,
    NKDatetime,
    SearchComponent,
    BrandsComponent,
    BrandProductsComponent,
    DashboardComponent,
    SearchOrderPipe,
    SearchBrandPipe,
    BrandReportListTableComponent,
    OrderReportListTableComponent,
    ProductReportListTableComponent
  ],
  providers: [
    ProductService,
    CommonService,
    OrderService,
    UserService,
    BrandService,
    DashboardService,
    LoginGuard,
    ReportService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }


