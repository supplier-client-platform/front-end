import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {URL_CONST} from '../config/url.constants';
import 'rxjs/Rx';

@Injectable()
export class BrandService {

  headers = new Headers({'Content-Type': 'application/json'});
  options = new RequestOptions({headers: this.headers});

  constructor(private http: Http) {
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
}
