import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { URL_CONST } from '../config/url.constants';
import 'rxjs/Rx';
import { UserService } from './user.service';

@Injectable()
export class BrandService {


  options: RequestOptions;

  constructor(private http: Http, private userService: UserService) {
    this.options = this.userService.options;
  }

  getBrands(params) {
    return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/brand/all?' + params)
      .map((response: Response) => response.json());
  }

  editBrand(params) {
    return this.http.post(URL_CONST.DEV_PREFIX + 'api/v1/brand/update/brand_id/' + params.id, params, this.options)
      .map((response: Response) => response);
  }

  saveBrand(params) {
    return this.http.post(URL_CONST.DEV_PREFIX + 'api/v1/brand/create/new', params, this.options)
      .map((response: Response) => response);
  }

  deleteBrand(params) {
    return this.http.post(URL_CONST.DEV_PREFIX + 'api/v1/brand/delete/brand_id/'+ params.id, params, this.options)
      .map((response: Response) => response);
  }
}
