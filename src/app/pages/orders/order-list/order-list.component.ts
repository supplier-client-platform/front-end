import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderService} from '../../../shared/services/order.service';
import {CommonService} from '../../../shared/services/common.service';
import {IToastyObject} from '../../../shared/models/common.model';
import {UserService} from '../../../shared/services/user.service';
declare var Pusher: any;

/**
 * Interface representing an IOrderStatusSubmit.
 */
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

/**
 * Class representing an Order List Component.
 */
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

  /**
   * Function to get the pending order details from the REST API.
   */
  public getPendingOrders(): void {
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

  /**
   * Function to get complete order details from the REST API.
   */
  public getCompletedOrders(): void {
    let param = this.commonService.addQueryParams({marketPlaceId: this.userService.supplierID, status: 'Accepted'}, []);
    this.orderService.getOrders(param)
      .subscribe((data: any) => {
        this.completedOrders = data.data;
      }, (err) => {
        this.toastyObject = {title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error'};
        this.commonService.toasty(this.toastyObject);
      });
  }

  /**
   * Function to get the search order results from the REST API.
   * @param value - search key term.
   */
  public getSearchOrders(value): void {
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

  /**
   * Function to load the selected order details to orderInfo.
   * @param order - selected order details.
   */
  public loadOrder(order): void {
    this.orderInfo = order;
  }

  /**
   * Function to load the modal.
   * @param obj
   */
  public loadModal(obj): void {
    this.orderInfoStatus = obj.status;
    this.orderInfo = obj.orderInfo;
    this.lgModal.show();
  }

  /**
   * Function to send request to REST API upon changing the status.
   * @param values - details regarding the change.
   */
  public orderStatusSubmit(values: any): void {
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
