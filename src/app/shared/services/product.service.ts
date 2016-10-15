import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { URL_CONST } from '../config/url.constants';
import 'rxjs/Rx'; // observables

@Injectable()
export class ProductService {

  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  // --Tested
  getProducts(params) {
    return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/product/all?' + params)
      .map((response: Response) => response.json());
  }
  // --Tested
  createProduct(params) {
    return this.http.post(URL_CONST.DEV_PREFIX + 'api/v1/product/create/new', params, this.options)
      .map((response: Response) => response);
  }

  // --Tested
  getProduct(params) {
    return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/product/product_id/' + params)
      .map((response: Response) => response.json());
  }

  // --Tested
  updateProduct(params) {
    return this.http.post(URL_CONST.DEV_PREFIX + 'api/v1/product/update/' + params['id'], params, this.options)
      .map((response: Response) => response);
  }

  // --Tested
  getBrands(id) {
    let params = '?supplier_id=' + id;
    return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/brand/all' + params)
      .map((response: Response) => response.json());
  }

  // --Tested
  getTemplates(id) {
    let params = '?supplier_id=' + id;
    return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/template/all' + params)
      .map((response: Response) => response.json());
  }

  // --Tested
  getCategories() {
    return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/categories/all')
      .map((response: Response) => response.json());
  }
}
