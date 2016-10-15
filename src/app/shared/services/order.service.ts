
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers  } from '@angular/http';
import { URL_CONST } from '../config/url.constants';
import 'rxjs/Rx';
import {IOrderStatusSubmit} from '../../pages/orders/order-list/order-list.component';

@Injectable()
export class OrderService {

  constructor(private http: Http) {

  }

  getOrders(params) {
    return this.http.get(URL_CONST.DEV_PREFIX_R + 'api/v1/order/all?'+params)
      .map((response: Response) => response.json());
  }

  changeOrderStatus(params: IOrderStatusSubmit) {
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers });

    return this.http.post(URL_CONST.DEV_PREFIX_R + 'api/v1/order/update/'+params.orderID, params, options)
      .map((response: Response) => response);
  }
}


