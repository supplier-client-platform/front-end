
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { URL_CONST } from '../config/url.constants';
import 'rxjs/Rx';
import { UserService } from './user.service';

@Injectable()
export class DashboardService {



    options: RequestOptions;

    constructor(private http: Http, private userService: UserService) {
        this.options = this.userService.options;
    }

    getSales() {
        return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/dashboard/sales_stats/supplier/' + this.userService.supplierID)
            .map((response: Response) => response.json());
    }

    getOrders() {
        return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/dashboard/order_stats/supplier/' + this.userService.supplierID)
            .map((response: Response) => response.json());
    }

    getStats() {
        return this.http.get(URL_CONST.DEV_PREFIX + 'api/v1/dashboard/widget_stats/supplier/' + this.userService.supplierID)
            .map((response: Response) => response.json());
    }

}


