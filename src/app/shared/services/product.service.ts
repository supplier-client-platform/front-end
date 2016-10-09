import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URL_CONST } from '../config/url.constants';
import 'rxjs/Rx'; // observables

@Injectable()
export class ProductService {


  constructor(private http: Http) { }

  getProducts(params) {
    return this.http.get(URL_CONST.URL_PREFIX + 'products?' + params)
      .map((response: Response) => response.json());
  }

  getProduct(params) {
    console.log(params);
    return this.http.get(URL_CONST.URL_PREFIX + 'product/' + params)
      .map((response: Response) => response.json());
  }

  getBrands() {
    return this.http.get(URL_CONST.URL_PREFIX + 'product/brands')
      .map((response: Response) => response.json());
  }

  getTemplates() {
     return this.http.get(URL_CONST.URL_PREFIX + 'template/all')
      .map((response: Response) => response.json());
  }
}
