import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { CommonService } from '../../../shared/services/common.service';



interface QueryObject {
  query: any;
  status: any;
  brand: any;
  itemsPerPage: number;
  pageNo: number;
}

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

  obj: QueryObject = {
    query: undefined,
    status: undefined,
    brand: undefined,
    itemsPerPage: this.itemsPerPage,
    pageNo: this.pageNo
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
        if (type === 'New') {
          this.productList = data.data;
        } else {
          this.productList.concat(data.data);
        }
      });
  }

  private getBrands() {
    this.productService.getBrands()
      .subscribe((data: any) => this.brandList = data.data);
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
      pageNo: this.pageNo
    };
    this.getProducts('New');
  }



}
