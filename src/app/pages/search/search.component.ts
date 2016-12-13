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

  getAdvanceSearchOrders(value) {
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

  loadOrder(order) {
    this.orderInfo = order;
  }

  // loadModal(obj) {
  //   this.orderInfoStatus = obj.status;
  //   this.orderInfo = obj.orderInfo;
  //   this.lgModal.show();
  // }

  orderStatusSubmit(values: any) {
    this.toastyObject = { title: 'Saving....', msg: 'Please wait', type: 'info' };
    this.commonService.toasty(this.toastyObject);

    let obj: IOrderStatusSubmit = {
      orderID: this.orderInfo.id,
      status: this.orderInfoStatus,
      reason: values.reason
    };

    // this.lgModal.hide();

    this.orderService.changeOrderStatus(obj).subscribe((data: any) => {
      this.orderInfo.status = this.orderInfoStatus;
      this.toastyObject = { title: 'Success', msg: 'Order status changed Successfully!', type: 'success' };
      this.commonService.toasty(this.toastyObject);
    }, (err) => {
      this.toastyObject = { title: 'Oops!', msg: 'Something Went Wrong! Please Try Again...', type: 'error' };
      this.commonService.toasty(this.toastyObject);
    });
  }

  activateRow(order) {
    this.rowSelected.emit(order);
  }

  transmitParent(obj) {
    console.log('called');
    this.orderSelected.emit(obj);
  }

  handleDateFromChange(dateFrom: Date) {
    this.dateFrom = dateFrom;
    this.datepickerToOpts = {
      startDate: dateFrom
    };
    this.dateTo = dateFrom;
  }
}
