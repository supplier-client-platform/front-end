import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { URL_CONST } from '../config/url.constants';
import 'rxjs/Rx';
import { UserService } from './user.service';

@Injectable()
export class ReportService {


  options: RequestOptions;

  constructor(private http: Http, private userService: UserService) {
    this.options = this.userService.options;
  }

  getBrandSales(params) {
    return this.http.post(URL_CONST.DEV_PREFIX + 'api/v1/reports/brand_reports/supplier/'+ params.marketPlaceId, params, this.options)
      .map((response: Response) => response.json());
  }

  getProductSales(params) {
    return this.http.post(URL_CONST.DEV_PREFIX + 'api/v1/reports/product_reports/supplier/' + params.marketPlaceId, params, this.options)
      .map((response: Response) => response.json());
  }
}
