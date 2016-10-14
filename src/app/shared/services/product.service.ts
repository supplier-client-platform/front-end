import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { URL_CONST } from '../config/url.constants';
import 'rxjs/Rx'; // observables

@Injectable()
export class ProductService {


  constructor(private http: Http) { }

  // --Tested
  getProducts(params) {
    return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/product/all?' + params)
      .map((response: Response) => response.json());
  }

  createProduct(params) {

    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers });
    params.custom_attr.pop();

    return this.http.post(URL_CONST.DEV_PREFIX + 'api/v1/product/create/new', params, options)
      .map((response: Response) => response);
  }

  getProduct(params) {
    console.log(params);
    return this.http.get(URL_CONST.URL_PREFIX + 'product/' + params)
      .map((response: Response) => response.json());
  }

  // --Tested
  getBrands(id) {
    let params = '?supplier_id=' + id;
    return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/brand/all' + params)
      .map((response: Response) => response.json());
  }


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
