import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { CommonService } from '../../../shared/services/common.service';



interface QueryObject {
  query: any;
  status: any;
  brand: any;
  itemsPerPage: number;
  pageNo: number;
  marketPlaceId: number;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  supplierID: number = 1;
  productList: Array<Object> = [];
  brandList: Array<Object> = [];

  itemsPerPage: number = 11;
  pageNo: number = 1;

  showLoadMore: boolean = false;

  obj: QueryObject = {
    query: undefined,
    status: undefined,
    brand: undefined,
    itemsPerPage: this.itemsPerPage,
    pageNo: this.pageNo,
    marketPlaceId: this.supplierID
  };

  constructor(private productService: ProductService, private commonService: CommonService) { }

  ngOnInit() {
    this.getProducts('New');
    this.getBrands();
  }

  private getProducts(type) {

    this.obj.pageNo = this.pageNo;

    let rules: Array<any> = ['0', ''];

    let params = this.commonService.addQueryParams(this.obj, rules);

    this.productService.getProducts(params)
      .subscribe((data: any) => {
        console.log(data);
        if (type === 'New') {
          this.productList = data.data;
        } else {
          this.productList.concat(data.data);
        }

        if (data.data.length === this.itemsPerPage) {
          this.showLoadMore = true;
        } else {
          this.showLoadMore = false;
        }
      });
  }

  private getBrands() {
    this.productService.getBrands(this.supplierID)
      .subscribe((data: any) => this.brandList = data);
  }

  private loadMore() {
    this.pageNo++;
    this.getProducts('Append');
  }

  private searchProduct(query, status, brand) {
    this.obj = {
      query: query,
      status: status,
      brand: brand,
      itemsPerPage: this.itemsPerPage,
      pageNo: this.pageNo,
      marketPlaceId: this.supplierID
    };
    this.getProducts('New');
  }
}
