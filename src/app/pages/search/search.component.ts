import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { CommonService } from '../../shared/services/common.service';
import {IOrderStatusSubmit} from '../orders/order-list/order-list.component';
import {UserService} from '../../shared/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @ViewChild('lgModal') lgModal;
  searchOrders: Array<any> = [];
  orderInfo: any;
  orderInfoStatus: string;
  dateFrom;
  dateTo;
  datepickerToOpts = {};
  datepickerFromOpts = {};
  searched: boolean;


  constructor(private commonService: CommonService, private orderService: OrderService, private userService: UserService) {
    this.searched = false;
  }

  ngOnInit() {

  }

  getAdvanceSearchOrders(value) {
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

  loadModal(status) {
    this.orderInfoStatus = status;
    this.lgModal.show();
  }

  orderStatusSubmit(values: any) {


    let obj: IOrderStatusSubmit = {
      orderID: this.orderInfo.id,
      status: this.orderInfoStatus,
      reason: values.reason
    };

    // TODO need to handle this after a success response from the server otherwise need to give a proper error message.

    this.lgModal.hide();

    this.orderService.changeOrderStatus(obj).subscribe((data: any) => {
      this.orderInfo.status = this.orderInfoStatus;
    }, (err) => {
      console.log(err);
    });
  }

  handleDateFromChange(dateFrom) {
    // update the model
    this.dateFrom = dateFrom;
    // do not mutate the object or angular won't detect the changes
    this.datepickerToOpts = {
      startDate: dateFrom,
      endDate: new Date()
    };
  }

  handleDateToChange(dateTo) {
    // update the model
    this.dateTo = dateTo;
    // do not mutate the object or angular won't detect the changes
    this.datepickerFromOpts = {
      startDate: new Date(),
      endDate: dateTo
    };
  }
}
