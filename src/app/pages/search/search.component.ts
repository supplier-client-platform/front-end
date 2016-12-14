import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { CommonService } from '../../shared/services/common.service';
import { IOrderStatusSubmit } from '../orders/order-list/order-list.component';
import { UserService } from '../../shared/services/user.service';
import { IToastyObject } from '../../shared/models/common.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

/**
 * Class representing a search component.
 */
export class SearchComponent implements OnInit {

  @Output() rowSelected = new EventEmitter();
  @Output() orderSelected = new EventEmitter();
  searchOrders: Array<any> = [];
  orderInfo: any;
  orderInfoStatus: string;
  dateFrom: Date;
  dateTo: Date;
  datepickerToOpts = {};
  searched: boolean;
  toastyObject: IToastyObject;

  constructor(private commonService: CommonService, private orderService: OrderService, private userService: UserService) {
    this.searched = false;
  }

  ngOnInit() {

  }

  /**
   * Function to get the advance search order details from the REST API.
   * @param value - seach terms
   */
  public getAdvanceSearchOrders(value): void {
    this.dateFrom = value.startDate;
    let param = this.commonService.addQueryParams({
      marketPlaceId: this.userService.supplierID,
      orderId: value.orderId,
      customer_name: value.name,
      contact_number: value.customerMobile,
      startDate: value.startDate ? value.startDate.toISOString() : '',
      endDate: value.endDate ? value.endDate.toISOString() : ''
    }, ['']);
    this.orderService.getOrders(param)
      .subscribe((data: any) => {
        this.searchOrders = data.data;
        this.searched = true;
      });
  }

  /**
   * Function to load the selected order details.
   * @param order
   */
  public loadOrder(order): void {
    this.orderInfo = order;
  }

  /**
   * Function to send request to the REST API to change the order status.
   * @param values
   */
  public orderStatusSubmit(values: any): void {
    this.toastyObject = { title: 'Saving....', msg: 'Please wait', type: 'info' };
    this.commonService.toasty(this.toastyObject);

    let obj: IOrderStatusSubmit = {
      orderID: this.orderInfo.id,
      status: this.orderInfoStatus,
      reason: values.reason
    };

    this.orderService.changeOrderStatus(obj).subscribe((data: any) => {
      this.orderInfo.status = this.orderInfoStatus;
      this.toastyObject = { title: 'Success', msg: 'Order status changed Successfully!', type: 'success' };
      this.commonService.toasty(this.toastyObject);
    }, (err) => {
      this.toastyObject = { title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error' };
      this.commonService.toasty(this.toastyObject);
    });
  }

  /**
   * Function to activate the selected order row.
   * @param order
   */
  public activateRow(order): void {
    this.rowSelected.emit(order);
  }

  /**
   * Function transmit to the child component to emit the selected order details.
   * @param obj
   */
  public transmitParent(obj): void {
    console.log('called');
    this.orderSelected.emit(obj);
  }

  /**
   * Function to handle the date from change.
   * @param dateFrom
   */
  public handleDateFromChange(dateFrom: Date): void {
    this.dateFrom = dateFrom;
    this.datepickerToOpts = {
      startDate: dateFrom
    };
    this.dateTo = dateFrom;
  }
}
