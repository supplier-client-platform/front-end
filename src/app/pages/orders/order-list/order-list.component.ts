import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from '../../../shared/services/order.service';
import {CommonService} from '../../../shared/services/common.service';
import {IToastyObject} from '../../../shared/models/common.model';
import {UserService} from '../../../shared/services/user.service';
declare var Pusher: any;

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
  toastyObject: IToastyObject;
  loading: boolean;
  pusher: any;
  channel: any;

  constructor(private commonService: CommonService, private orderService: OrderService, private userService: UserService) {
    this.loading = true;

    this.pusher = new Pusher('20b67caf4dad6ad7ae0d');
    this.channel = this.pusher.subscribe('order');
    this.channel.bind('order_web_notifications' + userService.supplierID, function (data) {
      this.getCompletedOrders();
      this.getPendingOrders();
    }.bind(this));
  }

  ngOnInit() {
    this.getCompletedOrders();
    this.getPendingOrders();
  }

  // TODO: Market place id should be available after login
  getPendingOrders() {
    let param = this.commonService.addQueryParams({marketPlaceId: this.userService.supplierID, status: 'Pending'}, []);
    this.orderService.getOrders(param)
      .subscribe((data: any) => {
        this.pendingOrders = data.data;
        this.loading = false;
      }, (err) => {
        this.toastyObject = {title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error'};
        this.commonService.toasty(this.toastyObject);
      });
  }

  getCompletedOrders() {
    let param = this.commonService.addQueryParams({marketPlaceId: this.userService.supplierID, status: 'Accepted'}, []);
    this.orderService.getOrders(param)
      .subscribe((data: any) => {
        this.completedOrders = data.data;
      }, (err) => {
        this.toastyObject = {title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error'};
        this.commonService.toasty(this.toastyObject);
      });
  }

  getSearchOrders(value) {
    let param = this.commonService.addQueryParams({
      marketPlaceId: this.userService.supplierID,
      orderId: value.orderId,
      customer_name: value.name
    }, ['']);
    this.orderService.getOrders(param)
      .subscribe((data: any) => {
        this.searchOrders = data.data;
      }, (err) => {
        this.toastyObject = {title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error'};
        this.commonService.toasty(this.toastyObject);
      });
  }

  loadOrder(order) {
    this.orderInfo = order;
  }

  loadModal(obj) {
    this.orderInfoStatus = obj.status;
    this.orderInfo = obj.orderInfo;
    this.lgModal.show();
  }

  orderStatusSubmit(values: any) {
    this.toastyObject = {title: 'Saving....', msg: 'Please wait', type: 'info'};
    this.commonService.toasty(this.toastyObject);

    let obj: IOrderStatusSubmit = {
      orderID: this.orderInfo.id,
      status: this.orderInfoStatus,
      reason: values.reason
    };

    this.lgModal.hide();

    this.orderService.changeOrderStatus(obj).subscribe((data: any) => {
      this.orderInfo.status = this.orderInfoStatus;
      this.getPendingOrders();
      this.getCompletedOrders();
      this.toastyObject = {title: 'Success', msg: 'Order status changed Successfully!', type: 'success'};
      this.commonService.toasty(this.toastyObject);
    }, (err) => {
      this.toastyObject = {title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error'};
      this.commonService.toasty(this.toastyObject);
    });
  }

}
