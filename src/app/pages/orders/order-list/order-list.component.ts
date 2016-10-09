import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { CommonService } from '../../../shared/services/common.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  pendingOrders: Array<any> = [];
  completedOrders: Array<any> = [];
  searchOrders: Array<any> = [];
  orderInfo: Object;


  constructor(private commonService: CommonService, private orderService: OrderService) { }

  ngOnInit() {
    this.getCompletedOrders();
    this.getPendingOrders();
  }

  getPendingOrders() {
    let param = this.commonService.addQueryParams({ status: 'Pending' }, []);
    this.orderService.getOrders(param)
      .subscribe((data: any) => {
        this.pendingOrders = data.data;
      });
  }

  getCompletedOrders() {
    let param = this.commonService.addQueryParams({ status: 'Completed' }, []);
    this.orderService.getOrders(param)
      .subscribe((data: any) => {
        this.completedOrders = data.data;
      });
  }
  getSearchOrders(id, query) {
    let param = this.commonService.addQueryParams({ orderId: id, query: query }, ['']);
    this.orderService.getOrders(param)
      .subscribe((data: any) => {
        this.searchOrders = data.data;
      });
  }

  loadOrder(order) {
    this.orderInfo = order;
  }

}
