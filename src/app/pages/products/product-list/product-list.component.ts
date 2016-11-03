import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../shared/services/product.service';
import {UserService} from '../../../shared/services/user.service';
import {CommonService} from '../../../shared/services/common.service';
import {IToastyObject} from '../../../shared/models/common.model';
import {QueryObject} from '../../../shared/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Array<Object> = [];
  brandList: Array<Object> = [];
  itemsPerPage: number = 11;
  pageNo: number = 1;
  showLoadMore: boolean = false;
  toastyObject: IToastyObject;
  obj: QueryObject = {
    query: undefined,
    status: undefined,
    brand: undefined,
    itemsPerPage: this.itemsPerPage,
    marketPlaceId: this.userService.supplierID,
    page: this.pageNo
  };

  constructor(private productService: ProductService, private commonService: CommonService, private userService: UserService) {
  }

  ngOnInit() {
    this.getProducts('New');
    this.getBrands();
  }

  private getProducts(type) {
    this.obj.page = this.pageNo;
    let rules: Array<any> = ['0', ''];
    let params = this.commonService.addQueryParams(this.obj, rules);

    this.productService.getProducts(params)
      .subscribe((data: any) => {
        console.log(data);
        // if no products found
        if (data.data.length === 0 && data.current_page === 1) {
          this.toastyObject = {title: 'Sorry', msg: 'No Products found matching your Query!', type: 'error'};
          this.commonService.toasty(this.toastyObject);
        }
        // if its a new search
        if (data.current_page === 1) {
          this.productList = data.data;
        } else {
          this.productList = this.productList.concat(data.data);
        }

        // if its a pagination request
        if (data.current_page === data.last_page || data.total === 0) {
          this.showLoadMore = false;
        } else {
          this.showLoadMore = true;
        }
      }, (err) => console.log(err));
  }

  private getBrands() {
    this.productService.getBrands(this.userService.supplierID)
      .subscribe((data: any) => this.brandList = data, (err) => console.log(err));
  }

  loadMore() {
    this.pageNo++;
    this.getProducts('Append');
  }

  searchProduct(query, status, brand) {
    this.pageNo = 1;
    this.obj = {
      query: query,
      status: status,
      brand: brand,
      itemsPerPage: this.itemsPerPage,
      page: this.pageNo,
      marketPlaceId: this.userService.supplierID,
    };
    this.getProducts('New');
  }
}
