
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { URL_CONST } from '../config/url.constants';
import 'rxjs/Rx';


@Injectable()
export class OrderService {

  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) {

  }

  // --Tested
  getOrders(params) {
    return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/order/all?' + params)
      .map((response: Response) => response.json());
  }

  // --Tested
  changeOrderStatus(params) {
    return this.http.post(URL_CONST.DEV_PREFIX + 'api/v1/order/update/' + params.orderID, params, this.options)
      .map((response: Response) => response);
  }
}


