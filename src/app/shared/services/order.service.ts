
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { URL_CONST } from '../config/url.constants';
import 'rxjs/Rx';

@Injectable()
export class OrderService {

  constructor(private http: Http) {

  }

  getOrders(params) {
    return this.http.get(URL_CONST.URL_PREFIX + 'orders?' + params)
      .map((response: Response) => response.json());
  }

  // TODO: Set params values properly
  getOrderItems(params) {

    return this.http.get(URL_CONST.URL_PREFIX + 'order/2/items')
      .map((response: Response) => response.json());
  }
}


