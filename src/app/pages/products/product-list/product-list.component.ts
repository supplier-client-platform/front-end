import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { UserService } from '../../../shared/services/user.service';
import { CommonService } from '../../../shared/services/common.service';
import { IToastyObject } from '../../../shared/interfaces/common.interfaces';



interface QueryObject {
  /**
   * 
   * 
   * @type {*}
   * @memberOf QueryObject
   */
  query: any;
  /**
   * 
   * 
   * @type {*}
   * @memberOf QueryObject
   */
  status: any;
  /**
   * 
   * 
   * @type {*}
   * @memberOf QueryObject
   */
  brand: any;
  /**
   * 
   * 
   * @type {number}
   * @memberOf QueryObject
   */
  itemsPerPage: number;
  /**
   * 
   * 
   * @type {number}
   * @memberOf QueryObject
   */
  marketPlaceId: number;
  /**
   * 
   * 
   * @type {number}
   * @memberOf QueryObject
   */
  page: number;
}

/**
 * 
 * 
 * @export
 * @class ProductListComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {


  /**
   * 
   * 
   * @type {Array<Object>}
   * @memberOf ProductListComponent
   */
  productList: Array<Object> = [];
  /**
   * 
   * 
   * @type {Array<Object>}
   * @memberOf ProductListComponent
   */
  brandList: Array<Object> = [];

  /**
   * 
   * 
   * @type {number}
   * @memberOf ProductListComponent
   */
  itemsPerPage: number = 11;
  /**
   * 
   * 
   * @type {number}
   * @memberOf ProductListComponent
   */
  pageNo: number = 1;

  /**
   * 
   * 
   * @type {boolean}
   * @memberOf ProductListComponent
   */
  showLoadMore: boolean = false;

  /**
   * 
   * 
   * @type {IToastyObject}
   * @memberOf ProductListComponent
   */
  toastyObject: IToastyObject;

  /**
   * 
   * 
   * @type {QueryObject}
   * @memberOf ProductListComponent
   */
  obj: QueryObject = {
    query: undefined,
    status: undefined,
    brand: undefined,
    itemsPerPage: this.itemsPerPage,
    marketPlaceId: this.userService.supplierID,
    page: this.pageNo
  };

  /**
   * Creates an instance of ProductListComponent.
   * 
   * @param {ProductService} productService
   * @param {CommonService} commonService
   * 
   * @memberOf ProductListComponent
   */
  constructor(private productService: ProductService, private commonService: CommonService, private userService: UserService) { }

  /**
   * 
   * 
   * 
   * @memberOf ProductListComponent
   * Lifecycle Hook of OnInit component
   */
  ngOnInit() {
    this.getProducts('New');
    this.getBrands();
  }


  /**
   * 
   * 
   * @private
   * @param {any} type
   * 
   * @memberOf ProductListComponent
   * Get Product List
   */
  private getProducts(type) {

    this.obj.page = this.pageNo;
    let rules: Array<any> = ['0', ''];
    let params = this.commonService.addQueryParams(this.obj, rules);

    this.productService.getProducts(params)
      .subscribe((data: any) => {
        console.log(data);
        // if no products found
        if (data.data.length === 0 && data.current_page === 1) {
          this.toastyObject = { title: 'Sorry', msg: 'No Products found matching your Query!', type: 'error' };
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

  /**
   * 
   * 
   * @private
   * 
   * @memberOf ProductListComponent
   * Get avalaibale brands for a specific supplier
   */
  private getBrands() {
    this.productService.getBrands(this.userService.supplierID)
      .subscribe((data: any) => this.brandList = data, (err) => console.log(err));
  }

  /**
   * 
   * 
   * 
   * @memberOf ProductListComponent
   * Load the next page of pagination
   */
  loadMore() {
    this.pageNo++;
    this.getProducts('Append');
  }

  /**
   * 
   * 
   * @param {any} query
   * @param {any} status
   * @param {any} brand
   * 
   * @memberOf ProductListComponent
   * Build the search product object
   */
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
