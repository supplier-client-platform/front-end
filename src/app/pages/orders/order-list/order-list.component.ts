import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { CommonService } from '../../../shared/services/common.service';

export interface IOrderStatusSubmit {
  orderID: string;
  status: string;
  reason: string;
}

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
 @ViewChild('lgModal') lgModal;
  pendingOrders: Array<any> = [];
  completedOrders: Array<any> = [];
  searchOrders: Array<any> = [];
  orderInfo: any;
  orderInfoStatus: string;

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

  loadModal(status) {
    this.orderInfoStatus = status;
    this.lgModal.show();
  }

  orderStatusSubmit(values: any) {
    console.log(values.reason);

    let obj: IOrderStatusSubmit = {
      orderID: this.orderInfo.status,
      status: this.orderInfoStatus,
      reason: values.reason
    };

    // TODO need to handle this after a success response from the server otherwise need to give a proper error message.
    this.orderInfo.status = this.orderInfoStatus;
    this.lgModal.hide();

    this.orderService.changeOrderStatus(obj).subscribe((data: any) => {
      //
    }, (err) => {
      console.log(err);
    });
  }

}
