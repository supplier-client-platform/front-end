
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { URL_CONST } from '../config/url.constants';
import 'rxjs/Rx';
import { UserService } from './user.service';

@Injectable()
export class OrderService {



  options: RequestOptions;

  constructor(private http: Http, private userService: UserService) {
    this.options = this.userService.options;
  }

  // --Tested
  getOrders(params) {
    return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/order/all?' + params)
      .map((response: Response) => response.json());
  }

  // --Tested
  getProducts(params) {
    return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/order/products/order_id/' + params.orderID)
      .map((response: Response) => response.json());
  }

  // --Tested
  changeOrderStatus(params) {
    return this.http.post(URL_CONST.DEV_PREFIX + 'api/v1/order/update/order_id/' + params.orderID, params, this.options)
      .map((response: Response) => response);
  }
}


