import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { URL_CONST } from '../config/url.constants';
import 'rxjs/Rx';


@Injectable()
export class UserService {

  public supplierID: number = 1;
  public userID: number = 1;



  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }


  login(params) {
    return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/product/all?' + params)
      .map((response: Response) => response.json());
  }


  getUserDetails() {
    return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/profile/details/user_id/' + this.userID)
      .map((response: Response) => response.json());
  }

  getBussinessDetails() {
    return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/business/details/user_id/' + this.userID)
      .map((response: Response) => response.json());
  }


}
