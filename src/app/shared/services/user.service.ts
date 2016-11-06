import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { URL_CONST } from '../config/url.constants';
import 'rxjs/Rx';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class UserService {

  public supplierID: number;
  public userID: number;
  public token: string;


  headers = new Headers({ 'Content-Type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }


  login(params) {
    return this.http.post(URL_CONST.DEV_PREFIX + 'api/v1/users/regen_auth', params, this.options)
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

  getBussinessCategories() {
    return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/business/categories/all')
      .map((response: Response) => response.json());
  }

  getCities() {
    return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/cities/all')
      .map((response: Response) => response.json());
  }

  updateBussiness(param) {
    return this.http.post(URL_CONST.DEV_PREFIX + 'api/v1/business/update/business_id/' + this.supplierID, param, this.options)
      .map((response: Response) => response.json());
  }

  updateUser(param) {
    return this.http.post(URL_CONST.DEV_PREFIX + 'api/v1/profile/update/user_id/' + this.userID, param, this.options)
      .map((response: Response) => response.json());
  }


  isAuthorized() {
    return (this.userID && this.token);
  }


  saveToken(tokenString, id) {
    Cookie.set('_token', tokenString);
    Cookie.set('_user', id);
    this.setToken();

  }

  saveBussiness(id) {
    Cookie.set('_bussiness', id);
    this.setBussiness();
  }

  setBussiness() {
    this.supplierID = parseInt(Cookie.get('_bussiness'), 10);
    this.setToken();
  }

  setToken() {
    this.token = Cookie.get('_token');
    this.userID = parseInt(Cookie.get('_user'), 10);
  }

  logout() {
    Cookie.deleteAll();
  }
}
